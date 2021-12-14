import React from "react";
import styles from "./index.module.scss";
import ContainerProps from "./interfaces";

const Container = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
