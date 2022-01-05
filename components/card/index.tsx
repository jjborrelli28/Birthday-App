import React from "react";
import { cc } from "../../helpers/classConcatenator";
import { useContexts } from "../../hooks/useContexts";
import styles from "./index.module.scss";
import CardProps, { DateProps, EmailProps, NameProps } from "./interfaces";

const Card = ({
  children,
  variant = "primary",
  id,
  name,
  router,
}: CardProps) => {
  const { setModal } = useContexts("modal");

  return (
    <div className={cc(styles.card, styles[variant])}>
      <div className={styles.dataContainer}>{children}</div>
      <div className={styles.btnContainer}>
        <button
          className={cc(styles.btn, styles.edit)}
          onClick={() => router.push(`/edit?id=${id}`)}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          className={cc(styles.btn, styles.delete)}
          onClick={() =>
            setModal({
              active: true,
              text: "Queres borrar?",
              payload: name,
              setModal,
            })
          }
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
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
