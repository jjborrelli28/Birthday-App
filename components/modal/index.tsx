import React from "react";
import { cc } from "../../helpers/classConcatenator";
import { useContexts } from "../../hooks/useContexts";
import Button from "../button";
import styles from "./index.module.scss";
import { ChildrenProps, ModalProps } from "./interface";

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

export const Header = ({ children }: ChildrenProps) => {
  return <h2 className={styles.header}>{children}</h2>;
};

export const Body = ({ children }: ChildrenProps) => {
  return <div className={styles.body}>{children}</div>;
};

export const Footer = () => {
  const modal = useContexts("modal");

  const { setModal, payload } = modal;

  const deleteBirthday = (e: Event, id: string) => {
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
      location.reload();
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
