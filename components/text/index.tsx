import React from "react";
import { cc } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import TextProps from "./interfaces";

const Text = ({ children, bold = false }: TextProps) => {
  return <p className={cc(styles.text, bold && styles.textBold)}>{children}</p>;
};

export default Text;
