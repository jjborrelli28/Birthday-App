import React from "react";
import { classConcatenator } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import TextProps from "./interfaces";

const Text = ({ children, bold = false }: TextProps) => {
  return (
    <p
      className={classConcatenator([
        { condition: true, class: styles.text },
        { condition: bold, class: styles.textBold },
      ])}
    >
      {children}
    </p>
  );
};

export default Text;
