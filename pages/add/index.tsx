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
import { getDates } from "../../helpers/getDates";
import reducer, {
  initialState,
} from "../../modules/birthday-management/reducer";
import {
  changeBirthday,
  changeValues,
  showMessage,
} from "../../modules/birthday-management/actions";
import { TargetProps } from "../../modules/birthday-management/interfaces";

const index = () => {
  const router = useRouter();

  const [{ form, message }, dispatch] = useReducer(reducer, initialState);

  const { email, firstName, lastName, birthday } = form;

  const { show, variant, text } = message;

  const onChange = (date: Date) => {
    const { today } = getDates();
    const selectDate = format(date, "yyyy-MM-dd");

    if (selectDate <= today) {
      dispatch(changeBirthday(selectDate));
      dispatch(showMessage(false, "", ""));
    } else {
      dispatch(
        showMessage(
          true,
          "warning",
          "The selected date cannot be in the future"
        )
      );
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (firstName && lastName && email && birthday) {
      dispatch(
        showMessage(true, "success", "The birthday was saved successfully ✔")
      );
      fetch("https://birthday-app-api.vercel.app/api/v1/john/birthdays/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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
        dispatch(showMessage(false, "", ""));
      }, 1000);
    } else {
      dispatch(
        showMessage(
          true,
          "warning",
          "All fields need to be completed before saving the changes"
        )
      );
    }
  };

  return (
    <Layout
      title="Birthday App | Add Birthday"
      description="Page to add birthdays"
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
                dispatch(changeValues(target));
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
                dispatch(changeValues(target));
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
                dispatch(changeValues(target));
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
              type="button"
              variant="secondary"
              text="Cancel"
              onClick={() => router.push("/")}
            />
            <Button variant="primary" text="Save" onSubmit={handleSubmit} />
          </div>
        </form>
      </Container>
    </Layout>
  );
};

export default index;
