<template>
  <div class="cascader-item">
    <ul class="left" :data-has-right="Boolean(rightSource)">
      <li
        class="label"
        :data-is-selected="sourceItem.value === selected[level]"
        v-for="sourceItem in source"
        :key="sourceItem.label"
        @click="setSelected(sourceItem)"
      >
        {{ sourceItem.label }}
        <m-icon
          v-if="sourceItem.children"
          icon="right"
          class="right-arrow"
        ></m-icon>
      </li>
    </ul>
    <div class="right" v-if="rightSource">
      <m-cascader-item
        :source="rightSource"
        :level="level + 1"
        @change="onChange"
        :selected="selected"
        @update:selected="onUpdateSelected"
      ></m-cascader-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { SourceItem } from "../cascader.d";
import MIcon from "@/components/icon/index.vue";

@Component({
  name: "MCascaderItem",
  components: {
    MIcon
  }
})
export default class MCascaderItem extends Vue {
  @Prop({ type: Array }) private source!: Array<SourceItem>;
  @Prop({ type: Number, default: 0 }) private level!: number;
  @Prop({ type: Array }) private selected!: any[];
  // computed
  get rightSource(): Array<SourceItem> | null {
    if (this.selected[this.level]) {
      let selected = this.source.filter(
        item => item.value === this.selected[this.level]
      );
      if (selected[0] && selected[0].children) {
        return selected[0].children;
      }
    }
    return null;
  }
  // methods
  setSelected(sourceItem: SourceItem): void {
    let selected = JSON.parse(JSON.stringify(this.selected));
    selected[this.level] = sourceItem.value;
    selected.splice(this.level + 1);
    this.$emit("update:selected", selected);
    this.$emit("change", sourceItem, this.level);
  }
  onUpdateSelected(selected: any[]): void {
    this.$emit("update:selected", selected);
  }
  onChange(sourceItem: SourceItem, level: number): void {
    this.$emit("change", sourceItem, level);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$label-hover-bg: #f5f7fa;
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cascader-item {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  .left {
    height: 250px;
    overflow: auto;
    &[data-has-right="true"] {
      border-right: 1px solid $grey;
    }
  }
  .label {
    line-height: 2.5;
    padding: 0 1em;
    min-width: 100px;
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      font-weight: bold;
      background: $label-hover-bg;
    }
    &[data-is-selected="true"] {
      background: $label-hover-bg;
    }
    .right-arrow {
      margin-left: auto;
      transform: scale(0.5);
    }
  }
}
</style>
