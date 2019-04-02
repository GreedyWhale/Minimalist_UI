<template>
  <div class="swiper">
    <slot></slot>
    <ul v-if="childrenLength">
      <li
        v-for="(item, index) in childrenLength"
        :key="item" @click="setActiveIndex(index)">
        {{ item }}
      </li>
    </ul>
    <div @click="onControlBtnClick(-1)" class="control-btn">上一个</div>
    <div @click="onControlBtnClick(1)" class="control-btn">下一个</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

let autoPlayTimer: any;
@Component({
  name: "MSwiper"
})
export default class MSwiper extends Vue {
  @Prop({ type: Number, default: 3000 }) private delay!: number;
  @Prop({ type: [Number, String] }) private active!: number | string;
  @Prop({ type: Boolean }) private autoplay!: boolean;
  // data
  activeIndex: number = 0;
  lastActiveIndex: number = 0;
  childrenLength: number = 0;
  mounted() {
    this.initActive()
    .then(() => {
      this.setActiveChild();
      if(this.autoplay) {
        this.executeAutoPlay();
      }
      this.childrenLength = this.childrenList.length;
    })
  }
  destroyed(): void {
    clearTimeout(autoPlayTimer);
  }
  // methods
  initActive(): Promise<any> {
    return new Promise(resolve => {
      this.activeIndex = this.active !== undefined ? this.getActiveIndex(this.active) : 0;
      this.lastActiveIndex = this.active !== undefined ? this.getActiveIndex(this.active) : 0;
      resolve()
    })
  }
  getReverse(): boolean {
    if(this.lastActiveIndex === 0 && this.activeIndex === this.childrenList.length -1) {
      return true;
    }
    if(this.lastActiveIndex === this.childrenList.length -1 && this.activeIndex === 0) {
      return false;
    }
    return this.lastActiveIndex > this.activeIndex;
  }
  setActiveChild(): void {
    let active = this.getActiveName();
    let reverse = this.getReverse();
    this.childrenList.forEach(vm => {
      vm.reverse = reverse
    });
    this.$nextTick(() => {
      this.childrenList.forEach(vm => {
        vm.activeName = active
      })
    })
  }
  executeAutoPlay(): void {
    if(autoPlayTimer) { return };
    let run = () => {
      let index: number = this.getActiveIndex();
      index += 1;
      this.setActiveIndex(index);
      autoPlayTimer = setTimeout(run, this.delay);
    }
    autoPlayTimer = setTimeout(run, this.delay);
  }
  getActiveName(): any {
    return this.childrenList[this.activeIndex].name;
  }
  getActiveIndex(name?: any): number {
    let newName = name !== undefined ? name : this.getActiveName();
    let index = 0;
    this.childrenList.some((vm, idx) => {
      if(vm.name === newName) {
        index = idx;
      }
      return vm.name === newName;
    });
    return index;
  }
  setActiveIndex(index: number): void {
    this.lastActiveIndex = this.activeIndex;
    if(index === -1) {
      index = this.childrenList.length - 1;
    }
    if(index === this.childrenList.length) {
      index = 0;
    }
    this.activeIndex = index;
    this.$emit('change', this.childrenList[index].name, index)
  }
  onControlBtnClick(num: number): void {
    this.setActiveIndex(this.activeIndex + num);
  }
  // computed
  get childrenList(): any[] {
    return this.$children.filter(vm => vm.$options.name === 'MSwiperItem');
  }
  @Watch('activeIndex')
  onActiveIndexChange(newValue: number) {
    this.setActiveChild();
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
  overflow: hidden;
}
</style>
