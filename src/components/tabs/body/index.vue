<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MTabsBody"
})
export default class MTabsBody extends Vue {}
</script>
