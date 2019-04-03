<template>
  <div
    class="sub-menu"
    @mouseenter="onMouuseEnter" @mouseleave="onMouseLeave">
    <div class="sub-menu__title" :data-active="active || open"  @click="onClick">
      <slot name="title"></slot>
    </div>
    <div class="menu-list" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { UPDATE_ACTIVE } from "../constant";

@Component({
  name: 'MSubMenu'
})
export default class MSubMenu extends Vue {
  @Inject() readonly eventBus!: Vue.default;
  // data
  active: boolean = false;
  open: boolean = false;
  openTimer: any = null;
  mounted() {
    this.listenToUpdateActive();
  }
  // methods
  listenToUpdateActive(): void {
    this.eventBus.$on(UPDATE_ACTIVE, ((name: number | string) => {
      this.active = this.findChildActive(this.$children, name);
      this.open = false;
    }))
  }
  findChildActive(children: any[], name: string | number): boolean {
    for(let i = 0; i < children.length; i++) {
      if(children[i].name === name) { 
        return true;
      } else if(children[i].$children && children[i].$children.length) {
        return this.findChildActive(children[i].$children, name);
      }
    }
    return false;
  }
  onClick(): void {
    this.open = !this.open;
  }
  onMouuseEnter(): void {
    clearTimeout(this.openTimer)
    this.openTimer = setTimeout(() => {
      this.open = true;
    }, 100);
  }
  onMouseLeave(): void {
    clearTimeout(this.openTimer)
    this.openTimer = setTimeout(() => {
      this.open = false;
    }, 100)
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
  }
  .menu-list {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
    .menu-item {
      @extend .sub-menu__item;
    }
    & .sub-menu {
      & .sub-menu__title {
        @extend .sub-menu__item;
      }
      & .menu-list {
        top: 0;
        left: 100%;
        margin-top: 0;
        margin-left: 8px;
      }
    }
  }
}
</style>

