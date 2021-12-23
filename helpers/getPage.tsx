import { BirthdayElement } from "../modules/home-management/interfaces";

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
