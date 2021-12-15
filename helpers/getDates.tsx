import { format, add } from "date-fns";
import isValid from "date-fns/isValid";
import parseISO from "date-fns/parseISO";

export const getDates = () => {
  const today = format(new Date(), "yyyy-MM-dd");

  const nextWeek = format(add(new Date(), { days: 7 }), "yyyy-MM-dd");

  const currentYear = format(new Date(), "yyyy");

  const birthdayCurrentYear = (date: string) => {
    return format(parseISO(date), `${currentYear}-MM-dd`);
  };

  const birthdayNextYear = (date: string) => {
    const dob = add(parseISO(format(parseISO(date), `${currentYear}-MM-dd`)), {
      years: 1,
    });

    if (isValid(dob)) {
      return format(dob, "yyyy-MM-dd");
    } else {
      return "Date invalid";
    }
  };

  return {
    today,
    nextWeek,
    birthdayCurrentYear,
    birthdayNextYear,
  };
};
