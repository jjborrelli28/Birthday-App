interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  variant?: string;
  text: string;
  onClick?: any;
  onSubmit?: any;
}

export default ButtonProps;
