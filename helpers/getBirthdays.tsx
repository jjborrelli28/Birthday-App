import { BirthdayElement } from "../pages/interfaces";
import { getDates } from "./getDates";

export const getBirthdays = (data: BirthdayElement[]) => {
  const { today, birthdayCurrentYear, birthdayNextYear } = getDates();

  return data.map((item) => {
    return {
      ...item,
      birthday:
        birthdayCurrentYear(item.birthday) < today
          ? birthdayNextYear(item.birthday)
          : birthdayCurrentYear(item.birthday),
    };
  });
};
