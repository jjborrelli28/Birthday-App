import React from "react";
import {
  getFirstItem,
  getLastItem,
  showFirstElipsis,
  showLastElipsis,
} from "../../modules/pagination-management/helpers";
import styles from "./index.module.scss";
import { PaginationProps } from "./interfaces";
import Item from "./item";

const Pagination = ({
  page,
  pages,
  variant = "primary",
  query,
}: PaginationProps) => {
  const totalPages = Array(pages)
    .fill(null)
    .map((_, index) => index + 1);

  const lastPage = totalPages.length;

  return (
    <div className={styles.container}>
      <Item
        page={page - 1}
        variant={variant}
        disabled={page === 1}
        query={query}
      >
        ‹
      </Item>
      <Item page={1} variant={variant} select={page === 1} query={query}>
        {totalPages[0]}
      </Item>

      {showFirstElipsis(page, lastPage)}

      {totalPages
        .slice(getFirstItem(page, lastPage), getLastItem(page, lastPage))
        .map((item) => {
          return (
            <Item
              page={item}
              variant={variant}
              select={item === page}
              key={item}
              query={query}
            >
              {item}
            </Item>
          );
        })}

      {showLastElipsis(page, lastPage)}

      <Item
        page={lastPage}
        variant={variant}
        select={page === lastPage}
        hidden={lastPage === 1}
        query={query}
      >
        {lastPage}
      </Item>
      <Item
        page={page + 1}
        variant={variant}
        disabled={page === lastPage}
        query={query}
      >
        ›
      </Item>
    </div>
  );
};

export default Pagination;
