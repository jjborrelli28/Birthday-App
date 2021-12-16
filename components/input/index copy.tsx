import React from "react";
import styles from "./index.module.scss";
import LabelProps from "./interfaces";

const Label = ({ children }: LabelProps) => {
  return <label className={styles.label}>{children}</label>;
};

export default Label;
