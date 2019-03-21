<template>
  <div class="m-tabs">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide, Watch } from "vue-property-decorator";
import { EventBus } from "./tabs.d";
@Component({
  name: "MTabs"
})
export default class MTabs extends Vue {
  @Prop({ type: [String, Number], required: true }) private selected!:
    | string
    | number;
  @Provide() eventBus: EventBus = new Vue();
  @Watch("selected")
  onSelectedChanged(val: string | number, oldVal: string | number) {
    this.updateSelected(val);
  }

  mounted(): void {
    this.updateSelected(this.selected);
  }
  // methods
  updateSelected(selected: string | number): void {
    const childrenList: any[] = this.$children;
    let selectedChild: any;
    childrenList.forEach(child => {
      if (child.$options.name === "MTabsHead") {
        child.$children.find((grandson: any) => {
          if (grandson.name === selected) {
            selectedChild = grandson;
            return true;
          }
        });
      }
    });
    this.eventBus.$emit("update:selected", selected, selectedChild);
  }
}
</script>
