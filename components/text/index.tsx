import React from "react";
import styles from "./index.module.scss";
import TextProps from "./interfaces";

const Text = ({ children, bold }: TextProps) => {
  return (
    <p className={`${styles.text} ${bold && styles.textBold}`}>{children}</p>
  );
};

export default Text;
