<template>
  <div class="m-icon" :data-is-loading="isLoading" @click="$emit('on-click')">
    <slot />
    <svg class="icon-font" aria-hidden="true" v-if="newIconName">
      <use :xlink:href="`#icon-${newIconName}`"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import "@/assets/iconfont/index.css";
import "@/assets/iconfont/index.js";

@Component({
  name: "MIcon"
})
export default class MIcon extends Vue {
  @Prop({ default: "" }) private icon!: string;
  @Prop({ default: false, type: Boolean }) private isLoading!: boolean;

  // compouted
  get newIconName(): string {
    if (this.isLoading) {
      return "loading";
    }
    return this.icon;
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
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: none;
  &[data-is-loading="true"] {
    animation: rotate 0.5s linear infinite;
  }
}
</style>
