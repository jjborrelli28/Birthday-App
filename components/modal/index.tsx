import React from "react";
import { deleteBirthday } from "../../helpers/deteleBirthday";
import { cc } from "../../helpers/helpers";
import { useLoadState } from "../../hooks/useLoadState";
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
  const Comp: any = `h${level}`;

  return <Comp className={styles.header}>{children}</Comp>;
};

export const Body = ({ children }: ChildrenProps) => {
  return <div className={styles.body}>{children}</div>;
};

export const Footer = () => {
  const modal = useModalContext();

  const { setModal, payload } = modal;

  const { loadState, setLoadState } = useLoadState();

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
        onClick={(e: any) =>
          deleteBirthday({ e, payload, setLoadState, setModal, modal })
        }
        disabled={loadState}
      />
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
