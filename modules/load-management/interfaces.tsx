export interface StateProps {
  isLoading: boolean;
}

export type ActionProps = {
  type: "load";
  payload: boolean;
};
