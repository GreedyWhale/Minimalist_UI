<template>
  <div class="flex-inline__center container" :data-layout="promptMsgPosition">
    <div
      class="m-input__wrapper flex-inline__center"
      :data-disabled="disabled"
      :data-suffix-icon="showSuffixIcon"
      :data-prefix-icon="showPrefixIcon"
      :data-suffix-button="showSuffixButton"
      :data-prefix-button="showPrefixButton"
      :data-suffix-content="showSuffixContent"
      :data-prefix-content="showPrefixContent"
      :data-clearable="clearable"
    >
      <div class="m-input__and-icon flex-inline__center">
        <!-- 输入框 -->
        <input
          class="m-input"
          :type="type"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :disabled="disabled"
          :value="currentValue"
          @input="onInput($event)"
          @change="$emit('change', $event)"
          @blur="$emit('blur', $event)"
          @focus="$emit('focus', $event)"
          @keyup.enter="onEnter"
        />
        <!-- 前后缀icon -->
        <div
          v-if="showSuffixIcon"
          class="m-suffix__icon m-input__icon"
          @click="$emit('click-icon', { event: $event, value: currentValue })"
        >
          <slot name="suffixIcon">
            <m-icon :icon="suffixIcon" v-if="suffixIcon" />
          </slot>
        </div>
        <div
          class="m-prefix__icon m-input__icon"
          v-if="showPrefixIcon"
          @click="$emit('click-icon', { event: $event, value: currentValue })"
        >
          <slot name="prefixIcon">
            <m-icon :icon="prefixIcon" v-if="prefixIcon" />
          </slot>
        </div>
        <div
          class="m-input__clear-icon"
          v-if="showClearIcon"
          @click="clearValue"
        >
          <m-icon icon="close" />
        </div>
      </div>
      <!-- 前后缀按钮 -->
      <div class="m-button__wrap m-button__wrap-suffix" v-if="showSuffixButton">
        <m-button
          :options="{
            type: 'solid',
            color: 'blue',
            icon: suffixButtonIcon,
            shape: 'rounded'
          }"
          @click="$emit('click-button', { event: $event, value: currentValue })"
        >
          {{ suffixButtonText }}
        </m-button>
      </div>
      <div class="m-button__wrap m-button__wrap-prefix" v-if="showPrefixButton">
        <m-button
          :options="{
            type: 'solid',
            color: 'blue',
            icon: prefixButtonIcon,
            shape: 'rounded'
          }"
          @click="$emit('click-button', { event: $event, value: currentValue })"
        >
          {{ prefixButtonText }}
        </m-button>
      </div>
      <!-- 前后缀内容 -->
      <div
        class="m-input__content-wrap m-input__suffix-content"
        v-if="showSuffixContent"
      >
        <slot name="suffixContent"></slot>
      </div>
      <div
        class="m-input__content-wrap m-input__prefix-content"
        v-if="showPrefixContent"
      >
        <slot name="prefixContent"></slot>
      </div>
    </div>
    <!-- 提示信息 -->
    <div
      v-if="promptMsg"
      class="m-input__prompt flex-inline__center"
      :data-error="isErrorMsg"
    >
      <m-icon icon="tips" />
      <p>{{ promptMsg }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
import MButton from "@/components/button/index.vue";
@Component({
  name: "MInput",
  components: {
    MIcon,
    MButton
  }
})
export default class MInput extends Vue {
  @Prop({ default: "text" }) private type!: string;
  @Prop({ default: "" }) private placeholder!: string;
  @Prop() private maxlength!: string | number;
  @Prop({ default: false }) private disabled!: boolean;
  @Prop({ default: false }) private clearable!: boolean | string;
  @Prop({ default: "" }) private promptMsg!: string;
  @Prop({ default: "" }) private promptMsgPosition!: string;
  @Prop({ default: false }) private isErrorMsg!: boolean;
  @Prop({ default: "" }) private suffixIcon!: string;
  @Prop({ default: "" }) private prefixIcon!: string;
  @Prop({ default: "" }) private suffixButtonText!: string;
  @Prop({ default: "" }) private suffixButtonIcon!: string;
  @Prop({ default: "" }) private prefixButtonText!: string;
  @Prop({ default: "" }) private prefixButtonIcon!: string;

  @Model("input", { type: String }) value!: string;

  // data
  currentValue: string = this.value || "";
  inputFocused: boolean = false;
  // methods
  setCurrentValue(value: string): void {
    if (this.currentValue === value) return;
    this.currentValue = value;
  }
  onInput(event: any): void {
    const {
      target: { value }
    } = event;
    this.setCurrentValue(value);
    this.$emit("input", value);
  }
  onEnter(): void {
    this.$emit("on-enter", this.currentValue);
  }
  clearValue(): void {
    const event = {
      target: {
        value: ""
      }
    };
    this.currentValue = "";
    this.$emit("input", "");
    this.$emit("change", event);
    this.$emit("clear");
  }
  // computed
  get showSuffixIcon(): boolean {
    return this.suffixIcon !== "" || this.$slots.suffixIcon !== undefined;
  }
  get showPrefixIcon(): boolean {
    return this.prefixIcon !== "" || this.$slots.prefixIcon !== undefined;
  }
  get showSuffixButton(): boolean {
    return this.suffixButtonText !== "" || this.suffixButtonIcon !== "";
  }
  get showPrefixButton(): boolean {
    return this.prefixButtonText !== "" || this.prefixButtonIcon !== "";
  }
  get showSuffixContent(): boolean {
    return this.$slots.suffixContent !== undefined;
  }
  get showPrefixContent(): boolean {
    return this.$slots.prefixContent !== undefined;
  }
  get showClearIcon(): boolean {
    const clearable: boolean =
      this.clearable === "" ? true : Boolean(this.clearable);
    return clearable && Boolean(this.currentValue);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$blue: #40a9ff;
$gray: #bbb;
.flex-inline__center {
  display: inline-flex;
  align-items: center;
}
.m-input__wrapper {
  position: relative;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  .m-input__and-icon {
    position: relative;
    flex: 1;
    line-height: inherit;
    height: 100%;
  }
  .m-input {
    flex: 1;
    font-size: inherit;
    border-radius: $borderRadius;
    border: 1px solid #d9d9d9;
    background: #fff;
    outline: none;
    padding: 4px 11px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    line-height: inherit;
    &:hover {
      border-color: $blue;
    }
    &:focus {
      border-color: $blue;
      box-shadow: 0 0 2px 1px rgba(66, 170, 254, 0.7);
    }
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
  .m-input__icon,
  .m-input__clear-icon {
    position: absolute;
    width: 2em;
    height: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .m-input__clear-icon {
    right: 0;
  }
  .m-input__icon {
    z-index: 1;
    &.m-suffix__icon {
      right: 0;
    }
    &.m-prefix__icon {
      left: 0;
    }
  }
  .m-button__wrap {
    height: 100%;
    .m-button {
      height: 100%;
    }
  }
  .m-button__wrap-prefix {
    order: -1;
  }
  .m-input__content-wrap {
    border: 1px solid #dcdfe6;
    color: #909399;
    background-color: #f5f7fa;
    height: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    &.m-input__suffix-content {
      border-top-right-radius: $borderRadius;
      border-bottom-right-radius: $borderRadius;
      border-left: 0;
    }
    &.m-input__prefix-content {
      order: -2;
      border-top-left-radius: $borderRadius;
      border-bottom-left-radius: $borderRadius;
      border-right: 0;
    }
  }
  &[data-disabled] {
    color: $gray;
    .m-input {
      border-color: $gray;
      cursor: not-allowed;
      background: #f3f3f3;
    }
  }
  &[data-suffix-icon="true"],
  &[data-clearable="true"] {
    .m-input {
      padding-right: 2em;
    }
  }
  &[data-prefix-icon="true"] {
    .m-input {
      padding-left: 2em;
    }
  }
  &[data-suffix-button="true"],
  &[data-suffix-content="true"] {
    .m-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &[data-prefix-button="true"],
  &[data-prefix-content="true"] {
    .m-input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &[data-suffix-button="true"] {
    .m-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .m-input {
      border-right: none;
    }
  }
  &[data-prefix-button="true"] {
    .m-button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .m-input {
      border-left: none;
    }
  }
}
.m-input__prompt {
  font-size: 14px;
  margin-left: 10px;
  color: rgb(3, 172, 3);
  > p {
    margin: 0 0 0 5px;
  }
  &[data-error="true"] {
    color: rgb(224, 55, 55);
  }
}
.container {
  &[data-layout="down"] {
    flex-direction: column;
    align-items: flex-start;
    .m-input__prompt {
      margin-left: 0;
      margin-top: 10px;
    }
  }
}
</style>
