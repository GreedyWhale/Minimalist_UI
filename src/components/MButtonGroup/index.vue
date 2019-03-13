<template>
  <div class="m-button__group">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: 'MButtonGroup'
})
export default class MButtonGroup extends Vue {
  mounted(): void {
    const childrenElem: any[] = [].slice.call(this.$el.children);
    childrenElem.forEach(value => {
      const name: string = value.nodeName.toLowerCase();
      if (name !== "button") {
        console.warn("MButtonGroup 的子元素应该全是 MButton");
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.m-button__group {
  display: inline-flex;
  align-items: center;
  > .m-button {
    &[data-type="hollow"] {
      &:not(:first-child) {
        border-left: none;
      }
    }
    &[data-type="solid"] {
      &:not(:last-child) {
        border-right-color: #ffffff;
      }
    }
    &:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
