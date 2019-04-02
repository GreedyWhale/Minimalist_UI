<template>
  <div
    class="swiper"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot></slot>
    <ul
      v-if="childrenLength && visibleDots"
      class="control-dots"
      :data-vertical="vertical"
    >
      <li
        v-for="(item, index) in childrenLength"
        :class="[activeIndex === index ? 'active' : '']"
        :key="item"
        @click="setActiveIndex(index, false)"
      ></li>
    </ul>
    <template v-if="visibleControlBtn">
      <div @click="onControlBtnClick(-1)" class="control-btn control-btn__prev">
        <m-icon icon="left"></m-icon>
      </div>
      <div @click="onControlBtnClick(1)" class="control-btn control-btn__next">
        <m-icon icon="right"></m-icon>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
let autoPlayTimer: any;
@Component({
  name: "MSwiper",
  components: {
    MIcon
  }
})
export default class MSwiper extends Vue {
  @Prop({ type: Number, default: 3000 }) private delay!: number;
  @Prop({ type: [Number, String] }) private active!: number | string;
  @Prop({ type: Boolean, default: false }) private autoplay!: boolean;
  @Prop({ type: Boolean, default: true }) visibleDots!: boolean;
  @Prop({ type: Boolean, default: false }) vertical!: boolean;
  @Prop({ type: Boolean, default: true }) loop!: boolean;
  @Prop({
    type: String,
    default: "hover",
    validator(value) {
      return ["hover", "never", "always"].indexOf(value) >= 0;
    }
  })
  arrow!: string;
  // data
  activeIndex: number = 0;
  lastActiveIndex: number = 0;
  childrenLength: number = 0;
  needJudgeBoundary: boolean = true;
  hideControlBtn: boolean = true;
  startX: number = 0;
  startY: number = 0;
  mounted() {
    this.initActive().then(() => {
      this.setActiveChild();
      this.executeAutoPlay();
      this.childrenLength = this.childrenList.length;
    });
  }
  destroyed(): void {
    this.clearAutoplayTimer();
  }
  // methods
  initActive(): Promise<any> {
    return new Promise(resolve => {
      this.activeIndex =
        this.active !== undefined ? this.getActiveIndex(this.active) : 0;
      this.lastActiveIndex =
        this.active !== undefined ? this.getActiveIndex(this.active) : 0;
      resolve();
    });
  }
  getReverse(): boolean {
    if (this.needJudgeBoundary) {
      if (
        this.lastActiveIndex === 0 &&
        this.activeIndex === this.childrenList.length - 1
      ) {
        return true;
      }
      if (
        this.lastActiveIndex === this.childrenList.length - 1 &&
        this.activeIndex === 0
      ) {
        return false;
      }
    }
    return this.lastActiveIndex > this.activeIndex;
  }
  setActiveChild(): void {
    let active = this.getActiveName();
    let reverse = this.getReverse();
    this.childrenList.forEach(vm => {
      vm.reverse = reverse;
      vm.vertical = this.vertical;
    });
    this.$nextTick(() => {
      this.childrenList.forEach(vm => {
        vm.activeName = active;
      });
    });
  }
  executeAutoPlay(): void {
    if (!this.autoplay) {
      return;
    }
    if (autoPlayTimer) {
      return;
    }
    let run = () => {
      let index: number = this.getActiveIndex();
      index += 1;
      this.setActiveIndex(index);
      autoPlayTimer = setTimeout(run, this.delay);
    };
    autoPlayTimer = setTimeout(run, this.delay);
  }
  getActiveName(): any {
    return this.childrenList[this.activeIndex].name;
  }
  getActiveIndex(name?: any): number {
    let newName = name !== undefined ? name : this.getActiveName();
    let index = 0;
    this.childrenList.some((vm, idx) => {
      if (vm.name === newName) {
        index = idx;
      }
      return vm.name === newName;
    });
    return index;
  }
  setActiveIndex(index: number, needJudgeBoundary: boolean = true): void {
    this.lastActiveIndex = this.activeIndex;
    if (index === -1) {
      index = this.loop ? this.childrenList.length - 1 : 0;
    }
    if (index === this.childrenList.length) {
      index = this.loop ? 0 : this.childrenList.length - 1;
    }
    this.activeIndex = index;
    this.needJudgeBoundary = needJudgeBoundary;
    this.$emit("change", this.childrenList[index].name, index);
  }
  onControlBtnClick(num: number): void {
    this.setActiveIndex(this.activeIndex + num);
  }
  onMouseEnter(): void {
    this.clearAutoplayTimer();
    if (this.arrow === "hover") {
      this.hideControlBtn = false;
    }
  }
  onMouseLeave(): void {
    this.executeAutoPlay();
    if (this.arrow === "hover") {
      this.hideControlBtn = true;
    }
  }
  clearAutoplayTimer(): void {
    clearTimeout(autoPlayTimer);
    autoPlayTimer = null;
  }
  onTouchStart(e: TouchEvent): void {
    this.clearAutoplayTimer();
    const { clientX, clientY } = e.touches[0];
    this.startX = clientX;
    this.startY = clientY;
  }
  onTouchEnd(e: TouchEvent): void {
    const { clientX: endX, clientY: endY } = e.changedTouches[0];
    const distance = Math.sqrt(
      Math.pow(endX - this.startX, 2) + Math.pow(endY - this.startY, 2)
    );
    const deltaY = Math.abs(endY - this.startY);
    const rate = distance / deltaY;
    if (this.vertical && rate < 2) {
      // 向下
      if (this.startY - endY > 10) {
        this.setActiveIndex(this.activeIndex - 1);
      }
      // 向上
      if (this.startY - endY < -10) {
        this.setActiveIndex(this.activeIndex + 1);
      }
    } else if (!this.vertical && rate > 2) {
      // 向左
      if (this.startX - endX > 10) {
        this.setActiveIndex(this.activeIndex + 1);
      }
      // 向右
      if (this.startX - endX < -10) {
        this.setActiveIndex(this.activeIndex - 1);
      }
    }
    this.$nextTick(() => {
      this.executeAutoPlay();
    });
  }
  // computed
  get childrenList(): any[] {
    return this.$children.filter(vm => vm.$options.name === "MSwiperItem");
  }
  get visibleControlBtn(): boolean {
    if (this.arrow === "always") {
      return true;
    }
    if (this.arrow === "hover" && !this.hideControlBtn) {
      return true;
    }
    return !(this.arrow === "never");
  }
  @Watch("activeIndex")
  onActiveIndexChange(newValue: number) {
    this.setActiveChild();
  }
}
</script>

<style lang="scss" scoped>
$control-z-index: 10;
$control-bg: rgba(0, 0, 0, 0.4);
.swiper {
  position: relative;
  overflow: hidden;
  .control-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: $control-z-index;
    background: $control-bg;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    color: #fff;
    &.control-btn__prev {
      left: 30px;
    }
    &.control-btn__next {
      right: 30px;
    }
  }
  .control-btn,
  .control-dots {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .control-dots {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    z-index: $control-z-index;
    margin: 0;
    padding: 0;
    &,
    li {
      list-style: none;
    }
    > li {
      box-sizing: border-box;
      background: $control-bg;
      margin-right: 5px;
      width: 20px;
      height: 4px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: #fff;
      }
      &.active {
        width: 30px;
        background: #fff;
      }
    }
    &[data-vertical="true"] {
      flex-direction: column;
      top: 0;
      bottom: 0;
      left: auto;
      right: 10px;
      > li {
        width: 4px;
        height: 20px;
        margin-right: 0;
        margin-bottom: 5px;
      }
      &.active {
        height: 30px;
      }
    }
  }
}
</style>
