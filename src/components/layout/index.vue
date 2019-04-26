<template>
  <div :class="layoutClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "MLayout"
})
export default class MLayout extends Vue {
  // data
  layoutClass: string[] = ["m-layout"];
  mounted(): void {
    this.checkChildren();
  }
  // methods
  checkChildren(): void {
    this.$children.some(vm => {
      if (vm.$options.name === "MAside") {
        this.layoutClass.push("m-layout__has-aside");
      }
      return vm.$options.name === "MAside";
    });
  }
}
</script>

<style lang="scss" scoped>
.m-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  &.m-layout__has-aside {
    flex-direction: row;
  }
}
</style>
