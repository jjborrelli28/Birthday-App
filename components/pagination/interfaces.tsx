import { Dispatch } from "react";

export interface PaginationProps {
  pages: number;
  page: number;
  variant?: string;
  dispatch?: Dispatch<Action>;
  query?: string;
}

type Action = {
  type: string;
  payload: number | string | null;
};

export interface ItemProps {
  page: number;
  variant?: string;
  disabled?: boolean;
  select?: boolean;
  hidden?: boolean;
  query?: string;
}
