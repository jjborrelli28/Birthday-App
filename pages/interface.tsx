interface BirthdaysProps {
  birthdays: BirthdayElement[];
}

export interface BirthdayElement {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
}

export default BirthdaysProps;
