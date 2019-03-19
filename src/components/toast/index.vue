<template>
  <div class="container" ref="wrapper" :data-position="position">
    <div
      class="m-toast flex-align__center"
      @animationend="animationend"
      :data-is-end="isCloseAnimation"
    >
      <div :class="['icon', 'flex-align__center', icon]" v-if="icon">
        <m-icon :icon="icon" />
      </div>
      <div class="content">
        <div v-if="enbleHtml && usePlugin" v-html="$slots.default[0]"></div>
        <slot v-else></slot>
      </div>
      <div
        class="close-button flex-align__center"
        v-if="showCloseButton"
        @click="onClickCloseButton"
      >
        <m-icon icon="close" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CallBack } from "./toast.d";
import MIcon from "@/components/icon/index.vue";
let closeTimer: any;
@Component({
  name: "MToast",
  components: {
    MIcon
  }
})
export default class MToast extends Vue {
  @Prop({ default: false }) private enbleHtml!: boolean;
  @Prop({ default: false }) private showCloseButton!: boolean;
  @Prop({ default: true }) private autoClose!: boolean;
  @Prop({ default: 3000 }) private delayTime!: number;
  @Prop({ default: "top" }) private position!: string;
  @Prop({ default: false }) private usePlugin!: boolean;
  @Prop({
    validator(value: string) {
      return ["tips", "warning", "danger", "success"].indexOf(value) !== -1;
    }
  })
  private icon!: string;
  @Prop() private onClose!: CallBack;

  isCloseAnimation: boolean = false;
  mounted(): void {
    console.log(this.$slots);
    this.executeAutoClose();
  }
  destroyed(): void {
    clearTimeout(closeTimer);
  }
  // methods
  animationend(): void {
    if (this.isCloseAnimation) {
      this.close();
    }
  }
  executeAutoClose() {
    if (this.autoClose) {
      closeTimer = setTimeout(() => {
        this.isCloseAnimation = true;
      }, this.delayTime);
    }
  }
  close(): void {
    this.$el.remove();
    this.$emit("close");
    this.$destroy();
  }
  onClickCloseButton(): void {
    this.isCloseAnimation = true;
    if (this.onClose && typeof this.onClose === "function") {
      this.onClose(this);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
@keyframes top-unfold {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes top-pack-up {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}
@keyframes left-unfold {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes left-pack-up {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
}
@keyframes right-unfold {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes right-pack-up {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}
@keyframes bottom-unfold {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bottom-pack-up {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}
@keyframes middle-unfold {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes middle-pack-up {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}
.flex-align__center {
  display: flex;
  align-items: center;
}
.container {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  .m-toast {
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 16px;
    border-radius: $borderRadius;
    color: #000;
    padding: 0.3em 1em;
    line-height: 1.5;
    min-height: 38px;
    max-width: 380px;
    box-sizing: border-box;
    animation-name: top-unfold;
    animation-duration: 0.3s;
    animation-timing-function: linear;
    &[data-is-end="true"] {
      animation-name: top-pack-up;
    }
    .content {
      word-break: break-all;
    }
    .close-button {
      flex: none;
      padding-left: 1.5em;
      cursor: pointer;
    }
    .icon {
      margin-right: 0.3em;
      &.tips {
        color: #aaa;
      }
      &.success {
        color: rgb(20, 212, 20);
      }
      &.danger {
        color: rgb(233, 64, 64);
      }
      &.warning {
        color: rgb(231, 179, 7);
      }
    }
  }
  &[data-position="left"] {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    .m-toast {
      animation-name: left-unfold;
      &[data-is-end="true"] {
        animation-name: left-pack-up;
      }
    }
  }
  &[data-position="right"] {
    top: 50%;
    right: 0;
    left: auto;
    transform: translateY(-50%);
    .m-toast {
      animation-name: right-unfold;
      &[data-is-end="true"] {
        animation-name: right-pack-up;
      }
    }
  }
  &[data-position="bottom"] {
    top: auto;
    bottom: 0;
    .m-toast {
      animation-name: bottom-unfold;
      &[data-is-end="true"] {
        animation-name: bottom-pack-up;
      }
    }
  }
  &[data-position="middle"] {
    top: 50%;
    transform: translate(-50%, -50%);
    .m-toast {
      animation-name: middle-unfold;
      &[data-is-end="true"] {
        animation-name: middle-pack-up;
      }
    }
  }
}
</style>
