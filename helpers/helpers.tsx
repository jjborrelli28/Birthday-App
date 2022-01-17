import { format, add } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { BirthdayElement } from "../modules/home-management/interfaces";

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

export const getBirthdays = (data: BirthdayElement[]) => {
  const { today, birthdayCurrentYear, birthdayNextYear: nextYearBirthday } = getDates();

  return data.map((item) => {
    return {
      ...item,
      birthday:
        birthdayCurrentYear(item.birthday) < today
          ? nextYearBirthday(item.birthday)
          : birthdayCurrentYear(item.birthday),
    };
  });
};

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

export const formatName = (firstName: string, lastName: string) =>
  `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
    lastName.charAt(0).toUpperCase() + lastName.slice(1)
  }`;

export const formatDate = (date: string, year = "yyyy") => {
  return formatInTimeZone(date, "Europe/Stockholm", `${year}-MM-dd`);
};

export const getPage = (
  birthdays: BirthdayElement[],
  page: number,
  itemsForPage: number
) => {
  return birthdays.slice(
    page * itemsForPage - itemsForPage,
    page * itemsForPage
  );
};

export const cc = (...classNames: (string | boolean)[]) => {
  return classNames
    .filter((className) => typeof className === "string")
    .join(" ");
};
