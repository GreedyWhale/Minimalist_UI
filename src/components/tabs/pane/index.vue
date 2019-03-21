<template>
  <div class="tabs-pane" v-if="isActive">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { EventBus } from "../tabs.d";
import { listenSelected } from "../methods";
@Component({
  name: "MTabsPane"
})
export default class MTabsPane extends Vue {
  @Inject() readonly eventBus!: EventBus;
  @Prop({ type: String }) private name!: string;
  // data
  isActive: boolean = false;
  mounted(): void {
    listenSelected.call(this);
  }
}
</script>

<style lang="scss" scoped>
.tabs-pane {
  padding: 1em;
}
</style>
