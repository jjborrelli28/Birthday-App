import types from "./types";

export const onChangeEmail = (target: HTMLInputElement) => {
  return {
    type: types.onChangeEmail,
    payload: target.value,
  };
};

export const onChangeFirstName = (target: HTMLInputElement) => {
  return {
    type: types.onChangeFirstName,
    payload: target.value,
  };
};

export const onChangeLastName = (target: HTMLInputElement) => {
  return {
    type: types.onChangeLastName,
    payload: target.value,
  };
};

export const onChangeBirthday = (date: string) => {
  return {
    type: types.onChangeBirthday,
    payload: date.concat("T00:00:00.000Z"),
  };
};
