import React, { PropsWithChildren } from "react";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import TextProps from "./interfaces";

const Text = ({ children, bold = false }: PropsWithChildren<TextProps>) => {
  return <p className={cc(styles.text, bold && styles.textBold)}>{children}</p>;
};

export default Text;
