export interface ModalContextProps {
  active: boolean;
  text: string;
  variant: string;
  payload: { id: string; name: string };
  setModal?: any;
}
