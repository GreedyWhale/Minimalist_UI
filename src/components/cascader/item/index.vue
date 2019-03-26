<template>
  <div class="cascader-item">
    <ul class="left" :data-has-right="Boolean(rightSource)">
      <li
        class="label"
        v-for="sourceItem in source"
        :key="sourceItem.label"
        @click="selected = sourceItem"
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
      <m-cascader-item :source="rightSource"></m-cascader-item>
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
  // data
  selected: SourceItem | null = null;
  // computed
  get rightSource(): Array<SourceItem> | null {
    if (this.selected && this.selected.children) {
      return this.selected.children;
    }
    return null;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
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
      background: rgba(228, 227, 227, 0.774);
    }
    .right-arrow {
      margin-left: auto;
      transform: scale(0.5);
    }
  }
}
</style>
