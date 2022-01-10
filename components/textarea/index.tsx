import React from "react";
import { TextareaProps } from "./interfaces";
import styles from "./index.module.scss";

export const Textarea = ({
  id,
  name,
  placeholder,
  minLength,
  maxLength,
  value,
  onChange,
  required,
}: TextareaProps) => {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        id={id}
        name={name}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        required={required}
      ></textarea>
      ;
    </div>
  );
};
