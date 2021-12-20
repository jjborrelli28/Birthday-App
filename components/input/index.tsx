import React from "react";
import styles from "./index.module.scss";
import InputProps from "./interfaces";
import { classConcatenator } from "../../helpers/classConcatenator";

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
  lastItem = false,
}: InputProps) => {
  return (
    <input
      className={classConcatenator([
        { condition: true, class: styles.input },
        { condition: lastItem, class: styles.lastItem },
      ])}
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
    />
  );
};

export default Input;
