import { BirthdayElement } from "../pages/interfaces";
import { formatDate } from "./formatDate";

export const sortDates = (dates: BirthdayElement[]) => {
  const datesSort = dates.sort((a, b) => {
    if (formatDate(a.birthday) > formatDate(b.birthday)) {
      return 1;
    }
    if (formatDate(a.birthday) < formatDate(b.birthday)) {
      return -1;
    }
    return 0;
  });

  return datesSort;
};
