<template>
  <div :class="{ menu: true, vertical }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from "vue-property-decorator";
import { UPDATE_ACTIVE, UPDATE_NAME_PATH, CLICK_SUB_MENU } from "./constant";

@Component({
  name: "MMenu"
})
export default class MMenu extends Vue {
  @Prop({ type: [String, Number] }) defaultActive!: string | number;
  @Prop({ type: Boolean, default: false }) vertical!: boolean;
  @Prop({ type: Boolean, default: false }) accordion!: boolean;
  @Prop({ type: String, default: "hover" }) subMenuTrigger!: string;
  @Provide() isVertical: boolean = this.vertical;
  @Provide() eventBus: Vue.default = new Vue();
  @Provide() subMenuTriggerWay: string = this.subMenuTrigger;
  // data
  activeName: string | number = "";
  namePath: any[] = [];

  mounted(): void {
    this.initListeners();
    this.setDefaultActive(this.defaultActive);
  }
  // methods
  setDefaultActive(name: string | number): void {
    if (name !== undefined) {
      this.eventBus.$emit(UPDATE_ACTIVE, name);
    }
  }
  initListeners(): void {
    this.eventBus.$on(UPDATE_ACTIVE, (name: number | string) => {
      this.$emit("on-select", name, this.namePath);
    });
    this.eventBus.$on(
      CLICK_SUB_MENU,
      (name: number | string, isOpen: boolean) => {
        if (isOpen && this.vertical) {
          this.$children.forEach((vm: any) => {
            if (vm.name !== name) {
              vm.open = false;
            }
          });
        }
        this.$emit("toggle-sub-menu", name, isOpen);
      }
    );
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
