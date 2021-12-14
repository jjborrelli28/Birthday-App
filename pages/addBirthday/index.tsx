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
import { initialState } from "./formReducer";
import { TargetProps } from "./interfaces";
import {
  onChangeEmail,
  onChangeFirstName,
  onChangeLastName,
  onChangeBirthday,
} from "./actions";

const index = () => {
  const router = useRouter();

  const [state, dispatch] = useReducer(formReducer, initialState);

  const { email, firstName, lastName, birthday } = state;

  console.log(state);
  const onChange = (date: Date) => {
    dispatch(onChangeBirthday(format(date, "yyyy-MM-dd")));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (birthday) {
    } else {
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
                dispatch(onChangeFirstName(target));
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
                dispatch(onChangeLastName(target));
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
                dispatch(onChangeEmail(target));
              }}
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
              required={true}
              lastItem={true}
            />
            <Label>Birthday date</Label>
            <div className={styles.calendarContainer}>
              <DatePicker onChange={onChange} name="birthday" required />
            </div>
            <Message
              variant="warning"
              text="All fields need to be completed before saving the changes"
            />
          </div>
          <div className={styles.btnsContainer}>
            <Button
              variant="secondary"
              text="Cancel"
              onClick={() => router.push("/")}
            />
            <Button
              variant="primary"
              text="Save"
              onClick={() => {
                console.log("click");
              }}
            />
          </div>
        </form>
      </Container>
    </Layout>
  );
};

export default index;
