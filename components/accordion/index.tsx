import React from "react";
import styles from "./index.module.scss";
import { cc } from "../../helpers/classConcatenator";
import { IoIosArrowDropdown } from "react-icons/io";
import { AccordionProps, ItemProps } from "./interfaces";

export const Accordion = ({
  children,
  open,
  classification,
  onClick,
}: AccordionProps) => {
  return (
    <div className={styles.accordion}>
      <div className={cc(styles.header, open && styles.line)}>
        <h2 className={styles.title}> {`Sort by: ${classification}`}</h2>
        <button type="button" className={styles.btn} onClick={onClick}>
          <IoIosArrowDropdown
            className={cc(open && styles.invert, !open && styles.normal)}
          />
        </button>
      </div>
      <div className={cc(styles.body, open ? styles.open : styles.close)}>
        {children}
      </div>
    </div>
  );
};

export const Item = ({ children }: ItemProps) => {
  return <div className={styles.item}>{children}</div>;
};

Accordion.Item = Item;
