import React from "react";
import Button from "../../components/button";
import Layout from "../../components/layout";
import styles from "./index.module.scss";
import DatePicker from "sassy-datepicker";
import format from "date-fns/format";

const index = () => {
  const onChange = (date: Date) => {
    console.log(`${format(date, "yyyy-MM-dd")}T00:00:00.000Z`);
  };

  return (
    <Layout
      title="Birthday App | Add Birthday"
      description="Page to add birthdays"
      hideHeader={true}
      hideFooter={true}
    >
      <div className={styles.container}>
        <form className={styles.form}>
          <div>
            <h2 className={styles.title}>Add a new birthday</h2>
            <div className={styles.inputsContainer}>
              <label className={styles.label}>First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                className={styles.input}
                minlength="3"
                maxlength="25"
                pattern="[A-Za-z ]*"
                required
              />
              <label className={styles.label}>Last name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                className={styles.input}
                minlength="3"
                maxlength="25"
                pattern="[A-Za-z ]*"
                required
              />
              <label className={styles.label}>E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                className={styles.input}
                pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
                required
              />
              <DatePicker onChange={onChange} required />
            </div>
          </div>
          <div className={styles.btnsContainer}>
            <Button variant="secondary" text="Cancel" />
            <input
              type="submit"
              id="submit"
              name="submit"
              value="Save"
              className={styles.submit}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default index;
