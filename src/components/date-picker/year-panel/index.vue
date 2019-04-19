<template>
  <ol class="m-datepick__year">
    <li v-for="year in yearList" :key="year.id" class="m-datepick__year-item">
      <div
        v-for="item in year.value"
        :key="item"
        class="m-datepick__year-content"
        :data-is-current="currentYear === item"
        :data-selected="selectedYear === item"
        @click.stop="onClick(item)"
      >
        {{ item }}
      </div>
    </li>
  </ol>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MDatePickerYearPanel"
})
export default class MDatePickerYearPanel extends Vue {
  @Prop({ type: Number, required: true }) private selectedYear!: number;
  @Prop({ type: Number, required: true }) private startYear!: number;
  // data
  currentYear: number = new Date().getFullYear();
  // computed
  get yearList(): Array<any[]> {
    const startYear = Math.floor(this.startYear / 10) * 10;
    let list = [];
    let res: any[] = [];
    for (let i = 0; i < 10; i++) {
      list.push(startYear + i);
    }
    for (let j = 0; j < list.length; j += 3) {
      res.push({
        id: j,
        value: list.slice(j, j + 3)
      });
    }
    return res;
  }
  // methods
  onClick(year: number): void {
    this.$emit("on-click-year", year);
  }
}
</script>

<style lang="scss" scoped>
@import "../general";
.m-datepick__year {
  padding: 0;
  margin: 0;
  &,
  &-item {
    list-style: none;
  }
  &-item {
    display: flex;
    align-items: center;
    min-width: $itemMinWidth;
    &:last-child {
      margin-bottom: 15px;
    }
  }
  &-content {
    width: ($itemMinWidth / 3) - 10px;
    @include mDatepickItemContent;
  }
}
</style>
