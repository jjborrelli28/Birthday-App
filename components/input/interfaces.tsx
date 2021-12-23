interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: any;
  minLength?: number;
  maxLength?: number;
  max?: string;
  pattern?: string;
  required?: boolean;
}

export default InputProps;
