<template>
  <div class="m-datepicker">
    <m-popover position="bottom">
      <m-input
        :value="displayDate"
        :placeholder="placeholder"
        prefix-icon="date"
        clearable
        @clear="onClear"
      >
      </m-input>
      <template v-slot:content>
        <div class="m-datepicker__panels">
          <div class="m-datepicker__head">
            <m-icon
              icon="double-arrow-left"
              @on-click="onClickPrevYear"
            ></m-icon>
            <m-icon
              icon="left"
              @on-click="onClickPrevMonth"
              v-if="currentPanel === 'date'"
            ></m-icon>
            <div class="m-datepicker__head-title">
              <span @click="togglePanels('year')">{{ getDisplayYear() }}</span>
              <span
                @click.stop="togglePanels('month')"
                v-if="currentPanel === 'date'"
                >{{ currentDate["month"] }}月</span
              >
            </div>
            <m-icon
              icon="right"
              @on-click="onClickNextMonth"
              v-if="currentPanel === 'date'"
            ></m-icon>
            <m-icon
              icon="double-arrow-right"
              @on-click="onClickNextYear"
            ></m-icon>
          </div>
          <div class="m-datepicker__body">
            <div v-if="currentPanel === 'year'">
              <m-date-picker-year-panel
                :start-year="startYear"
                :selected-year="currentDate['year']"
                @on-click-year="onClickYear"
              ></m-date-picker-year-panel>
            </div>
            <div v-else-if="currentPanel === 'month'">
              <m-date-picker-month-panel
                :selectedMonth="currentDate['month']"
                @on-click-month="onClickMonth"
              ></m-date-picker-month-panel>
            </div>
            <div v-else>
              <m-date-picker-date-panel
                :date-table="dateTable"
                :formatted-date="formattedDate"
                :week-type="weekType"
                :value-format="valueFormat"
                :value="value"
                :start-date="startDate"
                :end-date="endDate"
                @on-click-date="onClickDate"
              ></m-date-picker-date-panel>
            </div>
          </div>
          <div
            class="m-datepicker__foot"
            :data-is-multiple="type === 'multiple'"
            :data-visible-goback="
              currentPanel === 'year' || currentPanel === 'month'
            "
          >
            <div class="m-datepicker__foot-today" @click="goBackCurrentDate">
              {{ goBackCurrentDateBtn }}
            </div>
            <div class="m-datepicker__foot-btns">
              <template
                v-if="currentPanel === 'year' || currentPanel === 'month'"
              >
                <m-button
                  :options="{ color: 'blue', shape: 'rounded' }"
                  @click.stop="gobackDatePanel"
                  >返回</m-button
                >
              </template>
              <template v-if="type === 'multiple' && currentPanel === 'date'">
                <m-button
                  :options="{ color: 'blue', shape: 'rounded' }"
                  @click.stop="onConfirm"
                  >确定</m-button
                >
                <m-button
                  :options="{ color: 'blue', shape: 'rounded' }"
                  @click.stop="onCleanUp"
                  >清除</m-button
                >
              </template>
            </div>
          </div>
        </div>
      </template>
    </m-popover>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Model,
  Watch,
  Provide
} from "vue-property-decorator";
import MPopover from "@/components/popover/index.vue";
import MIcon from "@/components/icon/index.vue";
import MInput from "@/components/input/index.vue";
import MButton from "@/components/button/index.vue";
import MDatePickerDatePanel from "./date-panel/index.vue";
import MDatePickerYearPanel from "./year-panel/index.vue";
import MDatePickerMonthPanel from "./month-panel/index.vue";
import Calender from "@/utils/calender/calendar";
import {
  DateTable,
  DateItem,
  CurrentDateObj
} from "@/utils/calender/calendar.d";

