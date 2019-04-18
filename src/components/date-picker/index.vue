<template>
  <div class="m-datepicker">
    <m-popover position="bottom">
      <m-input
        v-model="displayDate"
        :placeholder="placeholder"
        prefix-icon="date"
        clearable
        @clear="onClear">
      </m-input>
      <template v-slot:content>
        <div class="m-datepicker__panels">
          <div class="m-datepicker__head">
            <m-icon icon="double-arrow-left" @on-click="onClickPrevYear"></m-icon>
            <m-icon icon="left" @on-click="onClickPrevMonth"></m-icon>
            <div class="m-datepicker__head-title">
              <span @click="togglePanels('year')"
                >{{ currentDate["year"] }}年</span
              >
              <span @click="togglePanels('month')"
                >{{ currentDate["month"] }}月</span
              >
            </div>
            <m-icon icon="right" @on-click="onClickNextMonth"></m-icon>
            <m-icon icon="double-arrow-right" @on-click="onClickNextYear"></m-icon>
          </div>
          <div class="m-datepicker__body">
            <div v-if="currentPanel === 'year'">年</div>
            <div v-else-if="currentPanel === 'month'">月</div>
            <div v-else>
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
                    :data-is-today="subDateItem.isToday"
                    :data-selected="isSelected(subDateItem.dateStamp)"
                    :data-not-current-month="subDateItem.needUpdate"
                    v-for="subDateItem in dateItem.value"
                    :key="subDateItem.dateStamp"
                    @click="onSelected(subDateItem)"
                  >
                    {{ subDateItem.date }}
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <div class="m-datepicker__foot" :data-is-multiple="type === 'multiple'">
            <div class="m-datepicker__foot-today" @click="selectedToday">
              今天
            </div>
            <div class="m-datepicker__foot-btns" v-if="type === 'multiple'">
              <m-button :options="{ color: 'blue', shape: 'rounded' }">确定</m-button>
              <m-button :options="{ color: 'blue', shape: 'rounded' }">清除</m-button>
            </div>
          </div>
        </div>
      </template>
    </m-popover>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
import MPopover from "@/components/popover/index.vue";
import MIcon from "@/components/icon/index.vue";
import MInput from "@/components/input/index.vue";
import MButton from "@/components/button/index.vue";
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
    MButton
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
  @Model("update:date", { type: String }) readonly value!: string;
  @Watch("value", { immediate: true })
  onValueChanged(newValue: string) {
    if (newValue) {
      const displayDate: string = this.calender.dateFormat(
        this.format,
        newValue
      );
      this.displayDate = displayDate;
    }
  }
  // data
  currentPanel: string = "days";
  calender: Calender = new Calender();
  dateList: any[] = [];
  displayDate: string = "";
  currentDate: CurrentDateObj = {
    year: NaN,
    month: NaN,
    date: NaN
  };
  updateDateListTimer: any = null;
  mounted() {
    this.setDateList();
    this.currentDate = this.calender.getCurrentDate();
  }
  // computed
  get formattedDate(): any[] {
    return this.formatDateList(this.dateList);
  }
  get dateTable(): DateTable {
    return this.calender.dateTable;
  }
  // methods
  onClear(): void {
    this.$emit("update:date", '');
  }
  togglePanels(type: string): void {
    this.currentPanel = type;
  }
  setDateList(): void {
    this.dateList = this.calender.getDateList();
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
  onSelected(date: DateItem): void {
    if(this.type === 'single') {
      this.singleSelectHandler(date)
    }
  }
  singleSelectHandler(date:DateItem): void {
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
  onClickPrevMonth(): void {
    const { year, month, date } = this.currentDate;
    const { year: currentYear, month: prevMonth } = this.calender.subtractOneMonth(year, month);
    this.currentDate = { year: currentYear, month: prevMonth, date }
    this.dateList = this.calender.getDateList(currentYear, prevMonth);
  }
  onClickNextMonth(): void {
    const { year, month, date } = this.currentDate;
    const { year: currentYear, month: prevMonth } = this.calender.addOneMonth(year, month);
    this.currentDate = { year: currentYear, month: prevMonth, date }
    this.dateList = this.calender.getDateList(currentYear, prevMonth);
  }
  onClickPrevYear(): void {
    const { year, month } = this.currentDate;
    this.$set(this.currentDate, 'year', year - 1);
    this.dateList = this.calender.getDateList(year - 1, month);
  }
  onClickNextYear(): void {
    const { year, month } = this.currentDate;
    this.$set(this.currentDate, 'year', year + 1);
    this.dateList = this.calender.getDateList(year + 1, month);
  }
  isSelected(dateStamp: string): boolean {
    return this.calender.dateFormat(this.valueFormat, dateStamp) === this.value;
  }
  selectedToday(): void {
    const { year, month } = this.currentDate;
    const today: DateItem = this.calender.getToady(year, month);
    this.singleSelectHandler(today);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$red: rgb(250, 85, 85);
$grey: #ebebeb;
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
  &__date {
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
    }
    &-week {
      margin-bottom: 5px;
      border-bottom: 1px solid $grey;
    }
    &-content {
      text-align: center;
      width: 32px;
      height: 32px;
      line-height: 32px;
      box-sizing: border-box;
      flex: none;
      border-radius: $borderRadius;
      margin: 5px;
      &[data-not-current-month="true"] {
        color: #a3a2a2;
      }
      &[data-is-today="true"] {
        color: $red;
        border: 1px solid $red;
      }
      &[data-selected="true"] {
        color: #fff;
        background: $red;
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
        &:first-child {
          margin-right: 10px;
        }
      }
    }
    &[data-is-multiple="true"] {
      justify-content: space-between;
    }
  }
}
</style>
