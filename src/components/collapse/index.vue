<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Model, Provide } from "vue-property-decorator";

@Component({
  name: "MCollapse"
})
export default class MCollapse extends Vue {
  @Model("change", { type: [String, Number, Array] }) readonly activeNames!:
    | string
    | number
    | any[];
  @Provide() eventBus: Vue.default = new Vue();
  @Prop({ type: Boolean, default: false }) private single!: boolean;
  @Prop({ type: [String, Number, Array], default: "" }) private activeName!:
    | string
    | number
    | any[];
  // data
  activeNamesCopy: any[] = [];
  mounted(): void {
    this.setDefaultActive();
    this.listenChangeActiveName();
  }
  // methods
  getActiveNamesCopy(): any[] {
    let names = [];
    if (this.activeNames) {
      names =
        this.activeNames instanceof Array
          ? [...this.activeNames, ...this.activeNamesCopy]
          : [this.activeNames, ...this.activeNamesCopy];
    }
    if (this.activeName) {
      names =
        this.activeName instanceof Array
          ? [...this.activeName, ...this.activeNamesCopy]
          : [this.activeName, ...this.activeNamesCopy];
    }
    return [...new Set(names)];
  }
  setDefaultActive(): void {
    const args: any[] = this.getActiveNamesCopy();
    this.activeNamesCopy = args;
    this.eventBus.$emit("updateActive", args);
  }
  listenChangeActiveName(): void {
    this.eventBus.$on("changeActiveName", (name: string, isOpen: boolean) => {
      const activeNames: any[] = JSON.parse(
        JSON.stringify(this.activeNamesCopy)
      );
      if (isOpen) {
        // 需要关闭
        this.removeActiveName(name);
      } else {
        // 需要打开
        this.addActiveName(name);
      }
    });
  }
  addActiveName(name: string | number): void {
    let activeNames: any[] = JSON.parse(JSON.stringify(this.activeNamesCopy));
    if (this.single) {
      activeNames = [name];
    } else {
      activeNames = activeNames.concat(name);
    }
    this.activeNamesCopy = activeNames;
    this.eventBus.$emit("updateActive", activeNames);
    this.$emit("change", activeNames);
  }
  removeActiveName(name: string | number): void {
    let activeNames: any[] = JSON.parse(JSON.stringify(this.activeNamesCopy));
    if (this.single) {
      activeNames = [];
    } else {
      const index = activeNames.indexOf(name);
      activeNames.splice(index, 1);
    }
    this.activeNamesCopy = activeNames;
    this.eventBus.$emit("updateActive", activeNames);
    this.$emit("change", activeNames);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
.collapse {
  border-radius: $borderRadius;
  border: 1px solid $collapse-border-color;
}
</style>
