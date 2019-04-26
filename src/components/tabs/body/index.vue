<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "MTabsBody"
})
export default class MTabsBody extends Vue {}
</script>
