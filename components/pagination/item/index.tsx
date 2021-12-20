import React from "react";
import { classConcatenator } from "../../../helpers/classConcatenator";
import { ItemProps } from "../interfaces";
import styles from "./index.module.scss";

const Item = ({
  children,
  name,
  onClick,
  variant = "primary",
  disabled = false,
  select = false,
  hidden = false,
}: ItemProps) => {
  return (
    <button
      type="button"
      name={name}
      onClick={onClick}
      className={classConcatenator([
        { condition: true, class: styles.item },
        { condition: true, class: styles[variant] },
        { condition: select, class: styles.select },
        { condition: disabled, class: styles.disabled },
      ])}
      disabled={disabled}
      hidden={hidden}
    >
      {children}
    </button>
  );
};

export default Item;
