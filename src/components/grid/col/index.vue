<template>
  <div :class="classList" :style="colStyle">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { PropSize } from "./col.d";

@Component({
  name: "MCol"
})
export default class MCol extends Vue {
  @Prop({ type: [Number, String], default: 24 }) private span!: string | number;
  @Prop({ type: [Number, String] }) private offset!: string | number;
  @Prop({ type: Object }) private sm!: PropSize;
  @Prop({ type: Object }) private md!: PropSize;
  @Prop({ type: Object }) private lg!: PropSize;
  @Prop({ type: Object }) private xl!: PropSize;
  @Prop({ type: Object }) private xxl!: PropSize;
  // data
  gutter: number = 0;
  // computed
  get classList(): any[] {
    const classes = ["m-col"];
    this.span && classes.push(`m-col__${this.span}`);
    this.offset && classes.push(`m-col__offset-${this.offset}`);
    return [
      "m-col",
      ...this.createClassList({ span: this.span, offset: this.offset }),
      ...this.createClassList(this.sm, "sm"),
      ...this.createClassList(this.md, "md"),
      ...this.createClassList(this.lg, "lg"),
      ...this.createClassList(this.xl, "xl"),
      ...this.createClassList(this.xxl, "xxl")
    ];
  }
  get colStyle(): Object {
    return {
      paddingLeft: this.gutter / 2 + "px",
      paddingRight: this.gutter / 2 + "px"
    };
  }
  // methods
  createClassList(obj: PropSize, suffix: string = ""): any[] {
    const classes: any[] = [];
    if (!obj) {
      return classes;
    }
    if (obj.span) {
      classes.push(`m-col__${suffix}${obj.span}`);
    }
    if (obj.offset) {
      classes.push(`m-col__offset-${suffix}${obj.offset}`);
    }
    return classes;
  }
}
</script>

<style lang="scss" scoped>
$screenSizes: (
  sm: (
    size: 576px,
    suffix: "sm"
  ),
  md: (
    size: 768px,
    suffix: "md"
  ),
  lg: (
    size: 992px,
    suffix: "lg"
  ),
  xl: (
    size: 1200px,
    suffix: "xl"
  ),
  xxl: (
    size: 1600px,
    suffix: "xxl"
  )
);
@mixin setColClass($screenSizeItem) {
  $size: map-get($screenSizeItem, size);
  $suffix: map-get($screenSizeItem, suffix);
  @media (min-width: $size) {
    @for $n from 1 through 24 {
      &.m-col__#{$suffix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    @for $n from 1 through 24 {
      &.m-col__offset-#{$suffix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
}
.m-col {
  box-sizing: border-box;
  flex: none;
  // default
  @for $n from 1 through 24 {
    &.m-col__#{$n} {
      width: ($n / 24) * 100%;
    }
  }
  @for $n from 1 through 24 {
    &.m-col__offset-#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }
  @each $key, $value in $screenSizes {
    @include setColClass($value);
  }
}
</style>
