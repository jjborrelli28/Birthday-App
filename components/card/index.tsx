import React from "react";
import styles from "./index.module.scss";
import CardProps, { DateProps, EmailProps, NameProps } from "./interfaces";

const Card = ({ children }: CardProps) => {
  return (
    <div className={styles.card}>
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
