<template>
  <div
    :class="['tabs-item', itemclass]"
    @click="updateSelected"
    @mouseenter="isHoverActive = true"
    @mouseleave="isHoverActive = false"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { EventBus } from "../tabs.d";
import { listenSelected } from "../methods";
@Component({
  name: "MTabsItem"
})
export default class MTabsItem extends Vue {
  @Inject() readonly eventBus!: EventBus;
  @Prop({ type: String }) private name!: string;
  // data
  isActive: boolean = false;
  isHoverActive: boolean = false;
  mounted(): void {
    listenSelected.call(this);
  }
  // computed
  get itemclass(): Object {
    return {
      "tabs-item": true,
      active: this.isActive,
      "hover-active": this.isHoverActive
    };
  }
  // methods
  updateSelected(): void {
    this.eventBus.$emit("update:selected", this.name, this);
  }
}
</script>

<style lang="scss" scoped>
.tabs-item {
  display: inline-block;
  padding: 0 1.5em;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
  &.active,
  &.hover-active {
    color: #1890ff;
    font-weight: bold;
  }
  > .m-icon {
    margin-right: 5px;
  }
}
</style>
