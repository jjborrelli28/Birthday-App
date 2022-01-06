import React from "react";
import { cc } from "../../helpers/classConcatenator";
import { useModalContext } from "../../hooks/useModalContext";
import Button from "../button";
import styles from "./index.module.scss";
import { ChildrenProps, HeaderProps, ModalProps } from "./interface";

export const Modal = ({ children, show }: ModalProps) => {
  return (
    <div
      className={cc(
        styles.modal,
        show && styles.modalOpen,
        !show && styles.modalClose
      )}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export const Header = ({ children, level = 2 }: HeaderProps) => {
  switch (level) {
    case 1:
      return <h1 className={styles.header}>{children}</h1>;
    case 2:
      return <h2 className={styles.header}>{children}</h2>;
    case 3:
      return <h3 className={styles.header}>{children}</h3>;
    case 4:
      return <h4 className={styles.header}>{children}</h4>;
    case 5:
      return <h5 className={styles.header}>{children}</h5>;
    case 6:
      return <h6 className={styles.header}>{children}</h6>;
    default:
      return <h2 className={styles.header}>{children}</h2>;
  }
};

export const Body = ({ children }: ChildrenProps) => {
  return <div className={styles.body}>{children}</div>;
};

export const Footer = () => {
  const modal = useModalContext();

  const { setModal, payload } = modal;

  const deleteBirthday = (e: Event) => {
    e.preventDefault();

    fetch(
      `https://birthday-app-api.vercel.app/api/v1/john/birthdays/${payload.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => console.log("Success:", response))
      .catch((error) => console.error("Error:", error));

    setModal({
      ...modal,
      text: "The birthday was removed ✔",
      variant: "success",
    });
    setTimeout(() => {
      setModal({
        ...modal,
        active: false,
        isRefreshing: true,
      });
    }, 1500);
  };

  return (
    <div className={styles.footer}>
      <Button
        variant="secondary"
        type="button"
        text="Cancel"
        onClick={() =>
          setModal({
            ...modal,
            active: false,
          })
        }
      />
      <Button
        variant="danger"
        type="button"
        text="Delete"
        onClick={deleteBirthday}
      />
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
