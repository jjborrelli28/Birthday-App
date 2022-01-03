import { Dispatch } from "react";
import {
  MessageProps,
  ValuesProps,
} from "../../modules/form-management/interfaces";

export interface FormProps {
  title: string;
  values: ValuesProps;
  message: MessageProps;
  handleSubmit: any;
  dispatch: Dispatch<any>;
  router: any;
}
