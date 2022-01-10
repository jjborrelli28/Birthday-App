export type MessageProps = {
  show: boolean;
  variant: string;
  text: string;
};

export interface StateProps {
  value: string;
  message: MessageProps;
}

export type ValueProps = {
  type: "value";
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

export type ActionProps = ValueProps | MessageAction;
