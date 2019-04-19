interface DateTable {
  cnWeek: string[];
  cnWeekShort: string[];
  enWeek: string[];
  enMonth: string[];
}

interface DateItemParameter {
  date: number;
  year: number;
  month: number;
  dateTableIndex: number;
  needUpdate: boolean;
}
interface DateItem {
  dateStamp: string;
  year: number;
  month: number;
  date: number;
  cnWeek: string;
  cnWeekShort: string;
  enWeek: string;
  enMonth: string;
  needUpdate: boolean;
  isToday: boolean;
}
interface Dictionary {
  "M+": number;
  "D+": number;
  "h+": number;
  "m+": number;
  "s+": number;
  "q+": number;
  S: number;
  [key: string]: any;
}

interface CurrentDateObj {
  year: number;
  month: number;
  date: number;
}
interface CurrentYearAndMonth {
  year: number;
  month: number;
}
export {
  DateTable,
  DateItemParameter,
  DateItem,
  Dictionary,
  CurrentDateObj,
  CurrentYearAndMonth
};
