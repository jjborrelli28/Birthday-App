import React from "react";
import { cc } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import TitleProps from "./interfaces";

const Title = ({ children, level = 2 }: TitleProps) => {
  switch (level) {
    case 1:
      return <h1 className={cc(styles.title, styles.h1)}>{children}</h1>;
    case 2:
      return <h2 className={cc(styles.title, styles.h2)}>{children}</h2>;
    case 3:
      return <h3 className={cc(styles.title, styles.h3)}>{children}</h3>;
    case 4:
      return <h4 className={cc(styles.title, styles.h4)}>{children}</h4>;
    case 5:
      return <h5 className={cc(styles.title, styles.h5)}>{children}</h5>;
    case 6:
      return <h6 className={cc(styles.title, styles.h6)}>{children}</h6>;
    default:
      return <h2 className={cc(styles.title, styles.h2)}>{children}</h2>;
  }
};

export default Title;
