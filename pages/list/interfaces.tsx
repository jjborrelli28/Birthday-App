export interface DataProps {
  data: {
    dobs: BirthdayElement[];
    page: string;
    pages: number;
  };
}

export interface BirthdayElement {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
}
