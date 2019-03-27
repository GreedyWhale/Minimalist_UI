<template>
  <div class="cascader">
    <div class="cascader-view" @click="visiblePopover = !visiblePopover">
      <p v-if="selectedContent">{{ selectedContent }}</p>
      <p class="placeholder" v-else>{{ placeholder }}</p>
      <m-icon
        icon="right"
        class="arrow-icon"
        :data-is-unfold="visiblePopover"
      ></m-icon>
    </div>
    <div class="cascader-content">
      <m-cascader-item
        :source="source" v-if="visiblePopover"
        :selected="selected" @update:selected="onUpdateSelected"></m-cascader-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { SourceItem } from "./cascader.d";
import MIcon from "@/components/icon/index.vue";
import MCascaderItem from "./item/index.vue";
@Component({
  name: "MCascader",
  components: {
    MCascaderItem,
    MIcon
  }
})
export default class MCascader extends Vue {
  @Model('select', { type: Array }) readonly selected!: any[];
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  private source!: Array<SourceItem>;
  // data
  visiblePopover: boolean = false;
  placeholder: string = '请选择';
  mounted() {
    this.checkSelected()
  };
  // methods
  onUpdateSelected(selected: any[]) {
    this.$emit('select', selected)
  }
  checkSelected(): void {
    if(!(this.selected instanceof Array)) {
      console.error('请在m-cascader组件上使用v-model指令，并给v-model指令一个数组类型的值')
    }
  }
  // computed
  get selectedContent(): string {
    return (this.selected || []).join('/');
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
.cascader {
  position: relative;
  display: inline-block;
  &-view {
    padding: 0 20px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #000;
    cursor: pointer;
    border-radius: $borderRadius;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > p {
      width: 200px;
      margin: 0;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      &.placeholder {
        color: #606266;
      }
    }
    .arrow-icon {
      transform: scale(0.5) rotate(90deg);
      transition: all 0.2s;
      &[data-is-unfold] {
        transform: scale(0.5) rotate(270deg);
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
