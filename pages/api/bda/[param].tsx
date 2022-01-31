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
  data: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { param } = req.query;
  const { method } = req.body ?? "GET";
  const { token } = req.body ?? "";
  const { body } = req.body ?? "";
  const { id } = req.body ?? "";
  const { upcomingBirthdays } = req.body ?? false;
  const { fullBirhdaysList } = req.body ?? false;

  fetch(`${process.env.NEXT_PUBLIC_BDA_API}/${param}${id ? `/${id}` : ``}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (upcomingBirthdays || fullBirhdaysList) {
        let { birthdays } = data;

        // Search filter
        const { search } = req.body ?? "";

        if (search) {
          birthdays = matchSorter(birthdays, search, {
            keys: ["firstName", "lastName", "name"],
          });
        }

        if (upcomingBirthdays) {
          const { today, nextWeek } = getDates();

          birthdays = sortDates(getBirthdays(birthdays)).filter(
            (birthdays: BirthdayElement) =>
              birthdays.birthday >= today && birthdays.birthday <= nextWeek
          );
        }

        const { sortBy } = req.body ?? "recently-added";

        if (fullBirhdaysList) {
          if (sortBy === "recently-added") {
            birthdays = [...birthdays].reverse();
          }
        }

        // Pagination
        const page = +req.body.page ?? 1;

        const pages = Math.ceil(
          birthdays.length === 0 ? 1 : birthdays.length / 20
        );

        data = {
          dobs: getPage(birthdays, page, 20),
          page,
          pages,
          sortBy,
        };
        res.json(data);
      } else {
        res.json(data);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}
