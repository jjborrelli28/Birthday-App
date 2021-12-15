import React from "react";
import styles from "./index.module.scss";
import MessageProps from "./interfaces";

const Message = ({ variant, text, hidden = true }: MessageProps) => {
  return (
    <div
      className={styles.container}
      style={{ display: `${hidden && "none"}` }}
    >
      <p className={`${styles.message} ${styles[variant]}`}>{text}</p>
    </div>
  );
};

export default Message;
