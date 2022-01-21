import { matchSorter } from "match-sorter";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getBirthdays,
  getDates,
  getPage,
  sortDates,
} from "../../../helpers/helpers";
import { BirthdayElement } from "../../../modules/home-management/interfaces";

type Data = {
  dobs: BirthdayElement[];
  page: number;
  pages: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { param } = req.query;

  fetch(`${process.env.NEXT_PUBLIC_BDA_API_V1}/john/birthdays`)
    .then((response) => response.json())
    .then(({ birthdays }) => {
      // Search filter
      if (param && typeof param[0] === "string") {
        birthdays = matchSorter(birthdays, param[0], {
          keys: ["firstName", "lastName", "name"],
        });
      }

      // Upcoming birthday filters
      const { today, nextWeek } = getDates();

      birthdays = sortDates(getBirthdays(birthdays)).filter(
        (birthdays: BirthdayElement) =>
          birthdays.birthday >= today && birthdays.birthday <= nextWeek
      );

      // Pagination
      const page = +req.body.page ?? 1;

      const pages = Math.ceil(
        birthdays.length === 0 ? 1 : birthdays.length / 20
      );

      res.status(200).json({
        dobs: getPage(birthdays, page, 20),
        page,
        pages,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}
