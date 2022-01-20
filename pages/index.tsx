import Image from "next/image";
import React from "react";
import Layout from "../components/layout";
import styles from "./index.module.scss";
import logo from "../assets/logo.png";
import Button from "../components/button";
import { useRouter } from "next/router";
import Container from "../components/container";
import Input from "../components/input";
import Label from "../components/label";
import Title from "../components/title";
import Text from "../components/text";
import Link from "next/link";

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = (e: any) => {
    e.preventDefault();

    localStorage.setItem("logged", "true");

    if (localStorage.getItem("t&cAccepted")) {
      router.push("/home");
    } else {
      router.push("/t&c");
    }
  };

  return (
    <Layout
      title="Birthday App | Sign in"
      description="Sign in page"
      auth={true}
    >
      <Container>
        <div className={styles.center}>
          <Image src={logo} alt="Logo" width={150} height={150} />
          <Title>Sign in to Birthday App</Title>
          <form className={styles.form} onSubmit={handleSignIn}>
            <Label mobileHidden={false}>Email address</Label>
            <Input
              type="text"
              id="email"
              name="email"
              placeholder=""
              pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
              required={true}
            />
            <Label mobileHidden={false}>Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder=""
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              required={true}
            />
            <Button
              variant="primary"
              long={true}
              text="Sign in"
              onSubmit={handleSignIn}
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
