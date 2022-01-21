import React from "react";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import AlertProps from "./interfaces";

const Alert = ({ variant = "warning", children }: AlertProps) => {
  return (
    <div className={styles.container}>
      <p className={cc(styles.alert, styles[variant])}>{children}</p>
    </div>
  );
};

export default Alert;
