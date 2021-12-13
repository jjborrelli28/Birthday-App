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

  const refValues = useRef(values);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }: any) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });

    refValues.current = {
      ...values,
      [target.name]: target.value,
    };
  };

  const setDate = (date: string) => {
    setValues({
      ...refValues.current,
      birthday: date,
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
