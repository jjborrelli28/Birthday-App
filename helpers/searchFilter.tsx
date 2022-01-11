import { BirthdayElement } from "../modules/home-management/interfaces";

export const searchFilter = (arr: BirthdayElement[], search: string) => {
  const value = search.toLowerCase();

  return arr.filter(
    (birthday: BirthdayElement) =>
      birthday.firstName.toLowerCase().includes(value) ||
      birthday.lastName.toLowerCase().includes(value) ||
      birthday.email.toLowerCase().includes(value)
  );
};
