import { getDayName } from "@/functions/getDayName";
import { capitalizeFirstLetter } from "@/functions/capitalizeFirstLetter";

export function getFancyDayName(date: Date, locale?: string): string {
  const currentDate = new Date();
  const comparedDate = new Date(date);
  if (
    currentDate.getDate() === comparedDate.getDate() &&
    currentDate.getMonth() === comparedDate.getMonth() &&
    currentDate.getFullYear() === comparedDate.getFullYear()
  ) {
    return "Today";
  } else if (
    currentDate.getDate() + 1 === comparedDate.getDate() &&
    currentDate.getMonth() === comparedDate.getMonth() &&
    currentDate.getFullYear() === comparedDate.getFullYear()
  ) {
    return "Tomorrow";
  } else if (
    currentDate.getDate() - 1 === comparedDate.getDate() &&
    currentDate.getMonth() === comparedDate.getMonth() &&
    currentDate.getFullYear() === comparedDate.getFullYear()
  ) {
    return "Yesterday";
  } else {
    return capitalizeFirstLetter(getDayName(date, locale));
  }
}
