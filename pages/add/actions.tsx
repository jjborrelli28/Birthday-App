export const changeValues: ReturnType<() => any> = (
  target: HTMLInputElement
) => {
  return {
    type: target.name,
    payload: target.value,
  };
};

export const changeBirthday: ReturnType<() => any> = (date: string | null) => {
  return {
    type: "birthday",
    payload: date,
    //"T00:00:00.000Z"
  };
};

export const showMessage: ReturnType<() => any> = (
  show: boolean,
  variant: string,
  text: string
) => {
  return {
    type: "message",
    payload: {
      show,
      variant,
      text,
    },
  };
};
