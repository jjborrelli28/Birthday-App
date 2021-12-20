import { ActionProps } from "./interfaces";

const reducer = (state: number, action: ActionProps) => {
  switch (action.type) {
    case "previous":
      if (state > action.payload) {
        return state - 1;
      }

    case "select":
      return +action.payload;

    case "next":
      if (state < action.payload) {
        return state + 1;
      }

    default:
      return state;
  }
};

export default reducer;
