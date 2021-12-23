import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (date: string, year = "yyyy") => {
  return formatInTimeZone(date, "Europe/Stockholm", `${year}-MM-dd`);
};
