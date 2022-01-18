import React from "react";
import { TooltipProps } from "./interfaces";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import { MdInfoOutline } from "react-icons/md";

export const Tooltip = ({ children }: TooltipProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <div className={styles.label}>
          <p>
            <MdInfoOutline style={{ verticalAlign: "middle" }} /> You can search
            by first name, last name or email
          </p>
        </div>
        <div className={cc(styles.arrow, styles.down)}></div>
      </div>
      {children}
    </div>
  );
};
