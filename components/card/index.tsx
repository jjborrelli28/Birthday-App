import React from "react";
import { classConcatenator } from "../../helpers/classConcatenator";
import styles from "./index.module.scss";
import CardProps, { DateProps, EmailProps, NameProps } from "./interfaces";

const Card = ({ children, variant = "primary" }: CardProps) => {
  return (
    <div
      className={classConcatenator([
        { condition: true, class: styles.card },
        { condition: true, class: styles[variant] },
      ])}
    >
      <div className={styles.dataContainer}>{children}</div>
    </div>
  );
};

export const Name = ({ name, surname }: NameProps) => {
  return (
    <h3 className={styles.title}>
      {name} {surname}
    </h3>
  );
};

export const Birthday = ({ children }: DateProps) => {
  return (
    <p className={styles.text}>
      <span className={styles.textBold}>Birthday date:</span> {children}
    </p>
  );
};

export const Email = ({ children }: EmailProps) => {
  return (
    <p className={styles.text}>
      <span className={styles.textBold}>Email:</span> {children}
    </p>
  );
};

export default Card;

Card.Email = Email;
Card.Name = Name;
Card.Birthday = Birthday;
