interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: string;
  onClick?: any;
  onSubmit?: any;
  long?: boolean;
  shadow?: boolean;
  disabled?: boolean;
  footButton?: boolean;
}

export default ButtonProps;
