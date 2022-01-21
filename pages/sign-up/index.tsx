import { useRouter } from "next/router";
import React, { FormEvent, useReducer } from "react";
import Button from "../../components/button";
import Container from "../../components/container";
import Input from "../../components/input";
import Label from "../../components/label";
import Layout from "../../components/layout";
import Line from "../../components/line";
import Title from "../../components/title";
import { Tooltip } from "../../components/tooltip";
import reducer from "../../modules/form-management/reducer";
import styles from "./index.module.scss";
import { initialSignUpState } from "../../modules/form-management/reducer";
import { getDates } from "../../helpers/helpers";
import { changeValues } from "../../modules/form-management/actions";
import { TargetProps } from "../../modules/form-management/interfaces";
import Alert from "../../components/alert";
import { useLoadState } from "../../hooks/useLoadState";
import { createUser } from "../../helpers/createUser";

const SignUp = () => {
  const router = useRouter();

  const { today } = getDates();

  const [{ values, alert }, dispatch] = useReducer(reducer, initialSignUpState);

  const { loadState, setLoadState } = useLoadState();

  const { firstName, lastName, email, birthday, password1, password2 } = values;

  const { active, variant, message } = alert;

  return (
    <Layout
      title="Birthday App | Sign up"
      description="Sign up page"
      auth={true}
    >
      <Container>
        <Title>Sign up for Birthday App </Title>
        <Line />
        <form
          className={styles.form}
          onSubmit={(e: FormEvent) =>
            createUser({ e, values, setLoadState, dispatch, router })
          }
        >
          <div>
            <Label required={true} bold={true}>
              First name
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your first name"
              value={firstName}
              onChange={({ target }: TargetProps) =>
                dispatch(changeValues(target))
              }
              minLength={3}
              maxLength={25}
              pattern="[A-Za-z ]*"
              required={true}
            />
            <Label required={true} bold={true}>
              Last name
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name"
              value={lastName}
              onChange={({ target }: TargetProps) =>
                dispatch(changeValues(target))
              }
              minLength={3}
              maxLength={25}
              pattern="[A-Za-z ]*"
              required={true}
            />
            <Label required={true} bold={true}>
              Birthday date
            </Label>
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
            />
            <Label required={true} bold={true}>
              E-mail
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="your-email@example.com"
              value={email}
              onChange={({ target }: TargetProps) =>
                dispatch(changeValues(target))
              }
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
              required={true}
            />
            <Label required={true} bold={true}>
              Password
            </Label>
            <Tooltip text="Between 8 and 12 characters, an uppercase letter, a lowercase letter, a digit and a special character">
              <Input
                type="password"
                id="password1"
                name="password1"
                placeholder="Password"
                value={password1}
                onChange={({ target }: TargetProps) =>
                  dispatch(changeValues(target))
                }
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.;]).{8,12}$"
                required={true}
              />
            </Tooltip>
            <Label required={true} bold={true}>
              Repeate password
            </Label>
            <Tooltip text="Between 8 and 12 characters, an uppercase letter, a lowercase letter, a digit and a special character">
              <Input
                type="password"
                id="password2"
                name="password2"
                placeholder="Repeate password"
                value={password2}
                onChange={({ target }: TargetProps) =>
                  dispatch(changeValues(target))
                }
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.;]).{8,12}$"
                required={true}
              />
            </Tooltip>
            {active && <Alert variant={variant}>{message}</Alert>}
          </div>
          <div className={styles.buttons}>
            <Button
              type="button"
              variant="secondary"
              text="Cancel"
              onClick={() => router.push("/")}
            />
            <Button
              variant="primary"
              text="Create"
              onSubmit={createUser}
              disabled={loadState}
            />
          </div>
        </form>
      </Container>
    </Layout>
  );
};

export default SignUp;
