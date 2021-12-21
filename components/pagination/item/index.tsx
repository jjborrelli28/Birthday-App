import Link from "next/link";
import React from "react";
import { classConcatenator } from "../../../helpers/classConcatenator";
import { ItemProps } from "../interfaces";
import styles from "./index.module.scss";

const Item = ({
  children,
  path,
  page,
  variant = "primary",
  disabled = false,
  select = false,
  hidden = false,
}: ItemProps) => {
  return disabled ? (
    <span
      className={classConcatenator([
        { condition: true, class: styles.item },
        { condition: true, class: styles[variant] },
        { condition: disabled, class: styles.disabled },
      ])}
      hidden={hidden}
    >
      {children}
    </span>
  ) : (
    <Link href={`${path}?page=${page}`}>
      <a
        className={classConcatenator([
          { condition: true, class: styles.item },
          { condition: true, class: styles[variant] },
          { condition: select, class: styles.select },
        ])}
        hidden={hidden}
      >
        {children}
      </a>
    </Link>
  );
};

export default Item;
