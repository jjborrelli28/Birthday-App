import { matchSorter } from "match-sorter";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPage } from "../../../helpers/helpers";
import { BirthdayElement } from "../../../modules/home-management/interfaces";

type Data = {
  dobs: BirthdayElement[];
  page: number;
  pages: number;
  sortBy: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { param } = req.query;

  fetch(`${process.env.API_V1}/john/birthdays`)
    .then((response) => response.json())
    .then(({ birthdays }) => {
      // Search filter
      if (param && typeof param[0] === "string") {
        birthdays = matchSorter(birthdays, param[0], {
          keys: ["firstName", "lastName", "name"],
        });
      }

      // Sort
      const sortBy = req.body.sortBy ?? "recently-added";

      if (sortBy === "recently-added") {
        birthdays = [...birthdays].reverse();
      }

      // Pagination
      const page = +req.body.page ?? 10;

      const pages = Math.ceil(
        birthdays.length === 0 ? 1 : birthdays.length / 20
      );

      res.status(200).json({
        dobs: getPage(birthdays, page, 20),
        page,
        pages,
        sortBy,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
