import React from "react";
import styles from "./index.module.scss";
import LabelProps from "./interface";

const Label = ({ children }: LabelProps) => {
  return (
    <label className={styles.label}>
      <span className={styles.required}>*</span> {children}
    </label>
  );
};

export default Label;
