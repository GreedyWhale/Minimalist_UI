<template>
  <div class="swiper">
    <div class="control-btn prev-btn" @click="changeActiveIndex(-1)">
      <m-icon icon="left" />
    </div>
    <div
      :class="['swiper-items__wrapper', visibleCopyTrack ? '' : 'higher']"
      ref="originTrack" :style="`transform: translate3d(${-this.trackOffset}px, 0px, 0px)`">
      <slot></slot>
    </div>
    <div
      :class="[
        'swiper-items__wrapper',
        'swiper-items__wrapper-copy',
        visibleCopyTrack ? 'higher' : ''
      ]"
      :style="`transform: translate3d(${-this.trackCopyOffset}px, 0px, 0px)`"
      ref="copyTrack">
      <slot></slot>
    </div>
    <div class="control-btn next-btn" @click="changeActiveIndex(1)">
      <m-icon icon="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
@Component({
  name: 'MSwiper',
  components: {
    MIcon
  }
})
export default class MSwiper extends Vue {
  @Prop({ type: Number, default: 0 }) initIndex!: number;
  // data
  trackIndex: number = 0;
  copyTrackIndex: number = 0;
  visibleCopyTrack: boolean = false;
  trackOffset: number = 0;
  trackCopyOffset: number = 0;
  mounted(): void {
    this.$nextTick(() => {
      this.initTrackPos();
    })
  }
  // methods
  initTrackPos() {
    this.trackIndex = this.initIndex || 0;
    this.upDateTrackPos(this.trackIndex);
  }
  upDateTrackPos(index: number): void {
    const newIndex = index > 0 ? -1 : this.childrenLength;
    if(this.visibleCopyTrack) {
      this.trackIndex = newIndex
    } else {
      this.copyTrackIndex = newIndex
    }
  }
  upDateTrackIndex(num: number): void {
    if(this.visibleCopyTrack) {
      this.copyTrackIndex = num
    } else {
      this.trackIndex = num
    }
  }
  changeActiveIndex(offset: number): void {
    let preIndex = this.visibleCopyTrack ? this.copyTrackIndex : this.trackIndex;
    let currentIndex = preIndex + offset;
    this.upDateTrackPos(offset);
    if(currentIndex === this.childrenLength || currentIndex < 0) {
      this.visibleCopyTrack = !this.visibleCopyTrack;
      this.trackIndex += offset;
      this.copyTrackIndex += offset;
    } else {
      this.upDateTrackIndex(currentIndex);
    }
    this.updateOffset();
  }
  updateOffset(): void {
    this.$nextTick(() => {
      const { width } = (this.$refs.originTrack as any).getBoundingClientRect();
      let offset = this.copyTrackIndex > 0 ? -1 : 1;
      this.trackOffset = this.trackIndex * width;
      this.trackCopyOffset = this.copyTrackIndex * width + offset;
    })
  }
  // computed
  get childrenLength(): number {
    return this.$children.filter(vm => vm.$options.name === 'MSwiperItem').length / 2
  }
  get originTrackStyle(): Object {
    return {
      transform: `translate3d(${-this.trackIndex * 100}%, 0px, 0px)`,
    }
  }
  get copyTrackStyle(): Object {
    return {
      transform: `translate3d(${-this.copyTrackIndex * 100}%, 0px, 0px)`,
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
  overflow: hidden;
  &-items__wrapper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    transition: all 300ms;
    &-copy {
      position: absolute;
    }
    &.higher {
      z-index: 2;
    }
  }
  .control-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    font-size: 12px;
    background: rgba(31,45,61,.11);
    color: #fff;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    &.prev-btn {
      left: 20px;
    }
    &.next-btn {
      right: 20px;
    }
  }
}
</style>


