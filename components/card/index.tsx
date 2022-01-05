import React from "react";
import { cc } from "../../helpers/classConcatenator";
import { useContexts } from "../../hooks/useContexts";
import styles from "./index.module.scss";
import CardProps, {
  ComandsProps,
  DateProps,
  EmailProps,
  NameProps,
} from "./interfaces";
import avatar from "../../assets/avatar.png";
import Image from "next/image";
import { DataProps } from "./interfaces";

const Card = ({ children, variant = "primary" }: CardProps) => {
  return <div className={cc(styles.card, styles[variant])}>{children}</div>;
};

const Data = ({ children }: DataProps) => {
  return <div className={styles.data}>{children}</div>;
};

export const Avatar = () => {
  return (
    <picture className={styles.avatar}>
      <Image src={avatar} />
    </picture>
  );
};

export const Name = ({ name, surname }: NameProps) => {
  return (
    <h3 className={styles.title}>
      {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
      {surname.charAt(0).toUpperCase() + surname.slice(1)}
    </h3>
  );
};

export const Birthday = ({ children }: DateProps) => {
  return (
    <p className={styles.text}>
      <span className={styles.textBold}>Birthday: </span> {children}
    </p>
  );
};

export const Email = ({ children }: EmailProps) => {
  return (
    <p className={styles.text}>
      <span className={styles.textBold}>E-mail: </span>
      {children}
    </p>
  );
};

export const Comands = ({ id, name, router }: ComandsProps) => {
  const modal = useContexts("modal");

  const { setModal } = modal;

  return (
    <div className={styles.comands}>
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
            ...modal,
            active: true,
            text: "Do you want to delete this birthday? ",
            payload: { id, name },
            setModal,
          })
        }
      >
        <i className="fas fa-trash-alt"></i>
      </button>
    </div>
  );
};
export default Card;

Card.Data = Data;
Card.Avatar = Avatar;
Card.Email = Email;
Card.Name = Name;
Card.Birthday = Birthday;
Card.Comands = Comands;
