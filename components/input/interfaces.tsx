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
  readOnly?: boolean;
}

export default InputProps;
