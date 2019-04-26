<template>
  <div class="m-header">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MHeader"
})
export default class MHeader extends Vue {}
</script>

<style lang="scss" scoped></style>
