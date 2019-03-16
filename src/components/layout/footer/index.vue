<template>
  <div class="footer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MFooter"
})
export default class MFooter extends Vue {}
</script>

<style lang="scss" scoped></style>
