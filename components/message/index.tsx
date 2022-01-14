import React from "react";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import MessageProps from "./interfaces";

const Message = ({ variant = "warning", children }: MessageProps) => {
  return (
    <div className={styles.container}>
      <p className={cc(styles.message, styles[variant])}>{children}</p>
    </div>
  );
};

export default Message;