@Component({
  name: "MDatePicker",
  components: {
    MPopover,
    MInput,
    MIcon,
    MButton,
    MDatePickerDatePanel,
    MDatePickerYearPanel,
    MDatePickerMonthPanel
  }
})
export default class MDatePicker extends Vue {
  @Prop({ type: String, default: "cnWeekShort" }) private weekType!: string;
  @Prop({ type: String, default: "YYYY-MM-DD" })
  private format!: string;
  @Prop({ type: String, default: "YYYY/MM/DD" }) private valueFormat!: string;
  @Prop({ type: String, default: "" }) private placeholder!: string;
  // single单选 multiple 多选
  @Prop({ type: String, default: "single" }) private type!: string;
  @Model("update:date", { type: [String, Array] }) readonly value!:
    | string
    | string[];
  @Watch("value", { immediate: true })
  onValueChanged(newValue: string | string[]) {
    if (newValue) {
      let displayDate: string;
      if (Array.isArray(newValue)) {
        displayDate = newValue
          .map((item: string) => this.calender.dateFormat(this.format, item))
          .join(",");
      } else {
        displayDate = this.calender.dateFormat(this.format, newValue);
      }
      this.displayDate = displayDate;
    } else {
      this.displayDate = "";
    }
  }
  @Watch("currentDate", { deep: true })
  onCurrentDateChanged(newValue: CurrentDateObj) {
    const { year } = newValue;
    if (year !== this.startYear) {
      this.startYear = year;
    }
  }
  @Provide() calender: Calender = new Calender();
  // data
  currentPanel: string = "date";
  dateList: any[] = [];
  displayDate: string = "";
  startYear: number = new Date().getFullYear();
  currentDate: CurrentDateObj = {
    year: NaN,
    month: NaN,
    date: NaN
  };
  updateDateListTimer: any = null;
  startDate: any = null;
  endDate: any = null;
  mounted() {
    this.dateList = this.calender.getDateList();
    this.currentDate = this.calender.getCurrentDate();
  }
  // computed
  get formattedDate(): any[] {
    return this.formatDateList(this.dateList);
  }
  get dateTable(): DateTable {
    return this.calender.dateTable;
  }
  get goBackCurrentDateBtn(): string {
    const btns: any = {
      year: "今年",
      month: "今月",
      date: "今天"
    };
    return btns[this.currentPanel];
  }
  // methods
  onClear(): void {
    this.currentDate = this.calender.getCurrentDate();
    this.$emit("update:date", "");
  }
  togglePanels(type: string): void {
    this.currentPanel = type;
  }
  formatDateList(dataList: any[]): any[] {
    let newDateList = [];
    for (let i = 0; i < dataList.length; i += 7) {
      newDateList.push({
        id: i,
        value: dataList.slice(i, i + 7)
      });
    }
    return newDateList;
  }
  onClickDate(date: DateItem): void {
    if (this.type === "single") {
      return this.singleSelectHandler(date);
    }
    if (this.type === "multiple") {
      return this.multipleSelectHandler(date);
    }
  }
  onClickYear(year: number): void {
    const { year: currentYear, month, date } = this.currentDate;
    if (currentYear === year) {
      this.currentPanel = "month";
      return;
    }
    this.$set(this.currentDate, "year", year);
    this.dateList = this.calender.getDateList(year, month);
    this.currentPanel = "month";
  }
  onClickMonth(month: number): void {
    const { year, month: currentMonth, date } = this.currentDate;
    if (currentMonth === month) {
      this.currentPanel = "date";
      return;
    }
    this.$set(this.currentDate, "month", month);
    this.dateList = this.calender.getDateList(year, month);
    this.currentPanel = "date";
  }
  singleSelectHandler(date: DateItem): void {
    const value: string = this.calender.dateFormat(
      this.valueFormat,
      date.dateStamp
    );
    const monthAndYear = this.calender.getCurrentDate(date.dateStamp);
    if (date.needUpdate) {
      this.updateDateListTimer = setTimeout(() => {
        this.dateList = this.calender.getDateList(
          monthAndYear.year,
          monthAndYear.month
        );
      }, 0);
    }
    this.currentDate = monthAndYear;
    this.$emit("update:date", value);
    (this.$children[0] as any).close();
  }
  multipleSelectHandler(date: DateItem): void {
    this.currentDate = {
      year: date.year,
      month: date.month,
      date: date.date
    };
    if (!this.startDate) {
      this.startDate = date;
      return;
    }
    if (this.startDate && !this.endDate) {
      if (
        this.calender.parseDateStamp(this.startDate.dateStamp) >
        this.calender.parseDateStamp(date.dateStamp)
      ) {
        this.endDate = this.startDate;
        this.startDate = date;
        return;
      }
      this.endDate = date;
      return;
    }
    if (this.startDate && this.endDate) {
      this.startDate = date;
      this.endDate = null;
      return;
    }
  }
  onClickPrevMonth(): void {
    const { year, month, date } = this.currentDate;
    const {
      year: currentYear,
      month: prevMonth
    } = this.calender.subtractOneMonth(year, month);
    this.currentDate = { year: currentYear, month: prevMonth, date };
    this.dateList = this.calender.getDateList(currentYear, prevMonth);
  }
  onClickNextMonth(): void {
    const { year, month, date } = this.currentDate;
    const { year: currentYear, month: prevMonth } = this.calender.addOneMonth(
      year,
      month
    );
    this.currentDate = { year: currentYear, month: prevMonth, date };
    this.dateList = this.calender.getDateList(currentYear, prevMonth);
  }
  onClickPrevYear(): void {
    const { year, month } = this.currentDate;
    if (this.currentPanel === "year") {
      this.startYear = this.startYear - 10;
      return;
    }
    this.$set(this.currentDate, "year", year - 1);
    this.dateList = this.calender.getDateList(year - 1, month);
  }
  onClickNextYear(): void {
    const { year, month } = this.currentDate;
    if (this.currentPanel === "year") {
      this.startYear = this.startYear + 10;
      return;
    }
    this.$set(this.currentDate, "year", year + 1);
    this.dateList = this.calender.getDateList(year + 1, month);
  }
  goBackCurrentDate(): void {
    const { year, month } = this.currentDate;
    const currentDate = this.calender.getCurrentDate();
    if (this.currentPanel === "year") {
      this.startYear = currentDate.year;
      this.$set(this.currentDate, "year", currentDate.year);
      return;
    }
    if (this.currentPanel === "month") {
      this.$set(this.currentDate, "month", currentDate.month);
      return;
    }
    const today: DateItem = this.calender.getToady(year, month);
    this.singleSelectHandler(today);
  }
  getDisplayYear(): string {
    if (this.currentPanel === "year") {
      return `${this.startYear - 9}-${this.startYear}`;
    }
    return `${this.currentDate["year"]}年`;
  }
  gobackDatePanel(): void {
    this.currentPanel = "date";
  }
  onConfirm(): void {
    const startDate = this.startDate
      ? this.calender.dateFormat(this.valueFormat, this.startDate.dateStamp)
      : "";
    const endDate = this.endDate
      ? this.calender.dateFormat(this.valueFormat, this.endDate.dateStamp)
      : "";
    this.$emit("update:date", [startDate, endDate]);
    (this.$children[0] as any).close();
  }
  onCleanUp(): void {
    this.startDate = null;
    this.endDate = null;
    this.onClear();
  }
}
</script>

<style lang="scss" scoped>
@import "./general";
.m-datepicker {
  &__head {
    display: flex;
    align-items: center;
    user-select: none;
    .m-icon,
    span {
      cursor: pointer;
    }
    .m-icon {
      padding: 10px 10px;
      color: lighten($color: #000000, $amount: 40);
    }
    &-title {
      flex: 1;
      padding: 10px 20px;
      text-align: center;
      span {
        padding: 0 5px;
      }
    }
  }
  &__foot {
    padding-top: 10px;
    border-top: 1px solid $grey;
    display: flex;
    align-items: center;
    justify-content: center;
    &-today {
      color: #1890ff;
      cursor: pointer;
      padding: 0 10px;
    }
    &-btns {
      .m-button {
        &:last-child {
          margin-left: 10px;
        }
      }
    }
    &[data-visible-goback="true"],
    &[data-is-multiple="true"] {
      justify-content: space-between;
    }
  }
}
</style>
