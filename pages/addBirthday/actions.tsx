import types from "./types";

export const changeEmail = (target: HTMLInputElement) => {
  return {
    type: types.email,
    payload: target.value,
  };
};

export const changeFirstName = (target: HTMLInputElement) => {
  return {
    type: types.firstName,
    payload: target.value,
  };
};

export const changeLastName = (target: HTMLInputElement) => {
  return {
    type: types.lastName,
    payload: target.value,
  };
};

export const changeBirthday = (date: string) => {
  return {
    type: types.birthday,
    payload: date.concat("T00:00:00.000Z"),
  };
};
