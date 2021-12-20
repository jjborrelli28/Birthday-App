import React from "react";
import Elipsis from "./elipsis";
import styles from "./index.module.scss";
import Item from "./item";
import { TargetProps } from "../../pages/add/interfaces";

const Pagination = ({ pages, page = 1, variant = "primary", dispatch }) => {
  const totalPages = Array(pages)
    .fill(null)
    .map((_, index) => index + 1);

  const lastPage = totalPages.length;

  const getFirstItem = () => {
    if (lastPage > 4) {
      if (page < 3) {
        return 1;
      } else {
        if (page > lastPage - 3) {
          return lastPage - 4;
        } else {
          return page - 2;
        }
      }
    } else {
      return 1;
    }
  };

  const getLastItem = () => {
    if (lastPage > 4) {
      if (page < 3) {
        return 4;
      } else {
        if (page > lastPage - 3) {
          return lastPage - 1;
        } else {
          return page + 1;
        }
      }
    } else {
      return lastPage - 1;
    }
  };

  return (
    <div className={styles.container}>
      <Item
        variant={variant}
        name="previous"
        onClick={({ target }: TargetProps) =>
          dispatch({ type: target.name, payload: 1 })
        }
        disabled={page === 1 && true}
      >
        ‹
      </Item>
      <Item
        variant={variant}
        name="select"
        onClick={({ target }: TargetProps) => {
          dispatch({ type: "select", payload: target.textContent });
        }}
        select={page === 1 ? true : false}
      >
        {totalPages[0]}
      </Item>
      {lastPage > 5 && page > 3 && <Elipsis />}

      {totalPages.slice(getFirstItem(), getLastItem()).map((item) => {
        return (
          <Item
            variant={variant}
            name="prev"
            onClick={({ target }: TargetProps) => {
              dispatch({ type: "select", payload: target.textContent });
            }}
            select={item === page ? true : false}
          >
            {item}
          </Item>
        );
      })}
      {lastPage > 5 && page < lastPage - 2 && <Elipsis />}
      <Item
        variant={variant}
        name="select"
        onClick={({ target }: TargetProps) => {
          dispatch({ type: "select", payload: target.textContent });
        }}
        select={page === lastPage ? true : false}
        hidden={lastPage === 1 && true}
      >
        {lastPage}
      </Item>
      <Item
        variant={variant}
        name="next"
        onClick={({ target }: TargetProps) =>
          dispatch({ type: target.name, payload: lastPage })
        }
        disabled={page === lastPage && true}
      >
        ›
      </Item>
    </div>
  );
};

export default Pagination;
