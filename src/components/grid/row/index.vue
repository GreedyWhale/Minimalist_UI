<template>
  <div :class="rowClass" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { CustomVm } from "./row.d";

@Component({
  name: "MRow"
})
export default class MRow extends Vue {
  @Prop() private gutter!: string | number;
  @Prop() private align!: string;

  // computed
  get rowStyle(): Object {
    if (this.gutter) {
      return {
        marginLeft: -this.gutter / 2 + "px",
        marginRight: -this.gutter / 2 + "px"
      };
    }
    return {};
  }
  get rowClass(): any[] {
    const classes: any[] = ["m-row"];
    if (this.align) {
      classes.push(`align-${this.align}`);
    }
    return classes;
  }
  mounted() {
    this.$children.forEach((vm: CustomVm) => {
      vm.gutter = this.gutter;
    });
  }
}
</script>

<style lang="scss" scoped>
.m-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  &.align-left {
    justify-content: flex-start;
  }
  &.align-right {
    justify-content: flex-end;
  }
  &.align-center {
    justify-content: center;
  }
  &.align-end {
    justify-content: space-between;
  }
  &.align-space-between {
    justify-content: space-between;
  }
  &.align-space-around {
    justify-content: space-around;
  }
}
</style>
