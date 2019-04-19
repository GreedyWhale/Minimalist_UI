<template>
  <ol class="m-datepicker__date">
    <li class="m-datepicker__date-item m-datepicker__date-week">
      <div
        class="m-datepicker__date-content"
        v-for="week in dateTable[weekType]"
        :key="week"
      >
        {{ week }}
      </div>
    </li>
    <li
      class="m-datepicker__date-item"
      v-for="dateItem in formattedDate"
      :key="dateItem.id"
    >
      <div
        class="m-datepicker__date-content"
        :data-is-current="subDateItem.isToday"
        :data-selected="isSelected(subDateItem.dateStamp)"
        :data-not-current="subDateItem.needUpdate"
        v-for="subDateItem in dateItem.value"
        :key="subDateItem.dateStamp"
        @click="onClick(subDateItem)"
      >
        {{ subDateItem.date }}
      </div>
    </li>
  </ol>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator";
import { DateTable, DateItem } from "@/utils/calender/calendar.d";
import Calender from "@/utils/calender/calendar";
@Component({
  name: "MDatePickerDatePanel"
})
export default class MDatePickerDatePanel extends Vue {
  @Prop({ type: Object, required: true }) private dateTable!: DateTable;
  @Prop({ type: String, default: "cnWeekShort" }) private weekType!: string;
  @Prop({ type: Array, required: true }) private formattedDate!: any[];
  @Prop({ type: String, default: "YYYY/MM/DD" }) private valueFormat!: string;
  @Prop({ type: String, default: '' }) private value!: string;
  @Inject() readonly calender!: Calender;
  // methods
  isSelected(dateStamp: string): boolean {
    return this.calender.dateFormat(this.valueFormat, dateStamp) === this.value;
  }
  onClick(date: DateItem): void {
    this.$emit('on-click-date', date)
  }
}
</script>

<style lang="scss" scoped>
@import "../general";
.m-datepicker__date {
  padding: 0;
  margin: 0;
  &,
  &-item {
    list-style: none;
  }
  &-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    min-width: $itemMinWidth;
  }
  &-week {
    margin-bottom: 5px;
    border-bottom: 1px solid $grey;
  }
  &-content {
    width: ($itemMinWidth / 7) - 10px;
    @include mDatepickItemContent;
  }
}
</style>
