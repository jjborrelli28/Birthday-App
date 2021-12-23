export interface TargetProps {
  target: HTMLInputElement;
}

export interface StateProps {
  form: {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
  };
  message: {
    show: boolean;
    variant: string;
    text: string;
  };
}

export type ActionProps = PersonalAction | MessageAction;

export type PersonalAction = {
  type: "email" | "firstName" | "lastName" | "birthday";
  payload: string;
};

export type MessageAction = {
  type: "message";
  payload: {
    show: boolean;
    variant: string;
    text: string;
  };
};
