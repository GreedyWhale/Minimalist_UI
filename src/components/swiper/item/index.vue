<template>
  <div>
    <transition :name="transitionName">
      <div class="swiper-item" v-if="active">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MSwiperItem"
})
export default class MSwiperItem extends Vue {
  @Prop({ type: String }) name!: string;
  // data
  activeName: string | number = "";
  reverse: boolean = false;
  vertical: boolean = false;
  // computed
  get active(): boolean {
    return this.activeName === this.name;
  }
  get transitionName(): string {
    if (this.vertical) {
      return this.reverse ? "vertical-slide-reverse" : "vertical-slide";
    }
    return this.reverse ? "slide-reverse" : "slide";
  }
}
</script>

<style lang="scss" scoped>
.swiper-item {
  position: relative;
  height: 200px;
  background: bisque;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
}
.slide-enter-active,
.slide-leave-active,
.slide-reverse-enter-active,
.slide-reverse-leave-active,
.vertical-slide-enter-active,
.vertical-slide-leave-active,
.vertical-slide-reverse-enter-active,
.vertical-slide-reverse-leave-active {
  transition: all 300ms;
}
.slide-leave-active,
.slide-reverse-leave-active,
.vertical-slide-leave-active,
.vertical-slide-reverse-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}
.slide-enter,
.slide-reverse-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slide-leave-to,
.slide-reverse-enter {
  transform: translate3d(-100%, 0, 0);
}
.vertical-slide-enter,
.vertical-slide-reverse-leave-to {
  transform: translate3d(0, 100%, 0);
}
.vertical-slide-leave-to,
.vertical-slide-reverse-enter {
  transform: translate3d(0, -100%, 0);
}
</style>
