import {
  DateTable,
  DateItemParameter,
  DateItem,
  Dictionary,
  CurrentDateObj,
  CurrentYearAndMonth
} from "./calendar.d";

class Calender {
  dateTable: DateTable;
  totalLength: number;
  constructor() {
    this.dateTable = {
      cnWeek: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      cnWeekShort: ["日", "一", "二", "三", "四", "五", "六"],
      enWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      enMonth: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
    this.totalLength = 42;
  }
  // 获取每月的天数
  getOneMonthDays(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }
  // 获取星期数
  getDayOfWeek(year: number, month: number, date: number): number {
    return new Date(year, month - 1, date).getDay();
  }
  // 补零
  zeroize(num: number): string | number {
    return num < 10 ? `0${num}` : num;
  }
  // 格式化时间
  dateFormat(format: string = "YYYY-MM-DD hh:mm:ss", dateStr: string): string {
    const date = dateStr ? new Date(dateStr) : new Date();
    const dictionary: Dictionary = {
      "M+": date.getMonth() + 1, // month
      "D+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds()
    };
    if (/(Y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (let key in dictionary) {
      if (new RegExp("(" + key + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? dictionary[key]
            : ("00" + dictionary[key]).substr(("" + dictionary[key]).length)
        );
      }
    }

    return format;
  }
  // 判断是否今天
  isToday(dateStr: string): boolean {
    const today: Date = new Date();
    const otherDay: Date = new Date(dateStr);
    return (
      today.getFullYear() === otherDay.getFullYear() &&
      today.getMonth() === otherDay.getMonth() &&
      today.getDate() === otherDay.getDate()
    );
  }
  // 获取当前年月日
  getCurrentDate(dateStr?: string): CurrentDateObj {
    const date = dateStr ? new Date(dateStr) : new Date();
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate()
    };
  }
  getDateList(
    year: number = new Date().getFullYear(),
    month: number = new Date().getMonth() + 1
  ) {
    const monthDays: number = this.getOneMonthDays(year, month);
    const firstDayInMonth: number = this.getDayOfWeek(year, month, 1);
    let dateList: any[] = [];

    // 如果当前月不是从星期日开始，从上个月补全
    if (firstDayInMonth !== 0) {
      const { year: currentYear, month: prevMonth } = this.subtractOneMonth(year, month)
      const prevMonthDays = this.getOneMonthDays(currentYear, prevMonth);
      const loopStart = prevMonthDays - firstDayInMonth + 1;
      dateList.push(
        ...this.fillDateList(
          currentYear,
          prevMonth,
          loopStart,
          prevMonthDays + 1,
          true
        )
      );
    }

    // 当月日期添加
    dateList.push(...this.fillDateList(year, month, 1, monthDays + 1, false));

    // 当月结束时未填满整个行
    if (dateList.length < 42) {
      const { year: currentYear, month: nextMonth } = this.addOneMonth(year, month)
      const loopEnd = this.totalLength - dateList.length + 1;
      dateList.push(
        ...this.fillDateList(currentYear, nextMonth, 1, loopEnd, true)
      );
    }

    return dateList;
  }
  setDateListItem(dateItem: DateItemParameter): DateItem {
    const { year, month, date, dateTableIndex, needUpdate } = dateItem;
    const dateStamp = `${year}/${this.zeroize(month)}/${this.zeroize(date)}`;
    return {
      dateStamp,
      year,
      month,
      date,
      cnWeek: this.dateTable.cnWeek[dateTableIndex],
      cnWeekShort: this.dateTable.cnWeekShort[dateTableIndex],
      enWeek: this.dateTable.enWeek[dateTableIndex],
      enMonth: this.dateTable.enMonth[month - 1],
      needUpdate,
      isToday: this.isToday(dateStamp)
    };
  }
  fillDateList(
    year: number,
    month: number,
    loopStart: number,
    loopEnd: number,
    needUpdate: boolean
  ): DateItem[] {
    let dateList: DateItem[] = [];
    for (let i = loopStart; i < loopEnd; i++) {
      dateList.push(
        this.setDateListItem({
          year: year,
          month: month,
          date: i,
          dateTableIndex: this.getDayOfWeek(year, month, i),
          needUpdate
        })
      );
    }
    return dateList;
  }
  addOneMonth(year: number, month: number): CurrentYearAndMonth {
    if(month + 1 > 12) {
      return { year: year + 1, month: 1 }
    }
    return { year, month: month + 1 }
  }
  subtractOneMonth(year: number, month: number): CurrentYearAndMonth {
    if(month - 1 === 0) {
      return { year: year - 1, month: 12 }
    }
    return { year, month: month - 1 }
  }
  getToady(year: number, month: number): DateItem {
    const { year: currentYear, month: currentMonth, date } = this.getCurrentDate();
    const dateTableIndex = this.getDayOfWeek(currentYear, currentMonth, date);
    return {
      dateStamp: `${currentYear}/${currentMonth}/${date}`,
      year: currentYear,
      month: currentMonth,
      date,
      cnWeek: this.dateTable.cnWeek[dateTableIndex],
      cnWeekShort: this.dateTable.cnWeekShort[dateTableIndex],
      enWeek: this.dateTable.enWeek[dateTableIndex],
      enMonth: this.dateTable.enMonth[currentMonth - 1],
      needUpdate: currentYear !== year || currentMonth !== month,
      isToday: true
    }
  }
}

export default Calender;
