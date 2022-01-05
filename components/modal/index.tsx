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
  const { setModal } = useContexts("modal");

  return (
    <div className={styles.footer}>
      <Button
        variant="secondary"
        type="button"
        text="Cancel"
        onClick={() => setModal({ active: false, text: "" })}
      />
      <Button
        variant="danger"
        type="button"
        text="Delete"
        onClick={() => console.log("click delete")}
      />
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
