import { BirthdayElement } from "../pages/interfaces";

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
