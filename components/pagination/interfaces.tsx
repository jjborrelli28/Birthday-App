import { Dispatch } from "react";

export interface PaginationProps {
  path?: string;
  pages: number;
  page: number;
  variant?: string;
  dispatch?: Dispatch<Action>;
}

type Action = {
  type: string;
  payload: number | string | null;
};

export interface ItemProps {
  children: React.ReactChild;
  path: string;
  page: number;
  variant?: string;
  disabled?: boolean;
  select?: boolean;
  hidden?: boolean;
}
