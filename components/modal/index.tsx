import React, { useReducer } from "react";
import { cc } from "../../helpers/helpers";
import { useModalContext } from "../../hooks/useModalContext";
import {
  initialLoadState,
  loadReducer,
} from "../../modules/load-management/loadReducer";
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
  const Comp: any = `h${level}`;

  return <Comp className={styles.header}>{children}</Comp>;
};

export const Body = ({ children }: ChildrenProps) => {
  return <div className={styles.body}>{children}</div>;
};

export const Footer = () => {
  const modal = useModalContext();

  const { setModal, payload } = modal;

  const [{ isLoading }, setLoad] = useReducer(loadReducer, initialLoadState);

  const deleteBirthday = (e: Event) => {
    e.preventDefault();

    setLoad({ type: "load", payload: true });

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
      .then(() =>
        setModal({
          ...modal,
          text: "The birthday was removed ✔",
          variant: "success",
        })
      )
      .catch((error) =>
        setModal({
          ...modal,
          text: `Error deleting birthdays. Error description: ${error}`,
          variant: "danger",
        })
      );

    setTimeout(() => {
      setModal({
        ...modal,
        active: false,
        isRefreshing: true,
      });
      setLoad({ type: "load", payload: false });
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
        disabled={isLoading}
      />
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
