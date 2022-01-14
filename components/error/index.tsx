import React from "react";
import styles from "./index.module.scss";
import {
  ErrorProps,
  MessageProps,
  NumberProps,
  TitleProps,
} from "./interfaces";

export const Error = ({ children }: ErrorProps) => {
  return <div className={styles.error}>{children}</div>;
};

export const Number = ({ children }: NumberProps) => {
  return <h2 className={styles.number}>{children}</h2>;
};

export const Title = ({ children }: TitleProps) => {
  return <h3 className={styles.title}>{children}</h3>;
};

export const Message = ({ children }: MessageProps) => {
  return <p className={styles.message}>{children}</p>;
};

export default Error;

Error.Number = Number;
Error.Title = Title;
Error.Message = Message;
