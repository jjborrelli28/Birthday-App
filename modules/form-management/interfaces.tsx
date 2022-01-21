export interface TargetProps {
  target: HTMLInputElement;
}

export type ValuesProps = {
  email: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  fullName?: string;
  greeting?: string;
  password?: string;
  password2?: string;
};

export type AlertProps = {
  active: boolean;
  variant: string;
  message: string;
};

export interface StateProps {
  values: ValuesProps;
  alert: AlertProps;
}

export type PersonalAction = {
  type:
    | "email"
    | "firstName"
    | "lastName"
    | "birthday"
    | "fullName"
    | "greeting"
    | "password"
    | "password2";
  payload: string;
};

export type AlertAction = {
  type: "alert";
  payload: {
    active: boolean;
    variant: string;
    message: string;
  };
};

export type ActionProps = PersonalAction | AlertAction;
