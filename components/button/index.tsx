import React from "react";
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
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
