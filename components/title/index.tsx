import React from "react";
import styles from "./index.module.scss";
import TitleProps from "./interface";

const Title = ({ children }: TitleProps) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default Title;
