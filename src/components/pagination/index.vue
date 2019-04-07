<template>
  <div class="m-pagination">
    <ol v-if="displayPage.length" class="pager-list">
      <li @click="goNext(-1)" :class="{ disabled: currentPage === 1 }">
        <m-icon icon="left"></m-icon>
      </li>
      <li
        v-for="(item, index) in displayPage"
        :key="index"
        :class="{
          'no-border': item.useEllipsis,
          active: item.value === currentPage
        }"
        :title="item.title"
        @mouseenter="onMouseEnter(item, index)"
        @mouseleave="onMouseLeave(item, index)"
        @click="onClick(item, index)"
      >
        <template v-if="item.useEllipsis">
          <m-icon :icon="icons[index] || 'more'"></m-icon>
        </template>
        <template v-else>
          {{ item.value }}
        </template>
      </li>
      <li @click="goNext(1)" :class="{ disabled: currentPage === total }">
        <m-icon icon="right"></m-icon>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import MIcon from "@/components/icon/index.vue";
@Component({
  name: "MPagination",
  components: {
    MIcon
  }
})
export default class MPagination extends Vue {
  @Prop({ type: Number, required: true }) total!: number;
  @Prop({ type: Number, default: 1 }) defaultPage!: number;
  @Prop({ type: Number, default: 7 }) defaultPageSize!: number;
  @Prop({ type: Number, default: 5 }) step!: number;
  @Watch("defaultPage")
  onDefaultPageChanged(newValue: number) {
    if (newValue !== this.currentPage) {
      this.currentPage = newValue;
    }
  }
  // data
  currentPage: number = 1;
  currentPageIndex: number = 0;
  icons: any = [];
  // computed
  get displayPage(): number[] {
    let totalList: number[] = [1, this.total];
    totalList = totalList
      .concat(...this.setTotalListWithoutFirstAndLast())
      .filter((value: any) => value > 0 && value <= this.total)
      .sort((a: number, b: number) => a - b);

    totalList = [...new Set(totalList)];
    totalList = totalList.reduce(
      (acc: any[], cur: number, idx: number, src: number[]) => {
        acc.push({ value: cur });
        if (src[idx + 1] !== undefined && src[idx + 1] - cur > 1) {
          acc.push({
            useEllipsis: true,
            direction: cur < this.currentPage ? "left" : "right",
            title:
              cur < this.currentPage
                ? `向前 ${this.step} 页`
                : `向后 ${this.step} 页`
          });
        }
        return acc;
      },
      []
    );
    return totalList;
  }
  mounted(): void {
    this.setDefaultPage();
  }
  setDefaultPage(): void {
    this.currentPage = this.defaultPage || 1;
  }
  // methods
  setTotalListWithoutFirstAndLast(): number[] {
    let length = this.defaultPageSize - 2;
    let median = Math.round((length - 1) / 2);
    let totalList: number[] = [];
    let minValue = this.currentPage - median;
    for (let i = 0; i < length; i++) {
      if (minValue + i < 1 || minValue + i > this.total) {
        continue;
      }
      totalList.push(minValue + i);
    }
    totalList = totalList.filter((num: number) => num !== 1);
    if (totalList.length < length) {
      let diff = length - totalList.length + 1;
      let lastItem = totalList[totalList.length - 1];
      let firstItem = totalList[0];
      for (let j = 1; j < diff; j++) {
        let item = lastItem + j > this.total ? firstItem - j : lastItem + j;
        totalList.push(item);
      }
    }

    return totalList;
  }
  onClick(item: any, index: number) {
    let current = item.value || this.currentPage;
    if (item.useEllipsis) {
      current =
        item.direction === "left" ? current - this.step : current + this.step;
    }
    if (current > this.total) {
      current = this.total;
    }
    if (current < 1) {
      current = 1;
    }
    this.currentPage = current;
    this.currentPageIndex = index;
    this.$emit("on-change", current, index);
    this.$emit("update:defaultPage", current);
  }
  goNext(step: number) {
    let currentPage = this.currentPage + step;
    if (currentPage < 1 || currentPage > this.total) {
      return;
    }
    this.currentPage = currentPage;
    this.$emit("on-change", currentPage, this.currentPageIndex + step);
    this.$emit("update:defaultPage", currentPage);
  }
  onMouseEnter(item: any, index: number) {
    let icon = "";
    if (item.useEllipsis) {
      const { direction } = item;
      icon =
        item.direction === "left" ? "double-arrow-left" : "double-arrow-right";
    }
    this.$set(this.icons, index, icon);
  }
  onMouseLeave(item: any, index: number) {
    this.$set(this.icons, index, "");
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$blue: #40a9ff;
$disable-grey: #d9d9d9;
.flex-align-center {
  display: flex;
  align-items: center;
}
.m-pagination {
  @extend .flex-align-center;
  .pager-list,
  .pager-list > li {
    list-style: none;
  }
  .pager-list {
    @extend .flex-align-center;
    > li {
      font-size: 14px;
      @extend .flex-align-center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: 1px solid $disable-grey;
      border-radius: $borderRadius;
      cursor: pointer;
      user-select: none;
      &.no-border {
        border: none;
      }
      &:not(:last-child) {
        margin-right: 10px;
      }
      &:hover,
      &.active {
        color: $blue;
        border-color: $blue;
      }
      &.disabled {
        color: $disable-grey;
        border-color: $disable-grey;
        cursor: not-allowed;
        &:hover,
        &.active {
          color: $disable-grey;
          border-color: $disable-grey;
        }
      }
    }
  }
}
</style>
