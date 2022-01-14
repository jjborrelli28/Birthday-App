import React from "react";
import styles from "./index.module.scss";
import { FaSearch } from "react-icons/fa";
import { cc } from "../../helpers/helpers";
import { FormSearchProps } from "./interfaces";

export const FormSearch = ({
  onSubmit,
  onChange,
  value,
  variant,
}: FormSearchProps) => {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          type="text"
          id="search"
          name="search"
          className={styles.input}
          placeholder="Search by name, surname or email"
          onChange={onChange}
          value={value}
        />
        <button className={cc(styles.btn, styles[variant])} onSubmit={onSubmit}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};
