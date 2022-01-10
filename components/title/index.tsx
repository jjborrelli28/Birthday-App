import React from "react";
import { cc } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import TitleProps from "./interfaces";

const Title = ({ children, level = 2 }: TitleProps) => {
  const Comp: any = `h${level}`;

  return <Comp className={cc(styles.title, styles[Comp])}>{children}</Comp>;
};

export default Title;
