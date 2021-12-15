import React, { useReducer } from "react";
import Button from "../../components/button";
import Layout from "../../components/layout";
import styles from "./index.module.scss";
import DatePicker from "sassy-datepicker";
import format from "date-fns/format";
import { useRouter } from "next/router";
import Message from "../../components/message";
import Title from "../../components/title";
import Label from "../../components/label";
import Input from "../../components/input";
import Container from "../../components/container";
import Line from "../../components/line";
import formReducer from "./formReducer";
import { initialValues } from "./formReducer";
import { TargetProps } from "./interfaces";
import { getDates } from "../../helpers/getDates";
import messageReducer, { initialMessage } from "./messageReducer";
import {
  removeMessage,
  showFieldsMessage,
  showSuccessMessage,
} from "./actions";
import {
  changeEmail,
  changeFirstName,
  changeLastName,
  changeBirthday,
  showDateMessage,
} from "./actions";

const index = () => {
  const router = useRouter();

  // Control form
  const [values, dispatchFR] = useReducer(formReducer, initialValues);

  const { email, firstName, lastName, birthday } = values;

  // Control message
  const [{ show, variant, text }, dispatchMR] = useReducer(
    messageReducer,
    initialMessage
  );

  console.log(values);
  const onChange = (date: Date) => {
    console.log(date);
    const { today } = getDates();
    const selectDate = format(date, "yyyy-MM-dd");

    if (selectDate <= today) {
      dispatchFR(changeBirthday(selectDate));
      dispatchMR(removeMessage());
    } else {
      dispatchMR(showDateMessage());
    }
  };

  if (firstName == "[A-Za-z ]*") {
    console.log("cumple");
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (firstName && lastName && email && birthday) {
      dispatchMR(showSuccessMessage());
      fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((response) => console.log("Success:", response))
        .catch((error) => console.error("Error:", error));

      setTimeout(() => {
        router.push("/");
        dispatchMR(removeMessage());
      }, 1000);
    } else {
      console.log("paso");
      dispatchMR(showFieldsMessage());
    }
  };

  return (
    <Layout
      title="Birthday App | Add Birthday"
      description="Page to add birthdays"
      hideHeader={true}
      hideFooter={true}
    >
      <Container>
        <Title>Add a new birthday</Title>
        <Line />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <Label>First name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={firstName}
              onChange={({ target }: TargetProps) => {
                dispatchFR(changeFirstName(target));
              }}
              minLength={3}
              maxLength={25}
              pattern="[A-Za-z ]*"
              required={true}
            />
            <Label>Last name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={({ target }: TargetProps) => {
                dispatchFR(changeLastName(target));
              }}
              minLength={3}
              maxLength={25}
              pattern="[A-Za-z ]*"
              required={true}
            />
            <Label>E-mail</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={email}
              onChange={({ target }: TargetProps) => {
                dispatchFR(changeEmail(target));
              }}
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
              required={true}
              lastItem={true}
            />
            <Label>Birthday date</Label>
            <div className={styles.calendarContainer}>
              <DatePicker onChange={onChange} name="birthday" required />
            </div>
            {show && <Message variant={variant} text={text} />}
          </div>
          <div className={styles.btnsContainer}>
            <Button
              variant="primary"
              text="Save"
              onSubmit={handleSubmit}
              order={1}
            />
            <Button
              variant="secondary"
              text="Cancel"
              onClick={() => router.push("/")}
            />
          </div>
        </form>
      </Container>
    </Layout>
  );
};

export default index;
