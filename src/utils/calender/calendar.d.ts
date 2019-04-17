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
}
interface DateItem {
  dateStamp: string;
  date: number;
  cnWeek: string;
  cnWeekShort: string;
  enWeek: string;
  enMonth: string;
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
export { DateTable, DateItemParameter, DateItem, Dictionary };
