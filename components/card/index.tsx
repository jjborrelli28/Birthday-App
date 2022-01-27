import React from "react";
import { cc } from "../../helpers/helpers";
import { useModalContext } from "../../hooks/useModalContext";
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
import { FaUserEdit } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { getDates } from "../../helpers/helpers";
import { HiOutlineMailOpen } from "react-icons/hi";
import Button from "../button";

const Card = ({ children, variant = "primary" }: CardProps) => {
  return <div className={cc(styles.card, styles[variant])}>{children}</div>;
};

const Data = ({ children }: DataProps) => {
  return <div className={styles.data}>{children}</div>;
};

export const Avatar = () => {
  return (
    <picture className={styles.avatar}>
      <Image src={avatar} alt="avatar" />
    </picture>
  );
};

export const Name = ({ name, surname }: NameProps) => {
  return (
    <p className={cc(styles.text, styles.textBold)}>
      {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
      {surname.charAt(0).toUpperCase() + surname.slice(1)}
    </p>
  );
};

export const Birthday = ({ children }: DateProps) => {
  return (
    <p className={styles.text}>
      <span className={styles.textBold}>Birthday: </span> {children}
    </p>
  );
};

export const DOB = ({ children }: DateProps) => {
  return (
    <p className={styles.text}>
      <span className={styles.textBold}>Date of birth: </span> {children}
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

export const Comands = ({ id, name, router, birthday }: ComandsProps) => {
  const modal = useModalContext();

  const { setModal } = modal;

  const { today } = getDates();

  return (
    <div className={styles.comands}>
      <Button
        type="button"
        variant="warning"
        text={<FaUserEdit />}
        onClick={() => router.push(`/edit?id=${id}`)}
      />
      <Button
        type="button"
        variant="danger"
        text={<FaUserSlash />}
        onClick={() =>
          setModal({
            ...modal,
            active: true,
            text: "Do you want to delete this birthday? ",
            payload: { id, name },
            setModal,
          })
        }
      />

      {birthday == today && (
        <Button
          type="button"
          variant="email"
          text={<HiOutlineMailOpen />}
          onClick={() => router.push(`/eCard?id=${id}`)}
        />
      )}
    </div>
  );
};
export default Card;

Card.Data = Data;
Card.Avatar = Avatar;
Card.Email = Email;
Card.Name = Name;
Card.Birthday = Birthday;
Card.DOB = DOB;
Card.Comands = Comands;
