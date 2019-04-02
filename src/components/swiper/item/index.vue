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
  activeName: string | number = '';
  reverse: boolean = false;
  // computed
  get active(): boolean {
    return this.activeName === this.name;
  }
  get transitionName(): string {
    return this.reverse ? 'slide-reverse' : 'slide'
  }
}
</script>

<style lang="scss" scoped>
.swiper-item {
  position: relative;
  height: 200px;
  background: red;
  width: 100%;
  top: 0;
  left: 0;
}
.slide-enter-active,
.slide-leave-active,
.slide-reverse-enter-active,
.slide-reverse-leave-active {
  transition: all 1300ms;
}
.slide-leave-active,
.slide-reverse-leave-active {
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
</style>
