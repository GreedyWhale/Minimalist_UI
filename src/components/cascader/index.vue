<template>
  <div class="cascader" ref="cascader">
    <div class="cascader-view" @click="togglePopover">
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
        :loadingItem="loadingItem"
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
  @Prop({ type: Function }) private loadData!: Function;
  // data
  visiblePopover: boolean = false;
  placeholder: string = "请选择";
  copySelected: any[] = [];
  allSelectedItems: any[] = [];
  loadingItem: any = {};
  selectedItem: SourceItem = { value: "", label: "" };
  // methods
  clickDocument(event: Event): void {
    if (
      this.$refs.cascader === event.target ||
      (this.$refs.cascader as any).contains(event.target)
    ) {
      return;
    }
    this.close();
  }
  togglePopover(): void {
    this.visiblePopover ? this.close() : this.open();
  }
  open(): void {
    document.addEventListener("click", this.clickDocument);
    this.visiblePopover = true;
  }
  close(): void {
    document.removeEventListener("click", this.clickDocument);
    this.visiblePopover = false;
  }
  onUpdateSelected(selected: any[]): void {
    this.$emit("select", selected);
    this.copySelected = selected;
  }
  onChange(sourceItem: SourceItem, level: number): void {
    let copyAllSelectedItems: any[] = JSON.parse(
      JSON.stringify(this.allSelectedItems)
    );
    copyAllSelectedItems[level] = sourceItem;
    copyAllSelectedItems.splice(level + 1);
    this.allSelectedItems = copyAllSelectedItems;
    this.selectedItem = sourceItem;
    this.$emit("change", sourceItem);
    this.$emit("selected-items", copyAllSelectedItems);
    if (!sourceItem.children) {
      this.visiblePopover = false;
    }
    if (this.loadData) {
      this.loadingItem =
        sourceItem.children && !sourceItem.children.length ? sourceItem : {};
      this.loadData(sourceItem, this.onUpdateSource);
    }
  }
  findValueInSource(list: SourceItem[], conditions: any): any[] {
    return list.filter((item: SourceItem) => item.value === conditions);
  }
  getContentArr(list: SourceItem[], conditions: any): any[] {
    if (!list) {
      return [];
    }
    let result: any[] = this.findValueInSource(list, conditions);
    if (result && result.length) {
      return result;
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].children) {
        result = this.getContentArr(list[i].children, conditions);
        if (result && result.length) {
          return result;
        }
      }
    }
    return [];
  }
  setSourceItem(source: any[], newSource: any, sourceItem: SourceItem) {
    for (let i = 0; i < source.length; i++) {
      if (source[i].value === sourceItem.value) {
        source[i].children = newSource;
        return true;
      }
    }
  }
  getNewSource(source: any[], newSource: any[], sourceItem: SourceItem) {
    let done;
    for (let i = 0; i < source.length; i++) {
      done = this.setSourceItem(source, newSource, sourceItem);
      if (done) {
        return;
      }
      if (source[i].children && source[i].children.length) {
        this.getNewSource(source[i].children, newSource, sourceItem);
      }
    }
  }
  onUpdateSource(newSource: any[]): void {
    // 如果点击的选项没有children属性，不更新
    if (!newSource || !this.selectedItem.children) {
      this.loadingItem = {};
      return;
    }
    let source = JSON.parse(JSON.stringify(this.source));
    if (newSource && newSource.length) {
      this.getNewSource(source, newSource, this.selectedItem);
      this.$emit("update:source", source);
      this.loadingItem = {};
    }
  }
  // computed
  get selectedContent(): string {
    const selected = this.selected || this.copySelected;
    let content: any[] = [];
    if (selected) {
      selected.forEach(item => {
        const contentItem: any[] = this.getContentArr(this.source, item);
        if (contentItem && contentItem.length) {
          content.push(...contentItem);
        }
      });
    }
    if (content && content.length) {
      return content.map(val => val.label).join("/");
    }
    return "";
  }
  beforeDestroy(): void {
    document.removeEventListener("click", this.clickDocument);
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
