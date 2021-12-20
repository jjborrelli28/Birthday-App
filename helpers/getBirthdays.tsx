import BirthdaysProps from "../pages/interfaces";
import { getDates } from "./getDates";

export const getBirthdays = (data: BirthdaysProps) => {
  const { today, birthdayCurrentYear, birthdayNextYear } = getDates();

  return data.birthdays.map((item) => {
    return {
      ...item,
      birthday:
        birthdayCurrentYear(item.birthday) < today
          ? birthdayNextYear(item.birthday)
          : birthdayCurrentYear(item.birthday),
    };
  });
};
