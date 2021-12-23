import { BirthdayElement } from "../modules/home-management/interfaces";

export const sortDates = (dates: BirthdayElement[]) => {
  const datesSort = dates.sort((a, b) => {
    if (a.birthday > b.birthday) {
      return 1;
    }
    if (a.birthday < b.birthday) {
      return -1;
    }
    return 0;
  });

  return datesSort;
};
