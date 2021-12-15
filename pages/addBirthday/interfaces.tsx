export interface StateProps {
  email: string;
  firstName: string;
  lastName: string;
  birthday: null | string;
}

export interface ActionProps {
  type: string;
  payload: string;
}

export interface TargetProps {
  target: HTMLInputElement;
}
