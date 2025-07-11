import { CommonObjectType, dayjsInstance } from "@/types";
import {
  getDateFormatForPayload,
  getDayJsInstanceFromString,
} from "./dateUtil";

export function createDataForJobPosting({
  valueObj,
}: {
  valueObj: CommonObjectType;
  source?: string;
}) {
  const payloadArr = {
    title: "title",
    role: "role",
    min_salary: "min_salary",
    max_salary: "max_salary",
    education: "education",
    experience: "experience",
    job_type: "job_type",
    city: "city",
    state: "state",
    country: "country",
    skills: "skills",
    description: "description",
    vacancies: "vacancies",
    job_level: "job_level",
    date_of_birth: "date_of_birth",
    time_duration: "expiration_days",
  };

  return Object.entries(payloadArr)?.reduce?.(
    (acc, [objKey, payloadKey]) => {
      if (valueObj?.[objKey] !== undefined) {
        switch (objKey) {
          case "time_duration":
            acc[payloadKey] = valueObj[objKey] === true ? 30 : 90;
            break;
          case "date_of_birth":
            acc[payloadKey] = getDateFormatForPayload(
              valueObj[objKey] as dayjsInstance
            );
            break;
          default:
            acc[payloadKey] = valueObj[objKey];
        }
      }
      return acc;
    },
    {
      title: "",
      role: "",
      min_salary: 0,
      max_salary: 0,
      education: "",
      experience: "",
      job_type: "",
      city: "",
      state: "",
      country: "",
      skills: [],
      description: "",
      vacancies: 0,
      job_level: "",
      date_of_birth: getDayJsInstanceFromString(""),
      time_duration: false,
    } as CommonObjectType
  );
}
