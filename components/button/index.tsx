import React from "react";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import ButtonProps from "./interfaces";

const Button = ({
  variant = "primary",
  type = "submit",
  text,
  onClick,
  onSubmit,
  long = false,
  shadow = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cc(
        styles.button,
        styles[variant],
        long && styles.long,
        shadow && styles.shadow
      )}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
