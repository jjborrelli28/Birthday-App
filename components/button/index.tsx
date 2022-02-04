import React, { PropsWithChildren } from "react";
import { cc } from "../../helpers/helpers";
import styles from "./index.module.scss";
import ButtonProps from "./interfaces";

const Button = ({
  children,
  variant = "primary",
  type = "submit",
  onClick,
  onSubmit,
  long = false,
  shadow = false,
  disabled = false,
  footButton = false,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type={type}
      className={cc(
        styles.button,
        styles[variant],
        long && styles.long,
        shadow && styles.shadow,
        disabled && styles.disabled,
        footButton && styles.footButton
      )}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
