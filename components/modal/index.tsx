import React, { MouseEventHandler, PropsWithChildren } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { deleteBirthday } from "../../helpers/deteleBirthday";
import { cc } from "../../helpers/helpers";
import { useLoadState } from "../../hooks/useLoadState";
import { useModalContext } from "../../hooks/useModalContext";
import Button from "../button";
import styles from "./index.module.scss";
import { BodyProps, HeaderProps, ModalProps } from "./interface";

export const Modal = ({ children, show }: PropsWithChildren<ModalProps>) => {
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

export const Header = ({
  children,
  level = 2,
}: PropsWithChildren<HeaderProps>) => {
  const Comp: any = `h${level}`;

  return <Comp className={styles.header}>{children}</Comp>;
};

export const Body = ({ children }: BodyProps) => {
  return <div className={styles.body}>{children}</div>;
};

export const Footer = () => {
  const modal = useModalContext();

  const { setModal, payload } = modal;

  const { loadState, setLoadState } = useLoadState();

  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    deleteBirthday({ e, payload, setLoadState, setModal, modal });
  };

  return (
    <div className={styles.footer}>
      <Button
        variant="secondary"
        type="button"
        text={<IoMdArrowRoundBack />}
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
        text={<AiFillDelete />}
        onClick={onClickHandler}
        disabled={loadState}
      />
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
