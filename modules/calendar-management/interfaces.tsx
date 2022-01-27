export interface StateProps {
  select: boolean;
  date: string;
  user: {
    id: string;
    fullName: string;
  };
}

interface SelectProps {
  type: "select";
  payload: { id: string; fullName: string };
}

interface UnselectProps {
  type: "unselect";
  payload: { date: string };
}

export type ActionProps = SelectProps | UnselectProps;
