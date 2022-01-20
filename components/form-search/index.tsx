import React from "react";
import styles from "./index.module.scss";
import { FaSearch } from "react-icons/fa";
import { cc } from "../../helpers/helpers";
import { FormSearchProps } from "./interfaces";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Tooltip } from "../tooltip";

export const FormSearch = ({
  onSubmit,
  onChange,
  value,
  variant,
  reset,
}: FormSearchProps) => {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <Tooltip
          text="You can search
            by first name, last name or email"
        >
          <input
            type="text"
            id="search"
            name="search"
            className={styles.input}
            placeholder="Search"
            onChange={onChange}
            value={value}
          />
        </Tooltip>
        <button type="button" className={styles.reset} onClick={reset}>
          <RiDeleteBack2Fill />
        </button>
        <button className={cc(styles.btn, styles[variant])} onSubmit={onSubmit}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};
