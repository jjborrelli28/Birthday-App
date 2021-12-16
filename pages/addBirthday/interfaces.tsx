export interface TargetProps {
  target: HTMLInputElement;
}

export interface StateProps {
  form: {
    email: string;
    firstName: string;
    lastName: string;
    birthday: null | string;
  };
  message: {
    show: boolean;
    variant: string;
    text: string;
  };
}

