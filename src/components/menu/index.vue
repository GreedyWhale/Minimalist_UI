<template>
  <div :class="{ menu: true, vertical }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from "vue-property-decorator";
import { UPDATE_ACTIVE, UPDATE_NAME_PATH } from "./constant";

@Component({
  name: "MMenu"
})
export default class MMenu extends Vue {
  @Prop({ type: [String, Number] }) defaultActive!: string | number;
  @Prop({ type: Boolean, default: false }) vertical!: boolean;
  @Provide() isVertical: boolean = this.vertical;
  @Provide() eventBus: Vue.default = new Vue();
  // data
  activeName: string | number = "";
  namePath: any[] = [];

  mounted(): void {
    this.listenToUpdateActive();
    this.setDefaultActive(this.defaultActive);
  }
  // methods
  setDefaultActive(name: string | number): void {
    if (name !== undefined) {
      this.eventBus.$emit(UPDATE_ACTIVE, name);
    }
  }
  listenToUpdateActive(): void {
    this.eventBus.$on(UPDATE_ACTIVE, (name: number | string) => {
      this.$emit("on-select", name, this.namePath);
    });
  }
  upDateNamePath(namePath: any[]): void {
    this.namePath = namePath;
    this.eventBus.$emit(UPDATE_NAME_PATH, namePath);
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  &.vertical {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    border-right: 1px solid #ccc;
    border-bottom: none;
  }
}
</style>
