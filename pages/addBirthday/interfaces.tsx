export interface StateProps {
  email: string;
  firstName: string;
  lastName: string;
  birthday: null | string;
}

export interface ActionProps {
  type: any;
  payload: string;
}

export interface TargetProps {
  target: HTMLInputElement;
}
