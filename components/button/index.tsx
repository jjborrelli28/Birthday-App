import React from "react";
import { cc } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import ButtonProps from "./interfaces";

const Button = ({
  variant = "primary",
  type = "submit",
  text,
  onClick,
  onSubmit,
  long = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cc(styles.button, styles[variant], long && styles.long)}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
