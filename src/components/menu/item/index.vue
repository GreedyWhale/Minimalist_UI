<template>
  <div
    :class="{ 'menu-item': true, vertical: isVertical, disabled }"
    :style="itemStyle"
    :data-active="active"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { UPDATE_ACTIVE } from "../constant";
import { findComponentParent } from "../methods";

@Component({
  name: "MMenuItem"
})
export default class MMenuItem extends Vue {
  @Inject() readonly eventBus!: Vue.default;
  @Inject() readonly isVertical!: boolean;
  @Prop({ type: [Number, String], required: true }) name!: number | string;
  @Prop({ type: Number }) to!: string;
  @Prop({ type: Boolean, default: false }) disabled!: string;
  // data
  active: boolean = false;
  mounted(): void {
    this.listenToUpdateActive();
  }
  // methods
  listenToUpdateActive(): void {
    this.eventBus.$on(UPDATE_ACTIVE, (name: number | string) => {
      this.active = name === this.name;
    });
  }
  onClick(): void {
    if (this.disabled) {
      return;
    }
    (this.$parent as any).upDateNamePath &&
      (this.$parent as any).upDateNamePath([this.name]);
    this.eventBus.$emit(UPDATE_ACTIVE, this.name);
    if (this.to) {
      window && window.open(this.to);
    }
  }
  // computed
  get itemStyle(): Object {
    let style = {};
    if (this.isVertical) {
      style = {
        paddingLeft: findComponentParent(this, "MSubMenu").length + 1.5 + "em"
      };
    }
    return style;
  }
}
</script>

<style lang="scss" scoped>
@import "../general.scss";
.menu-item {
  @extend .item;
  .m-icon {
    margin-right: 8px;
  }
}
</style>
