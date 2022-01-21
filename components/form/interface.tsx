import { NextRouter } from "next/router";
import {
  AlertProps,
  ValuesProps,
} from "../../modules/form-management/interfaces";

export interface FormProps {
  title: string;
  values: ValuesProps;
  alert: AlertProps;
  onSubmit: any;
  onChange: any;
  router: NextRouter;
  disabled: boolean;
}
