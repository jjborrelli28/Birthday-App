import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Container from "../../components/container";
import Input from "../../components/input";
import Label from "../../components/label";
import Layout from "../../components/layout";
import Line from "../../components/line";
import Title from "../../components/title";

const SignUp = () => {
  const router = useRouter();

  return (
    <Layout
      title="Birthday App | Login"
      description="Login page"
      auth={true}
      hideFooter={false}
    >
      <Container>
        <Title>Sign up for Birthday App </Title>
        <Line />
        <form>
          <Label required={true} bold={true}>
            First name
          </Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
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
            placeholder="Last name"
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
            // max={today}
            required={true}
          />
          <Label required={true} bold={true}>
            E-mail
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
            required={true}
          />
          <Label required={true} bold={true}>
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            required={true}
          />
          <Label required={true} bold={true}>
            Repeate password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Repeate password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            required={true}
          />
        </form>
      </Container>
    </Layout>
  );
};

export default SignUp;
