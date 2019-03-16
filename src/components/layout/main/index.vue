<template>
  <div class="main">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MMain"
})
export default class MMain extends Vue {}
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
}
</style>
