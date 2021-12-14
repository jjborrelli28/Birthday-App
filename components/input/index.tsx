import React from "react";
import styles from "./index.module.scss";
import InputProps from "./interface";

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
  lastItem,
}: InputProps) => {
  return (
    <input
      className={`${styles.input} ${lastItem && styles.lastItem}`}
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
