import React from "react";
import { cc } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import MessageProps from "./interfaces";

const Message = ({ variant = "warning", text }: MessageProps) => {
  return (
    <div className={styles.container}>
      <p className={cc(styles.message, styles[variant])}>{text}</p>
    </div>
  );
};

export default Message;
