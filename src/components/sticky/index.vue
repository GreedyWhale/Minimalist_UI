<template>
  <div class="m-sticky__wrapper" ref="wrapper" :style="{ height }">
    <div class="m-sticky" :data-sticky="sticky" :style="wrapperStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MSticky"
})
export default class MSticky extends Vue {
  @Prop({ type: Number, default: 0 }) private distance!: number;
  @Prop({ type: String, default: "" }) private tagId!: string;
  // data
  targetElem: Window | Element = window;
  wrapperStyle: Object = {};
  height: string | null = null;
  sticky: boolean = false;
  scrollY: number = 0;
  mounted() {
    this.addScrollListener();
  }
  beforeDestroy() {
    this.targetElem.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("scroll", this.fixedStickyElem);
  }
  // methods
  addScrollListener(): void {
    if (this.tagId) {
      this.targetElem = document.querySelector(`#${this.tagId}`) || window;
    }
    this.targetElem.addEventListener("scroll", this.onScroll);
    window.addEventListener("scroll", this.fixedStickyElem);
  }
  fixedStickyElem() {
    if (this.tagId && this.sticky) {
      this.wrapperStyle = Object.assign({}, this.wrapperStyle, {
        position: "absolute",
        top: `${this.scrollY + this.distance}px`,
        left: "0px"
      });
      this.sticky = false;
    }
  }
  onScroll(e: Event): void {
    const scrollY = (e.target as HTMLElement).scrollTop || window.scrollY;
    const wrapperTop = this.getWrpperTop(scrollY);
    this.scrollY = scrollY;
    if (wrapperTop - this.distance < scrollY && !this.sticky) {
      const { width, left, height } = (this.$refs
        .wrapper as Element).getBoundingClientRect();
      this.height = `${height}px`;
      this.wrapperStyle = {
        width: `${width}px`,
        left: `${left}px`,
        top: `${this.getStickyTop()}px`,
        position: "fixed"
      };
      this.sticky = true;
    } else if (wrapperTop - this.distance >= scrollY && this.sticky) {
      this.height = null;
      this.wrapperStyle = {};
      this.sticky = false;
    }
  }
  getWrpperTop(scrollY: number): number {
    let { top } = (this.$refs.wrapper as Element).getBoundingClientRect();
    if (this.tagId) {
      top = top - (this.targetElem as Element).getBoundingClientRect().top;
    }
    return top + scrollY;
  }
  getStickyTop(): number {
    if (this.tagId) {
      return (
        (this.targetElem as Element).getBoundingClientRect().top + this.distance
      );
    }
    return this.distance;
  }
}
</script>

<style lang="scss" scoped>
.m-sticky__wrapper {
  box-sizing: border-box;
  .m-sticky {
    &[data-sticky="true"] {
      position: fixed;
    }
  }
}
</style>
