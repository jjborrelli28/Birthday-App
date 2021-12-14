interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  required?: boolean;
  lastItem?: boolean;
}

export default InputProps;
