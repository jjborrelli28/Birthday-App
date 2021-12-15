export interface TargetProps {
  target: HTMLInputElement;
}

// formReducer
export interface ValuesProps {
  email: string;
  firstName: string;
  lastName: string;
  birthday: null | string;
}

export interface ActionValuesProps {
  type: string;
  payload: string;
}

// messageReducer
export interface MessageProps {
  show: boolean;
  variant: string;
  text: string;
}

export interface ActionMessageProps {
  show: boolean;
  type: string;
  variant: string;
  text: string;
}
