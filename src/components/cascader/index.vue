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
        :source="source"
        v-if="visiblePopover"
        @change="onChange"
        :selected="selected || copySelected"
        @update:selected="onUpdateSelected"
      ></m-cascader-item>
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
  @Model("select", { type: Array }) readonly selected!: any[];
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  private source!: Array<SourceItem>;
  // data
  visiblePopover: boolean = false;
  placeholder: string = "请选择";
  copySelected: any[] = [];
  // methods
  onUpdateSelected(selected: any[]): void {
    this.$emit("select", selected);
    this.copySelected = selected;
  }
  onChange(sourceItem: SourceItem, level: number, index: number): void {
    this.$emit("change", sourceItem);
  }
  findValueInSource(list: SourceItem[], conditions: any): any[] {
    return list.filter((item: SourceItem) => item.value === conditions);
  }
  recursiveSource(list: SourceItem[], conditions: any): any[] {
    if(!list) { return [] }
    let result: any[] = this.findValueInSource(list, conditions);
    if(result && result.length) {
      return result;
    }
    for(let i = 0; i < list.length; i++) {
      if(list[i].children) {
        result = this.recursiveSource(list[i].children, conditions);
        if(result && result.length) { return result }
      }
    }
    return [];
  }
  // computed
  get selectedContent(): string {
    const selected = this.selected || this.copySelected;
    let content: any[] = [];
    if(selected) {
      selected.forEach(item => {
        const contentItem: any[] = this.recursiveSource(this.source, item);
        if(contentItem && contentItem.length) {
          content.push(...contentItem);
        }
      });
    }
    if(content && content.length) {
      return content.map(val => val.label).join('/')
    }
    return '';
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
    width: 200px;
    > p {
      flex: 1;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
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
