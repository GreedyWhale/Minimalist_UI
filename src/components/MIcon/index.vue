<template>
  <div class="m-icon" :data-isLoading="isLoading">
    <svg class="icon-font" aria-hidden="true">
      <use :xlink:href="`#icon-${newIconName}`"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import "@/assets/iconfont/index.css";
import "@/assets/iconfont/index.js";

@Component
export default class MIcon extends Vue {
  @Prop() private iconName!: string;
  @Prop() private isLoading!: string;

  // compouted
  get newIconName(): string {
    if(this.isLoading) {
      return 'loading';
    }
    return this.iconName;
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.m-icon {
  &[data-isLoading="true"] {
    animation: rotate .5s linear infinite;
  }
}
</style>

