import Link from "next/link";
import React from "react";
import { cc } from "../../../helpers/classConcatenator";
import { ItemProps } from "../interfaces";
import styles from "./index.module.scss";

const Item = ({
  children,
  page,
  variant = "primary",
  disabled = false,
  select = false,
  hidden = false,
}: ItemProps) => {
  return disabled ? (
    <span
      className={cc(styles.item, styles[variant], disabled && styles.disabled)}
      hidden={hidden}
    >
      {children}
    </span>
  ) : (
    <Link href={`?page=${page}`}>
      <a
        className={cc(styles.item, styles[variant], select && styles.select)}
        hidden={hidden}
      >
        {children}
      </a>
    </Link>
  );
};

export default Item;
