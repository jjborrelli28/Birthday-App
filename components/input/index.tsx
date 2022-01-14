import React from "react";
import styles from "./index.module.scss";
import InputProps from "./interfaces";
import { cc } from "../../helpers/helpers";

const Input = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  minLength,
  maxLength,
  pattern,
  required,
  max,
  readOnly = false,
}: InputProps) => {
  return (
    <input
      className={cc(styles.input, readOnly && styles.readOnly)}
      type={type}
      id={id}
      name={name}
      placeholder={`${required ? "*" : ""}${placeholder}`}
      value={value}
      onChange={onChange}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      required={required}
      max={max}
      readOnly={readOnly}
    />
  );
};

export default Input;
