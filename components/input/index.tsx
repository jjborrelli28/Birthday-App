import React from "react";
import styles from "./index.module.scss";
import InputProps from "./interfaces";
import { cc } from "../../helpers/classConcatenator";

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
}: InputProps) => {
  return (
    <input
      className={cc(styles.input)}
      type={type}
      id={id}
      name={name}
      placeholder={`*${placeholder}`}
      value={value}
      onChange={onChange}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      required={required}
      max={max}
    />
  );
};

export default Input;
