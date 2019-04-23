<template>
  <div class="m-dialog" :style="`z-index: ${zIndex};`" v-if="visibleDialog">
    <div class="m-dialog__mask"></div>
    <div class="m-dialog__box">
      <div class="m-dialog__header">
        <template v-if="title">
          <p>{{ title }}</p>
          <m-icon icon="close" @on-click="onClick('on-close')"></m-icon>
        </template>
        <slot name="header"></slot>
      </div>
      <div class="m-dialog__body">
        <slot></slot>
      </div>
      <div class="m-dialog__footer">
        <div class="m-dialog__footer-btns" v-if="visibleFooter">
          <m-button
            :options="{ shape: 'rounded' }"
            @click="onClick('on-cancel')"
          >
            {{ cancelButtonText }}
          </m-button>
          <m-button
            :options="{ shape: 'rounded' }"
            @click="onClick('on-confirm')"
          >
            {{ confirmButtonText }}
          </m-button>
        </div>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
import MButton from "@/components/button/index.vue";
@Component({
  name: "MDialog",
  components: {
    MIcon,
    MButton
  }
})
export default class MDialog extends Vue {
  @Prop({ type: String, default: "" }) private title!: string;
  @Prop({ type: String, default: "1" }) private zIndex!: string;
  @Prop({ type: Boolean, default: true }) private visibleFooter!: boolean;
  @Prop({ type: Boolean, default: false }) private async!: boolean;
  @Prop({ type: String, default: "确定" }) private confirmButtonText!: string;
  @Prop({ type: String, default: "取消" }) private cancelButtonText!: string;

  @Model("update:visibleDialog", { type: Boolean })
  readonly visibleDialog!: boolean;
  // methods
  onClick(eventName: string) {
    if (!this.async) {
      this.$emit("update:visibleDialog", false);
    }
    this.$emit(eventName, eventName);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$grey: #e8e8e8;
.m-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  &__box {
    position: relative;
    z-index: 1;
    background: #fff;
    width: 450px;
    border-radius: $borderRadius;
  }
  &__header,
  &__footer {
    padding: 16px 24px;
    display: flex;
    align-items: center;
  }
  &__header {
    justify-content: space-between;
    border-bottom: 1px solid $grey;
    > p {
      margin: 0;
    }
    .m-icon {
      cursor: pointer;
    }
  }
  &__body {
    padding: 24px;
  }
  &__footer {
    border-top: 1px solid $grey;
    &-btns {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      .m-button {
        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
