import React from "react";
import styles from "./index.module.scss";
import PropsBtn from "./interfaces";

const Button = ({ variant, text, onClick, onSubmit }: PropsBtn) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
