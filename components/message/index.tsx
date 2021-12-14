import React from "react";
import styles from "./index.module.scss";
import MessageProps from "./interface";

const Message = ({ variant, text }: MessageProps) => {
  return (
    <div className={styles.container}>
      <p className={`${styles.message} ${styles[variant]}`}>{text}</p>
    </div>
  );
};

export default Message;
