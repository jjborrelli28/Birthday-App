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

export type ActionProps = PersonalAction | BirthdayAction | MessageAction;

export type PersonalAction = {
  type: "email" | "firstName" | "lastName";
  payload: string;
};

export type BirthdayAction = {
  type: "birthday";
  payload: null | string;
};

export type MessageAction = {
  type: "message";
  payload: {
    show: boolean;
    variant: string;
    text: string;
  };
};
