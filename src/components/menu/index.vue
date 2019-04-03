<template>
  <div class="menu">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from "vue-property-decorator";
import { UPDATE_ACTIVE } from "./constant";

@Component({
  name: 'MMenu'
})
export default class MMenu extends Vue {
  @Provide() eventBus: Vue.default = new Vue();
  @Prop({ type: [String, Number] }) defaultActive!: string | number;

  // data
  activeName: string | number = '';

  mounted(): void {
    this.listenToUpdateActive();
    this.setActive(this.defaultActive);
  }
  // methods
  setActive(name: string | number): void {
    if(name !== undefined) {
      this.eventBus.$emit(UPDATE_ACTIVE, name)
    }
  }
  listenToUpdateActive(): void {
    this.eventBus.$on(UPDATE_ACTIVE, ((name: number | string) => {
      this.$emit('on-select', name);
    }))
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>

