<template>
  <div class="m-main">
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
.m-main {
  flex: 1 0 auto;
}
</style>
