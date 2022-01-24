import Image from "next/image";
import React, { FormEvent, useReducer, useState } from "react";
import Layout from "../components/layout";
import styles from "./index.module.scss";
import logo from "../assets/logo.png";
import Button from "../components/button";
import Container from "../components/container";
import Input from "../components/input";
import Label from "../components/label";
import Title from "../components/title";
import Text from "../components/text";
import Link from "next/link";
import { login } from "../helpers/login";
import reducer, {
  initialSignInState,
} from "../modules/form-management/reducer";
import Alert from "../components/alert";
import { useRouter } from "next/router";
import { useLoadState } from "../hooks/useLoadState";
import { changeValues } from "../modules/form-management/actions";
import { TargetProps } from "../modules/form-management/interfaces";
import { useAuthContext } from "../hooks/useAuthContext";

const SignIn = () => {
  const { auth, setAuth } = useAuthContext();

  const router = useRouter();

  if (auth) {
    router.push("/home");
  }

  const [{ values, alert }, dispatch] = useReducer(reducer, initialSignInState);

  const { loadState, setLoadState } = useLoadState();

  const { email, password } = values;

  const { active, variant, message } = alert;

  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  return (
    <Layout
      title="Birthday App | Sign in"
      description="Sign in page"
      auth={!auth}
    >
      <Container>
        <div className={styles.center}>
          <Image src={logo} alt="Logo" width={150} height={150} />
          <Title>Sign in to Birthday App</Title>
          <form
            className={styles.form}
            onSubmit={(e: FormEvent) =>
              login({
                e,
                values,
                setLoadState,
                dispatch,
                router,
                stayLoggedIn,
                setAuth,
              })
            }
          >
            <Label mobileHidden={false}>Email address</Label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder=""
              value={email}
              onChange={({ target }: TargetProps) =>
                dispatch(changeValues(target))
              }
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
              required={true}
            />
            <Label mobileHidden={false}>Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={password}
              onChange={({ target }: TargetProps) =>
                dispatch(changeValues(target))
              }
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.;]).{8,12}$"
              required={true}
            />
            <Label>
              <input
                type="checkbox"
                defaultChecked={stayLoggedIn}
                onChange={() => setStayLoggedIn(!stayLoggedIn)}
              />{" "}
              Stay logged In
            </Label>
            {active && <Alert variant={variant}>{message}</Alert>}
            <Button
              variant="primary"
              long={true}
              text="Sign in"
              onSubmit={(e: FormEvent) =>
                login({
                  e,
                  values,
                  setLoadState,
                  dispatch,
                  router,
                  stayLoggedIn,
                  setAuth,
                })
              }
              disabled={loadState}
            />
          </form>
          <div className={styles.signup}>
            <Text>
              New to Birthday App?{" "}
              <Link href={"/sign-up"}>
                <a>Create an account.</a>
              </Link>
            </Text>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default SignIn;
