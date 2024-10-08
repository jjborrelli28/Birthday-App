import { NextRouter } from "next/router";

export interface CardProps {
  children: React.ReactNode;
  variant?: string;
  id?: string;
  birthday?: string;
  router?: NextRouter;
}

export interface PictureProps {
  firstName: string;
  lastName: string;
}

export interface DataProps {
  children: React.ReactNode;
}

export interface NameProps {
  name: string;
  surname: string;
}

export interface DateProps {
  children: string;
}

export interface EmailProps {
  children: string;
}

export interface ComandsProps {
  id: string;
  name: string;
  router: NextRouter;
  birthday?: string;
}

export default CardProps;
