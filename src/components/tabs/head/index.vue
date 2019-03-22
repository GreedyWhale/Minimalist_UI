<template>
  <div class="tabs-head" :data-has-contral-btn="showContralBtn">
    <template v-if="showContralBtn">
      <div class="contral-btn pre-btn" @click="scrollPrev">
        <m-icon icon="left" />
      </div>
      <div class="contral-btn next-btn" @click="scrollNext">
        <m-icon icon="right" />
      </div>
    </template>
    <div class="tabs-head__scroll" ref="scroll">
      <div
        class="tabs-head__scroll-content"
        ref="scrollContent"
        :style="scrollOffsetX"
      >
        <slot></slot>
        <div class="line" ref="line"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";
import { CustomObject } from "@/types/index.d";
import MIcon from "@/components/icon/index.vue";
@Component({
  name: "MTabsHead",
  components: {
    MIcon
  }
})
export default class MTabsHead extends Vue {
  @Inject() readonly eventBus!: Vue;

  mounted(): void {
    this.eventBus.$on(
      "update:selected",
      (selected: string | number, vm: any) => {
        this.scrollToCurrent(vm);
        this.$nextTick(() => {
          this.updateLinePosition(vm);
        });
      }
    );
    this.$nextTick(() => {
      this.setContralBtn();
    });
  }
  // data
  showContralBtn: boolean = false;
  offsetX: number = 0;
  // methods
  scrollToCurrent(vm: any): any {
    if (!vm) return;
    // todo 算法需研究，目前参考ivew的实现
    const scrollContent: CustomObject = this.$refs.scrollContent;
    const scrollWrap: CustomObject = this.$refs.scroll;
    const currentTabBounding = vm.$el.getBoundingClientRect();
    const scrollWrapBounding = scrollWrap.getBoundingClientRect();
    const scrollContentBounding = scrollContent.getBoundingClientRect();
    let newOffset = this.offsetX;
    if (scrollContentBounding.right < scrollWrapBounding.right) {
      newOffset = scrollContent.offsetWidth - scrollWrapBounding.width;
    }
    if (currentTabBounding.left < scrollWrapBounding.left) {
      newOffset =
        this.offsetX - (scrollWrapBounding.left - currentTabBounding.left);
    } else if (currentTabBounding.right > scrollWrapBounding.right) {
      newOffset =
        this.offsetX + currentTabBounding.right - scrollWrapBounding.right;
    }
    if (this.offsetX !== newOffset) {
      this.offsetX = Math.max(newOffset, 0);
    }
  }
  scrollPrev(): void {
    // todo 算法需研究，目前参考ivew的实现
    const containerWidth = (this.$refs.scroll as CustomObject).offsetWidth;
    if (!this.offsetX) return;
    let newOffset =
      this.offsetX > containerWidth ? this.offsetX - containerWidth : 0;
    this.offsetX = newOffset;
  }
  scrollNext() {
    // todo 算法需研究，目前参考ivew的实现
    const scrollContentWidth = (this.$refs.scrollContent as CustomObject)
      .offsetWidth;
    const containerWidth = (this.$refs.scroll as CustomObject).offsetWidth;
    if (scrollContentWidth - this.offsetX <= containerWidth) return;
    let newOffset =
      scrollContentWidth - this.offsetX > containerWidth * 2
        ? this.offsetX + containerWidth
        : scrollContentWidth - containerWidth;
    this.offsetX = newOffset;
  }
  updateLinePosition(vm: any): void {
    if (!vm) return;
    const { left, width } = vm.$el.getBoundingClientRect();
    const { left: scrollLeft } = (this.$refs
      .scrollContent as CustomObject).getBoundingClientRect();
    (this.$refs.line as CustomObject).style.width = `${width}px`;
    (this.$refs.line as CustomObject).style.left = `${left - scrollLeft}px`;
  }
  setContralBtn(): void {
    if (this.$refs.scrollContent) {
      const { width } = (this.$refs
        .scrollContent as CustomObject).getBoundingClientRect();
      const { width: scrollWidth } = (this.$refs
        .scroll as CustomObject).getBoundingClientRect();
      this.showContralBtn = width - scrollWidth > 0;
    }
  }
  // computed
  get scrollOffsetX(): string {
    return `transform: translateX(-${this.offsetX}px)`;
  }
}
</script>

<style lang="scss" scoped>
.tabs-head {
  position: relative;
  &__scroll {
    overflow: hidden;
    &-content {
      transition: all 300ms linear;
      white-space: nowrap;
      position: relative;
      float: left;
      z-index: 10;
      .line {
        position: absolute;
        bottom: 0;
        height: 2px;
        background: #1890ff;
        z-index: 2;
        transition: all 300ms linear;
      }
    }
  }
  &::after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: #e4e7ed;
  }
  &[data-has-contral-btn="true"] {
    padding: 0 40px;
  }
  .contral-btn {
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    bottom: 0;
    cursor: pointer;
    &.pre-btn {
      left: 0;
      padding-left: 10px;
    }
    &.next-btn {
      right: 0;
      padding-right: 10px;
    }
  }
}
</style>
