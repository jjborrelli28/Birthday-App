import React from "react";
import { classConcatenator } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import ButtonProps from "./interfaces";

const Button = ({
  variant = "primary",
  type = "submit",
  text,
  onClick,
  onSubmit,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classConcatenator([
        { condition: true, class: styles.button },
        { condition: true, class: styles[variant] },
      ])}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
