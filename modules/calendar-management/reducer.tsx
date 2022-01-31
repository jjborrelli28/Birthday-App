import { ActionProps, StateProps } from "./interfaces";

export const reducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "select":
      return {
        select: true,
        date: "",
        user: {
          id: action.payload.id,
          fullName: action.payload.fullName,
        },
      };

    case "unselect":
      return {
        select: false,
        date: action.payload.date,
        user: {
          id: "",
          fullName: "",
        },
      };

    default:
      return state;
  }
};

export const initialState = {
  select: false,
  date: "",
  user: {
    id: "",
    fullName: "",
  },
};
