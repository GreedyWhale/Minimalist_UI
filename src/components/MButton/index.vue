<template>
  <button
    class="m-button"
    :data-type="buttonConfig.type"
    :data-shape="buttonConfig.shape"
    :data-color="buttonConfig.color"
    :data-disable="buttonConfig.disable"
    :data-position="buttonConfig.iconPosition"
    @click="$emit('click')"
  >
    <MIcon
      v-if="buttonConfig.iconName || buttonConfig.isLoading"
      :iconName="buttonConfig.iconName"
      :isLoading="buttonConfig.isLoading"
    />
    <slot name="prefix" />
    <div class="content">
      <slot />
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Options } from "./MButton.d";
import MIcon from "@/components/MIcon/index.vue";

@Component({
  components: {
    MIcon
  }
})
export default class MButton extends Vue {
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  private options!: Options;

  // computed
  get buttonConfig(): Options {
    const defaultConfig: Options = {
      type: "hollow", // hollow | solid
      shape: "default",
      color: "black",
      disable: false,
      iconName: "",
      iconPosition: "",
      isLoading: false
    };
    return Object.assign({}, defaultConfig, this.options);
  }
}
</script>

<style lang="scss" scoped>
$buttonTheme: (
  black: (
    color: #1d1b1b
  ),
  green: (
    color: #a5de37
  ),
  blue: (
    color: #229ffd
  ),
  yellow: (
    color: #feae1b
  ),
  red: (
    color: #ff4351
  ),
  purple: (
    color: #7b72e9
  )
);
$buttonType: "solid", "hollow";
@mixin hollowButtonTheme($color) {
  border-color: $color;
  color: $color;
  background: #ffffff;
  &:hover {
    color: #ffffff;
    border-color: lighten($color, 10%);
    background: $color;
  }
  &:active {
    color: #ffffff;
    border-color: darken($color, 10%);
    background: lighten($color, 20%);
  }
}
@mixin solidButtonTheme($color) {
  border-color: $color;
  color: #ffffff;
  background: $color;
  &:hover {
    border-color: lighten($color, 10%);
    background: lighten($color, 10%);
  }
  &:active {
    color: darken($color, 20%);
    border-color: darken($color, 10%);
    background: darken($color, 10%);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}
.m-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  padding: 0.2em 1em;
  overflow: hidden;
  font-size: inherit;
  @each $type in $buttonType {
    &[data-type="#{$type}"] {
      @each $key, $value in $buttonTheme {
        &[data-color="#{$key}"] {
          $color: map-get($value, color);
          @if $type == "hollow" {
            @include hollowButtonTheme($color);
          } @else if $type == "solid" {
            @include solidButtonTheme($color);
          }
        }
      }
    }
  }
  &[data-shape="rounded"],
  &[data-shape="box"] {
    border-radius: 4px;
  }
  &[data-shape="pill"] {
    border-radius: 200px;
  }
  &[data-shape="square"],
  &[data-shape="box"],
  &[data-shape="circle"] {
    width: 3em;
    height: 3em;
  }
  &[data-shape="circle"] {
    border-radius: 50%;
  }
  box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.15);
  &:active {
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 0px white;
  }
  &[data-disable="true"] {
    background: #eee !important;
    color: #ccc !important;
    border-color: #ddd !important;
    text-shadow: 0 1px 1px white !important;
    box-shadow: none !important;
    cursor: default !important;
    pointer-events: none !important;
  }
  &[data-position="left"] {
    .content {
      margin-left: 0.5em;
    }
  }
  &[data-position="right"] {
    .content {
      margin-right: 0.5em;
      order: -1;
    }
  }
}
</style>
