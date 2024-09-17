import { months } from "../constants/constants";

export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date?.getUTCDate();
  const monthIndex = date?.getUTCMonth();
  const year = date?.getUTCFullYear();

  const month = months[monthIndex];

  return `${day} ${month}, ${year}`;
};
