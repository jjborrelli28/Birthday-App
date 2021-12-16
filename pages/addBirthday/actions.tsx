export const changeValues = (target: HTMLInputElement) => {
  return {
    type: target.name,
    payload: target.value,
  };
};

export const changeBirthday = (date: string | null) => {
  return {
    type: "birthday",
    payload: date,
    //"T00:00:00.000Z"
  };
};

export const showMessage = (show: boolean, variant: string, text: string) => {
  return {
    type: "message",
    payload: {
      show,
      variant,
      text,
    },
  };
};
