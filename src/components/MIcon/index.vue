<template>
  <div class="m-icon" :data-isLoading="isLoading">
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
  name: 'MIcon'
})
export default class MIcon extends Vue {
  @Prop({ default: "" }) private iconName!: string;
  @Prop() private isLoading!: boolean;

  // compouted
  get newIconName(): string {
    if (this.isLoading) {
      return "loading";
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
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: none;
  &[data-isLoading="true"] {
    animation: rotate 0.5s linear infinite;
  }
}
</style>
