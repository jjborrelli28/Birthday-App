export interface ModalProps {
  children: React.ReactNode;
  show: boolean;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  children: string;
  level?: number;
}
