import { NextRouter } from "next/router";
import {
  MessageProps,
  ValuesProps,
} from "../../modules/form-management/interfaces";

export interface FormProps {
  title: string;
  values: ValuesProps;
  message: MessageProps;
  handleSubmit: any;
  onChange: any;
  router: NextRouter;
}
