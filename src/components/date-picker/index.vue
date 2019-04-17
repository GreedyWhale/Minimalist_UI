<template>
  <div class="m-date__picker">
    <m-popover position="bottom">
      <m-input v-model="selectedDate"></m-input>
      <template v-slot:content>
        <div class="m-date__picker-panels">
          <div class="m-date__picker-head">
            <m-icon icon="double-arrow-left"></m-icon>
            <m-icon icon="left"></m-icon>
            <div class="m-date__picker-head-date">
              <span @click="togglePanels('year')">2019年</span>
              <span @click="togglePanels('month')">10月</span>
            </div>
            <m-icon icon="right"></m-icon>
            <m-icon icon="double-arrow-right"></m-icon>
          </div>
          <div>
            <div v-if="currentPanel === 'year'">年</div>
            <div v-else-if="currentPanel === 'month'">月</div>
            <div v-else>
              <ol class="m-date__picker-date-list">
                <li
                  class="m-date__picker-date-list-item m-date__picker-date-list-week"
                >
                  <div
                    class="m-date__picker-date-list-content"
                    v-for="week in dateTable[weekType]"
                    :key="week"
                  >
                    {{ week }}
                  </div>
                </li>
                <li
                  class="m-date__picker-date-list-item"
                  v-for="dateItem in formattedDate"
                  :key="dateItem.id"
                >
                  <div
                    class="m-date__picker-date-list-content"
                    :data-is-today="calender.isToday(subDateItem.dateStamp)"
                    :data-selected="isSelected(subDateItem.dateStamp)"
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
import Calender from "@/utils/calender/calendar";
import { DateTable, DateItem } from "@/utils/calender/calendar.d";

@Component({
  name: "MDatePicker",
  components: {
    MPopover,
    MInput,
    MIcon
  }
})
export default class MDatePicker extends Vue {
  @Prop({ type: String, default: "cnWeekShort" }) private weekType!: string;
  @Prop({ type: String, default: "YYYY 年 MM 月 DD 日" })
  private format!: string;
  @Prop({ type: String, default: "YYYY/MM/DD" }) private valueFormat!: string;
  @Model("update:date", { type: String }) readonly value!: string;
  @Watch("value", { immediate: true })
  onValueChanged(newValue: string) {
    if (newValue) {
      const selectedDate: string = this.calender.dateFormat(
        this.format,
        newValue
      );
      this.selectedDate = selectedDate;
    }
  }
  // data
  currentPanel: string = "days";
  calender: Calender = new Calender();
  dateList: any[] = [];
  selectedDate: string = "";
  mounted() {
    this.setDateList();
  }
  // computed
  get formattedDate(): any[] {
    return this.formatDateList(this.dateList);
  }
  get dateTable(): DateTable {
    return this.calender.dateTable;
  }
  // methods
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
    const value: string = this.calender.dateFormat(
      this.valueFormat,
      date.dateStamp
    );
    this.$emit("update:date", value);
  }
  isSelected(dateStamp:string): boolean {
    return this.calender.dateFormat(this.valueFormat, dateStamp) === this.value;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
$red: rgb(250, 85, 85);
.m-date__picker {
  &-head {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .m-icon,
    span {
      cursor: pointer;
    }
    .m-icon {
      padding: 0 10px;
      color: lighten($color: #000000, $amount: 40);
    }
    &-date {
      flex: 1;
      padding: 0 20px;
      text-align: center;
      span {
        padding: 0 5px;
      }
    }
  }
  &-date-list {
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
      border-bottom: 1px solid #ebebeb;
    }
    &-content {
      text-align: center;
      width: 50px;
      line-height: 50px;
      height: 50px;
      box-sizing: border-box;
      flex: none;
      border-radius: $borderRadius;
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
}
</style>
