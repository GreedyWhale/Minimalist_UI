<template>
  <div class="m-aside">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MAside"
})
export default class MAside extends Vue {}
</script>

<style lang="scss" scoped></style>
