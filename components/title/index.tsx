import React, { PropsWithChildren } from "react";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import TitleProps from "./interfaces";

const Title = ({ children, level = 2 }: PropsWithChildren<TitleProps>) => {
  const Comp: any = `h${level}`;

  return <Comp className={cc(styles.title, styles[Comp])}>{children}</Comp>;
};

export default Title;
