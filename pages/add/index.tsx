import React, { useReducer } from "react";
import Button from "../../components/button";
import Layout from "../../components/layout";
import styles from "./index.module.scss";
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
} from "../../modules/add-management/reducer";
import {
  changeValues,
  showMessage,
} from "../../modules/add-management/actions";
import { TargetProps } from "../../modules/add-management/interfaces";

const Add = () => {
  const [{ form, message }, dispatch] = useReducer(reducer, initialState);

  const { email, firstName, lastName, birthday } = form;

  const { show, variant, text } = message;

  const { today } = getDates();

  const router = useRouter();

  //Login simulation(momentary)
  if (typeof window !== "undefined") {
    const logged = localStorage.getItem("logged") ?? false;

    if (!logged) {
      router.push("/login");
    }
  }

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
      }, 1500);
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
            />
            <Label>Birthday date</Label>
            <Input
              type="date"
              id="birthday"
              name="birthday"
              value={birthday}
              onChange={({ target }: TargetProps) =>
                dispatch(changeValues(target))
              }
              max={today}
              required={true}
              lastItem={true}
            />
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

export default Add;
