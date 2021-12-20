import React from "react";
import { classConcatenator } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import MessageProps from "./interfaces";

const Message = ({ variant = "warning", text }: MessageProps) => {
  return (
    <div className={styles.container}>
      <p
        className={classConcatenator([
          { condition: true, class: styles.message },
          { condition: true, class: styles[variant] },
        ])}
      >
        {text}
      </p>
    </div>
  );
};

export default Message;
