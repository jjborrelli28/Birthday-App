import { format, add } from "date-fns";
import { formatDate } from "./formatDate";

export const getDates = () => {
  const today = format(new Date(), "yyyy-MM-dd");

  const nextWeek = format(add(new Date(), { days: 7 }), "yyyy-MM-dd");

  const currentYear = new Date().getFullYear();

  const nextYear = currentYear + 1;

  const birthdayCurrentYear = (date: string) => {
    return formatDate(date, currentYear.toString());
  };

  const birthdayNextYear = (date: string) => {
    return formatDate(date, nextYear.toString());
  };

  return {
    today,
    nextWeek,
    birthdayCurrentYear,
    birthdayNextYear,
  };
};
