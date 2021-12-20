export interface PaginationProps {

}

export interface ItemProps {
  children: React.ReactChild;
  name: string;
  onClick: any;
  variant?: string;
  disabled?: boolean;
  select?: boolean;
  hidden?: boolean;
}