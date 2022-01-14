import React from "react";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import LabelProps from "./interfaces";

const Label = ({
  children,
  required = false,
  bold = false,
  mobileHidden = true,
}: LabelProps) => {
  return (
    <label
      className={cc(
        styles.label,
        bold && styles.bold,
        mobileHidden && styles.mobileHidden
      )}
    >
      {required && <span className={styles.required}>* </span>}
      {children}
    </label>
  );
};

export default Label;
