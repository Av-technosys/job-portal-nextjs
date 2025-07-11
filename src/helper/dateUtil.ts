import { dayjsInstance } from "@/types";
import dayjs from "dayjs";

export const PAYLOAD_DATE_FORMAT = "YYYY-MM-DD";

export const DATE_FORMAT = "DD/MM/YYYY";
export function getDayJsInstanceFromString(strDate: string = "") {
  return dayjs(strDate);
}

export function getDateFormatForPayload(dayJsInstance: dayjsInstance) {
  return dayJsInstance?.format(PAYLOAD_DATE_FORMAT);
}

export function formatDate(inputTime: string | Date) {
  return dayjs(inputTime).format(DATE_FORMAT);
}

export function formatTimeUserCentric(inputTime: string | Date) {
  const now = dayjs();
  const input = dayjs(inputTime);

  const diffInMinutes = now.diff(input, "minute");
  const diffInHours = now.diff(input, "hour");
  const diffInDays = now.diff(input, "day");

  if (diffInMinutes < 60) {
    return `${diffInMinutes} mins ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hrs ago`;
  } else if (diffInDays === 1) {
    return `1 day ago`;
  } else if (diffInDays <= 90) {
    return `${diffInDays} days ago`;
  } else {
    return `More than 90 days ago`;
  }
}
