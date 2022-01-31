import { format, add, parseISO, parse, startOfWeek, getDay } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { NextRouter } from "next/router";
import { BirthdayElement } from "../modules/home-management/interfaces";
import { dateFnsLocalizer } from "react-big-calendar";
import enUS from "date-fns/locale/en-US";

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
  const {
    today,
    birthdayCurrentYear,
    birthdayNextYear: nextYearBirthday,
  } = getDates();

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

export const handleSearch = (
  e: Event,
  router: NextRouter,
  value: string,
  query?: string
) => {
  e.preventDefault();

  router.push(`${router.pathname}?${query ?? ""}search=${value}`);
};

export const resetSearch = (
  e: Event,
  dispatch: any,
  router: NextRouter,
  query?: string
) => {
  e.preventDefault();
  dispatch({ type: "value", payload: "" });
  router.push(`${router.pathname}${query ?? ""}`);
};

// Calendar functions

export const getEvents = (birthdays: BirthdayElement[]) => {
  return birthdays?.map((birthday) => {
    const fullName = `${
      birthday.firstName.charAt(0).toUpperCase() +
      birthday.firstName.slice(1) +
      " " +
      birthday.lastName.charAt(0).toUpperCase() +
      birthday.lastName.slice(1)
    }`;

    return {
      title: fullName,
      start: add(parseISO(birthday.birthday), {
        hours: 0,
      }),
      end: add(parseISO(birthday.birthday), {
        hours: 23,
        minutes: 59,
        seconds: 59,
      }),
      notes: "Birthday date",
      user: {
        id: birthday.id,
        fullName,
      },
    };
  });
};

export const getEventStyleGetter = () => {
  const style = {
    borderRadius: "0",
    display: "block",
    color: "white",
    padding: "0",
    paddingLeft: "0.4rem",
  };

  return {
    style,
  };
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "en-US": enUS,
  },
});
