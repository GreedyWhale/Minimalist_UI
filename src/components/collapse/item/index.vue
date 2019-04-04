<template>
  <div class="collapse-item" @click="toggleOpenState">
    <div class="collapse-title">
      <p>{{ title }}</p>
      <div class="collapse-icon" :data-open="open">
        <m-icon icon="right" />
      </div>
    </div>
    <transition @enter="enter" @before-leave="beforeLeave">
      <div class="collapse-content" v-if="open">
        <div class="collapse-content__wrap">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Inject } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";

@Component({
  name: "MCollapseItem",
  components: {
    MIcon
  }
})
export default class MCollapseItem extends Vue {
  @Prop({ type: String, required: true }) private title!: string;
  @Prop({ type: [String, Number], required: true }) private name!:
    | string
    | number;

  @Inject() readonly eventBus!: Vue.default;
  // data
  open: boolean = false;

  mounted(): void {
    this.listenUpdateSelectd();
  }
  // methods
  listenUpdateSelectd(): void {
    this.eventBus.$on("updateActive", (activeList: any[]) => {
      const active = activeList.some(
        (value: string | number) => value === this.name
      );
      this.open = active;
    });
  }
  toggleOpenState(): void {
    this.eventBus.$emit("changeActiveName", this.name, this.open);
  }
  enter(el: any, done: () => {}): void {
    const sectionHeight: number = el.scrollHeight;
    el.style.height = sectionHeight + "px";
    done();
  }
  beforeLeave(el: any): void {
    el.style.height = 0 + "px";
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$border: 1px solid $collapse-border-color;
.collapse-item {
  font-size: 16px;
  .collapse-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fafafa;
    border-bottom: $border;
    padding: 0 1em;
    line-height: 2.5;
    cursor: pointer;
    > p {
      margin: 0;
    }
  }
  .collapse-content {
    border-bottom: $border;
    overflow: hidden;
    transition: height 0.3s ease-out;
    height: 0;
    box-sizing: border-box;
    &__wrap {
      margin: 1em;
    }
  }
  .collapse-icon {
    font-size: 12px;
    transition: all 0.3s;
    &[data-open="true"] {
      transform: rotateZ(90deg);
    }
  }
  &:first-child {
    .collapse-title {
      border-top-left-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
    }
  }
  &:last-child {
    .collapse-title {
      border-bottom-left-radius: $borderRadius;
      border-bottom-right-radius: $borderRadius;
      border-bottom: none;
    }
    .collapse-content {
      border-top: $border;
      border-bottom: none;
    }
  }
}
</style>
