import { StateProps, ValueProps } from "./interfaces";

const reducer = (state: StateProps, action: ValueProps) => {
  switch (action.type) {
    case "value":
      return {
        ...state,
        value: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
