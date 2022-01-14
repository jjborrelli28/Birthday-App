import { ValueProps } from "./interfaces";

export const changeValues = (target: HTMLInputElement) => {
  return {
    type: "value" as ValueProps["type"],
    payload: target.value,
  };
};
