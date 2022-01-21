import React, { PropsWithChildren } from "react";
import { TooltipProps } from "./interfaces";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import { MdInfoOutline } from "react-icons/md";

export const Tooltip = ({ children, text }: PropsWithChildren<TooltipProps>) => {
  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <div className={styles.label}>
          <p>
            <MdInfoOutline style={{ verticalAlign: "middle" }} /> {text}
          </p>
        </div>
        <div className={cc(styles.arrow, styles.down)}></div>
      </div>
      {children}
    </div>
  );
};
