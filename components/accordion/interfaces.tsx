import { ReactNode } from "react";

export interface AccordionProps {
  children: ReactNode;
  open: boolean;
  classification?: string;
  onClick: any;
}

export interface ItemProps {
  children: ReactNode;
}
