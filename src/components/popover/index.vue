<template>
  <div class="popover" ref="popover">
    <div
      class="popover-content"
      :style="{ 'max-width': maxWidth }"
      v-if="visible"
      ref="popoverContent"
      :data-position="position"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="content" :close="close"></slot>
    </div>
    <div class="popover-trigger">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { PositionInfo } from "./popover.d";
@Component({
  name: "MPopover"
})
export default class MPopover extends Vue {
  @Prop({ type: String, default: "top" }) private position!: string;
  @Prop({ type: String, default: "click" }) private trigger!: string;
  @Prop({ type: String }) private maxWidth!: string;
  // data
  enterTimer: any = null;
  mounted(): void {
    if (this.trigger === "click") {
      (this.$refs.popover as any).addEventListener("click", this.onClick);
    } else {
      (this.$refs.popover as any).addEventListener(
        "mouseenter",
        this.onMouseEnter
      );
      (this.$refs.popover as any).addEventListener(
        "mouseleave",
        this.onMouseLeave
      );
    }
  }
  beforeDestroy(): void {
    if (this.trigger === "click") {
      (this.$refs.popover as any).removeEventListener("click", this.onClick);
    } else {
      (this.$refs.popover as any).removeEventListener(
        "mouseenter",
        this.onMouseEnter
      );
      (this.$refs.popover as any).removeEventListener(
        "mouseleave",
        this.onMouseLeave
      );
    }
  }
  // data
  visible: boolean = false;
  // methods
  clickDocument(event: Event): void {
    const isPoppver: boolean =
      this.$refs.popover &&
      (this.$refs.popover === event.target ||
        (this.$refs.popover as any).contains(event.target));
    const isPoppverContent: boolean =
      this.$refs.popoverContent &&
      (this.$refs.popoverContent === event.target ||
        (this.$refs.popoverContent as any).contains(event.target));
    if (isPoppver || isPoppverContent) {
      return;
    }
    this.close();
  }
  onClick(event: Event): void {
    if ((this.$refs.popover as any).contains(event.target)) {
      this.visible ? this.close() : this.open();
    }
  }
  onMouseEnter(): void {
    if (this.trigger !== "hover") {
      return;
    }
    if (this.enterTimer) {
      clearTimeout(this.enterTimer);
    }
    this.enterTimer = setTimeout(() => {
      this.open();
    }, 100);
  }
  onMouseLeave(): void {
    if (this.trigger !== "hover") {
      return;
    }
    if (this.enterTimer) {
      clearTimeout(this.enterTimer);
      this.enterTimer = setTimeout(() => {
        this.close();
      }, 100);
    }
  }
  open(): void {
    this.visible = true;
    this.$emit("open");
    this.$nextTick(() => {
      this.setPopoverPosition();
      document.addEventListener("click", this.clickDocument);
    });
  }
  close(): void {
    this.visible = false;
    this.$emit("close");
    document.removeEventListener("click", this.clickDocument);
  }
  setPopoverPosition(): void {
    const popover: any = this.$refs.popover;
    const popoverContent: any = this.$refs.popoverContent;
    popoverContent && document.body.appendChild(popoverContent);
    const { top, left, height, width } = popover.getBoundingClientRect();
    const {
      height: popoverContentHeight
    } = popoverContent.getBoundingClientRect();
    const { scrollY = 0, scrollX = 0 } = window;
    const positionInfo: PositionInfo = {
      top: {
        left: left + scrollX,
        top: top + scrollY
      },
      bottom: {
        left: left + scrollX,
        top: top + scrollY + height
      },
      left: {
        left: left + scrollX,
        top: top + scrollY + (height - popoverContentHeight) / 2
      },
      right: {
        left: left + scrollX + width,
        top: top + scrollY + (height - popoverContentHeight) / 2
      }
    };
    if (popoverContent) {
      popoverContent.style.left = `${positionInfo[this.position].left}px`;
      popoverContent.style.top = `${positionInfo[this.position].top}px`;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$border-color: #ccc;
.popover {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
}
.popover-content {
  box-sizing: border-box;
  position: absolute;
  padding: 0.5em 1em;
  border: 1px solid $border-color;
  border-radius: $borderRadius;
  font-size: 14px;
  background: #fff;
  word-break: break-all;
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.2));
  &::after,
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 0;
    width: 0;
    border: 10px solid transparent;
    pointer-events: none;
  }
  &::before {
    z-index: 1;
  }
  &[data-position="top"],
  &[data-position="bottom"] {
    &::after,
    &::before {
      left: 1em;
    }
  }
  &[data-position="top"] {
    transform: translateY(-100%);
    margin-top: -10px;
    &::after {
      top: 100%;
      border-top-color: $border-color;
    }
    &::before {
      border-top-color: #fff;
      top: calc(100% - 1px);
    }
  }
  &[data-position="bottom"] {
    margin-top: 10px;
    &::after {
      bottom: 100%;
      border-bottom-color: $border-color;
    }
    &::before {
      border-bottom-color: #fff;
      bottom: calc(100% - 1px);
    }
  }
  &[data-position="left"],
  &[data-position="right"] {
    &::after,
    &::before {
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &[data-position="left"] {
    transform: translateX(-100%);
    margin-left: -10px;
    &::after {
      left: 100%;
      border-left-color: $border-color;
    }
    &::before {
      border-left-color: #fff;
      left: calc(100% - 1px);
    }
  }
  &[data-position="right"] {
    margin-left: 10px;
    &::after {
      right: 100%;
      border-right-color: $border-color;
    }
    &::before {
      border-right-color: #fff;
      right: calc(100% - 1px);
    }
  }
}
</style>
