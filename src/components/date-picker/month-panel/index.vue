<template>
  <ol class="m-datepick__month">
    <li
      v-for="month in monthList"
      :key="month.id"
      class="m-datepick__month-item"
    >
      <div
        v-for="item in month.months"
        :key="item.text"
        class="m-datepick__month-content"
        :data-is-current="currentMonth === item.value"
        :data-selected="selectedMonth === item.value"
        @click.stop="onClick(item.value)"
      >
        {{ item.text }}
      </div>
    </li>
  </ol>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "MDatePickerMonthPanel"
})
export default class MDatePickerMonthPanel extends Vue {
  @Prop({ type: Number, required: true }) private selectedMonth!: number;
  // date
  monthList: any[] = [
    {
      id: 1,
      months: [
        { text: "一月", value: 1 },
        { text: "二月", value: 2 },
        { text: "三月", value: 3 },
        { text: "四月", value: 4 }
      ]
    },
    {
      id: 2,
      months: [
        { text: "五月", value: 5 },
        { text: "六月", value: 6 },
        { text: "七月", value: 7 },
        { text: "八月", value: 8 }
      ]
    },
    {
      id: 3,
      months: [
        { text: "九月", value: 9 },
        { text: "十月", value: 10 },
        { text: "十一月", value: 11 },
        { text: "十二月", value: 12 }
      ]
    }
  ];
  currentMonth: number = new Date().getMonth() + 1;
  // methods
  onClick(month: number): void {
    this.$emit("on-click-month", month);
  }
}
</script>

<style lang="scss" scoped>
@import "../general";
.m-datepick__month {
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
    width: ($itemMinWidth / 4) - 10px;
    @include mDatepickItemContent;
  }
}
</style>
