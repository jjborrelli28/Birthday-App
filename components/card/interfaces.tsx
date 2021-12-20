interface CardProps {
  children: React.ReactNode;
  variant?: string
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

export default CardProps;
