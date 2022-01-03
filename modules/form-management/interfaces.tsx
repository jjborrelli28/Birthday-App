import { DispatchWithoutAction } from "react";

export interface TargetProps {
  target: HTMLInputElement;
}

export type ValuesProps = {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
};

export type MessageProps = {
  show: boolean;
  variant: string;
  text: string;
};

export interface StateProps {
  values: ValuesProps;
  message: MessageProps;
}

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

export type ActionProps = PersonalAction | MessageAction;

export interface PostProps {
  e: any;
  values: ValuesProps;
  dispatch: any;
}
