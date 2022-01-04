import styles from "./index.module.scss";
import Button from "../button";
import Container from "../container";
import Input from "../input";
import Label from "../label";
import Line from "../line";
import Title from "../title";
import Message from "../message";
import { FormProps } from "./interface";
import { getDates } from "../../helpers/getDates";

const { today } = getDates();

export const Form: React.FC<FormProps> = ({
  title,
  values,
  message,
  handleSubmit,
  onChange,
  router,
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Line />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <Label>First name</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={values.firstName}
            onChange={onChange}
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
            value={values.lastName}
            onChange={onChange}
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
            value={values.email}
            onChange={onChange}
            pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
            required={true}
          />
          <Label>Birthday date</Label>
          <Input
            type="date"
            id="birthday"
            name="birthday"
            value={values.birthday}
            onChange={onChange}
            max={today}
            required={true}
          />
          {message.show && (
            <Message variant={message.variant} text={message.text} />
          )}
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
  );
};
