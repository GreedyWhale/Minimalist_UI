<template>
  <div class="menu-item" :data-active="active" @click="onClick">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { UPDATE_ACTIVE } from "../constant";

@Component({
  name: 'MMenuItem'
})
export default class MMenuItem extends Vue {
  @Inject() readonly eventBus!: Vue.default;
  @Prop({ type: [Number, String ], required: true }) name!: number | string;

  // data
  active: boolean = false;
  mounted(): void {
    this.listenToUpdateActive();
  }
  // methods
  listenToUpdateActive(): void {
    this.eventBus.$on(UPDATE_ACTIVE, ((name: number | string) => {
      this.active = name === this.name;
    }))
  }
  onClick(): void {
    this.eventBus.$emit(UPDATE_ACTIVE, this.name);
  }
}
</script>

<style lang="scss" scoped>
@import "../general.scss";
.menu-item {
  @extend .item
}
</style>

