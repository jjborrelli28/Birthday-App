import { ReactNode } from "react";

export interface ErrorProps {
  children: ReactNode;
}

export interface NumberProps {
  children: string | number;
}

export interface TitleProps {
  children: string;
}

export interface MessageProps {
    children: string;
  }
