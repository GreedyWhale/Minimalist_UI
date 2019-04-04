<template>
  <div class="sub-menu" @mouseenter="onMouuseEnter" @mouseleave="onMouseLeave">
    <div
      :class="{ 'sub-menu__title': true, vertical: isVertical }"
      :data-active="active || open"
      :style="itemStyle"
      @click="onClick"
    >
      <div><slot name="title"></slot></div>
      <m-icon
        icon="right"
        v-if="childrenLength"
        :class="['arrow-icon', open ? 'open' : '']"
      ></m-icon>
    </div>
    <template v-if="isVertical">
      <transition
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div :class="{ 'menu-list': true, vertical: isVertical }" v-show="open">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div :class="{ 'menu-list': true, vertical: isVertical }" v-show="open">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { UPDATE_ACTIVE, UPDATE_NAME_PATH } from "../constant";
import MIcon from "@/components/icon/index.vue";
import { findComponentParent } from "../methods";

@Component({
  name: "MSubMenu",
  components: {
    MIcon
  }
})
export default class MSubMenu extends Vue {
  @Inject() readonly eventBus!: Vue.default;
  @Inject() readonly isVertical!: boolean;
  @Prop({ type: [Number, String], required: true }) name!: number | string;
  // data
  open: boolean = false;
  openTimer: any = null;
  active: boolean = false;
  // computed
  childrenLength(): Number {
    return this.$children.length;
  }
  get itemStyle(): Object {
    let style = {};
    if (this.isVertical) {
      style = {
        paddingLeft: findComponentParent(this, "MSubMenu").length + 1.5 + "em"
      };
    }
    return style;
  }
  mounted() {
    this.initListeners();
  }
  // methods
  initListeners(): void {
    this.eventBus.$on(UPDATE_ACTIVE, (name: number | string) => {
      if (!this.isVertical) {
        this.open = false;
      }
    });
    this.eventBus.$on(UPDATE_NAME_PATH, (namePath: any[]) => {
      this.active = namePath.indexOf(this.name) >= 0;
    });
  }
  upDateNamePath(namePath: any[]) {
    let newNamePath = JSON.parse(JSON.stringify(namePath));
    newNamePath.unshift(this.name);
    (this.$parent as any).upDateNamePath &&
      (this.$parent as any).upDateNamePath(newNamePath);
  }
  onClick(): void {
    this.open = !this.open;
  }
  onMouuseEnter(): void {
    if (this.isVertical) {
      return;
    }
    clearTimeout(this.openTimer);
    this.openTimer = setTimeout(() => {
      this.open = true;
    }, 100);
  }
  onMouseLeave(): void {
    if (this.isVertical) {
      return;
    }
    clearTimeout(this.openTimer);
    this.openTimer = setTimeout(() => {
      this.open = false;
    }, 100);
  }
  enter(el: any, done: Function) {
    const { height } = el.getBoundingClientRect();
    el.style.height = 0;
    el.getBoundingClientRect();
    el.style.height = `${height}px`;
    el.addEventListener("transitionend", () => {
      done();
    });
  }
  afterEnter(el: any) {
    el.style.height = "auto";
  }
  leave(el: any, done: Function) {
    const { height } = el.getBoundingClientRect();
    el.style.height = `${height}px`;
    el.getBoundingClientRect();
    el.style.height = 0;
    el.addEventListener("transitionend", () => {
      done();
    });
  }
  afterLeave(el: any) {
    el.style.height = "auto";
  }
}
</script>

<style lang="scss" scoped>
@import "../general.scss";
.sub-menu__item {
  &:hover {
    background: #f3f3f3;
  }
  &:hover,
  &[data-active="true"] {
    &::after {
      content: none;
    }
  }
}
.sub-menu {
  position: relative;
  .sub-menu__title {
    @extend .item;
    &.vertical {
      &[data-active="true"] {
        color: inherit;
        background: inherit;
      }
      &:hover {
        background: $light-blue;
      }
    }
    .arrow-icon {
      width: 10px;
      height: 10px;
      margin-left: 10px;
      transform: rotate(90deg);
      transition: all 0.3s;
      &.open {
        transform: rotate(270deg);
      }
    }
  }
  .menu-list {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    .menu-item {
      @extend .sub-menu__item;
      justify-content: space-between;
    }
    & .sub-menu {
      & .sub-menu__title {
        @extend .sub-menu__item;
        .arrow-icon {
          transform: rotate(0);
          &.open {
            transform: rotate(180deg);
          }
        }
      }
      & .menu-list {
        top: 0;
        left: 100%;
        margin-top: 0;
        margin-left: 4px;
      }
    }
    &.vertical {
      position: static;
      box-shadow: none;
      margin: 0 !important;
      overflow: hidden;
      transition: height 250ms;
      .menu-item {
        &:hover,
        &[data-active="true"] {
          background: $light-blue;
        }
      }
      & .sub-menu {
        & .sub-menu__title {
          .arrow-icon {
            transform: rotate(90deg);
            &.open {
              transform: rotate(270deg);
            }
          }
          &:hover {
            background: $light-blue;
          }
        }
      }
    }
  }
}
</style>