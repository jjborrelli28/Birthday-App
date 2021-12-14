import { useState, useRef } from "react";
import ValuesProps from "./interface";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  birthday: null,
};

const useForm = () => {
  const [values, setValues] = useState<ValuesProps>(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }: any) => {
    setValues((state) => {
      return {
        ...state,
        [target.name]: target.value,
      };
    });
  };

  const setDate = (date: string) => {
    setValues((state) => {
      return {
        ...state,
        birthday: date,
      };
    });
  };

  return {
    values,
    handleInputChange,
    setDate,
    reset,
  };
};

export default useForm;
