<template>
  <div class="cascader">
    <div class="cascader-view" @click="visiblePopover = !visiblePopover">
      <p>请选择</p>
      <m-icon icon="right" class="arrow-icon" :data-is-unfold="visiblePopover"></m-icon>
    </div>
    <div class="cascader-content">
      <m-cascader-item :source="source" v-if="visiblePopover"></m-cascader-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { SourceItem } from "./cascader.d";
import MIcon from "@/components/icon/index.vue";
import MCascaderItem from "./item/index.vue";
@Component({
  name: 'MCascader',
  components: {
    MCascaderItem,
    MIcon
  }
})
export default class MCascader extends Vue {
  @Prop({ type: Array, default(){ return []} }) private source!: Array<SourceItem>;
  // data
  visiblePopover: boolean = false;
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
.cascader {
  position: relative;
  display: inline-block;
  &-view {
    padding: 0 20px;
    width: 200px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #000;
    cursor: pointer;
    border-radius: $borderRadius;
    display: flex;
    align-items: center;
    > p {
      margin: 0;
    }
    .arrow-icon {
      transform: scale(.5) rotate(90deg);
      margin-left: auto;
      transition: all .2s;
      &[data-is-unfold] {
        transform: scale(.5) rotate(270deg);
      }
    }
  }
  &-content {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 7px;
    z-index: 1;
    background: #fff;
    border-radius: $borderRadius;
    @extend .cascader-border-and-shadow;
  }
}
</style>

