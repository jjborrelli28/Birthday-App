import { format, add } from "date-fns";

export const getDates = () => {
  const today = format(new Date(), "yyyy/MM/dd");

  const nextWeek = format(add(new Date(), { days: 7 }), "yyyy/MM/dd");

  return { today, nextWeek };
};

