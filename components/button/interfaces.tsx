interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  variant?: string;
  text: string;
  onClick?: any;
  onSubmit?: any;
  long?: boolean;
  shadow?: boolean;
  disabled?: boolean;
}

export default ButtonProps;
