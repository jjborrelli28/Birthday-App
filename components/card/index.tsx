import React from "react";
import { cc } from "../../helpers/helpers";
import { useModalContext } from "../../hooks/useModalContext";
import styles from "./index.module.scss";
import CardProps, {
  ComandsProps,
  DateProps,
  EmailProps,
  NameProps,
  PictureProps,
} from "./interfaces";
import { DataProps } from "./interfaces";
import { FaUserEdit } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import { getDates } from "../../helpers/helpers";
import Button from "../button";
import Avatar from "react-avatar";
import { RiMailSendLine } from "react-icons/ri";

const Card = ({
  children,
  variant = "primary",
  birthday,
  router,
  id,
}: CardProps) => {
  const { today } = getDates();
  return (
    <div className={cc(styles.card)}>
      <div
        className={cc(
          styles.cardContainer,
          styles[variant],
          birthday === today && styles.cardWithFootButton
        )}
      >
        {children}
      </div>
      {birthday === today && (
        <Button
          type="button"
          variant="email"
          long={true}
          footButton={true}
          onClick={() => router?.push(`/eCard?id=${id}`)}
        >
          Send eCard&nbsp;
          <RiMailSendLine />
        </Button>
      )}
    </div>
  );
};

const Data = ({ children }: DataProps) => {
  return <div className={styles.data}>{children}</div>;
};

export const Picture = ({ firstName, lastName }: PictureProps) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className={styles.pictureContainer}>
      <picture className={styles.picture}>
        <Avatar name={fullName} size={"100%"} round={"0.6rem"} />
      </picture>
    </div>
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

export const Comands = ({ id, name, router }: ComandsProps) => {
  const modal = useModalContext();

  const { setModal } = modal;

  return (
    <div className={styles.comands}>
      <Button
        type="button"
        variant="warning"
        onClick={() => router.push(`/edit?id=${id}`)}
      >
        <FaUserEdit />
      </Button>
      <Button
        type="button"
        variant="danger"
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
        <FaUserSlash />
      </Button>
    </div>
  );
};
export default Card;

Card.Data = Data;
Card.Picture = Picture;
Card.Email = Email;
Card.Name = Name;
Card.Birthday = Birthday;
Card.DOB = DOB;
Card.Comands = Comands;
