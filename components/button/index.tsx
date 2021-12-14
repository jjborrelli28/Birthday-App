import React from "react";
import styles from "./index.module.scss";
import PropsBtn from "./interface";

const Button = ({ variant, text, onClick }: PropsBtn) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
