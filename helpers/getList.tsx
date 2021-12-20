import { BirthdayElement } from '../pages/interfaces';

export const getList = (birthdays: BirthdayElement[], page: number) => {
  const pages = Math.ceil(birthdays.length / 20);
  const dobs = birthdays.slice(page * 20 - 20, page * 20);

  return { dobs, pages };
};
