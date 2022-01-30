import { ReactNode } from "react";

export interface ModalProps {
  show: boolean;
}

export interface HeaderProps {
  level?: number;
}

export interface BodyProps {
  children: ReactNode;
}

export interface FooterProps {
  url: string;
}
