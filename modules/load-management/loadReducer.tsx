import { ActionProps, StateProps } from "./interfaces";

export const loadReducer = (state: StateProps, action: ActionProps) => {
  switch (action.type) {
    case "load":
      return {
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export const initialLoadState = {
  isLoading: false,
};
