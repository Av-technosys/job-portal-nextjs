import { NOTICE_PERIOD_OPTIONS, SEARCH_STATUS_OPTIONS } from "@/constants";
import { CommonObjectType, dayjsInstance } from "@/types";
import {
  getDateFormatForPayload,
  getDayJsInstanceFromString,
} from "./dateUtil";

export function createDataForStudentProfilePersonalDetails({
  valueObj,
  source,
}: {
  valueObj: CommonObjectType;
  source?: string;
}) {
  // Form field name => Key
  // payload field name => Value
  // Key: Value
  const payloadArr = {
    first_name: "first_name",
    email: "email",
    phone_number: "phone_number",
    gender: "gender",
    address_line_1: "address_line_1",
    address_line_2: "address_line_2",
    city: "city",
    state: "state",
    postal_code: "postal_code",
    country: "country",
    date_of_birth: "date_of_birth",
    id: "id",
    student_profile_id: "student_profile_id",
  };

  return Object.entries(payloadArr)?.reduce?.(
    (acc, [objKey, payloadKey]) => {
      if (valueObj?.[objKey] !== undefined && valueObj?.[objKey] !== null) {
        switch (objKey) {
          case "email":
            // Pass Email as Read Only
            if (source === "apiData") {
              acc[payloadKey] = valueObj[objKey];
            }
            break;
          case "gender":
            if (source === "apiData") {
              acc[payloadKey] = valueObj[objKey]?.toString();
            } else {
              acc[payloadKey] = Number(valueObj[objKey]);
            }
            break;
          case "postal_code":
            acc[payloadKey] = Number(valueObj[objKey]);
            break;
          case "date_of_birth":
            if (source === "apiData") {
              acc[payloadKey] = getDayJsInstanceFromString(
                valueObj[objKey] as string
              );
            } else {
              acc[payloadKey] = getDateFormatForPayload(
                valueObj[objKey] as dayjsInstance
              );
            }
            break;
          default:
            if (valueObj[objKey] !== "") {
              acc[payloadKey] = valueObj[objKey];
            }
        }
      }
      return acc;
    },
    {
      country: "India",
    } as CommonObjectType
  );
}

export function createDataForStudentProfileGeneralDetails({
  valueObj,
  source,
}: {
  valueObj: CommonObjectType;
  source?: string;
}) {
  // Form field name => Key
  // payload field name => Value
  // Key: Value
  const payloadArr = {
    qualification_type: "qualification_type",
    institution_name: "institution_name",
    qualification_status: "qualification_status",
    score: "score",
    start_date: "start_date",
    end_date: "end_date",
    current_salary: "current_salary",
    expected_salary: "expected_salary",
    job_search_status: "job_search_status",
    notice_period: "notice_period",
    skill_sets: "skill_sets",
    aq_id: "aq_id",
    sy_id: "sy_id",
  };

  return Object.entries(payloadArr)?.reduce?.(
    (acc, [objKey, payloadKey]) => {
      if (valueObj?.[objKey] !== undefined && valueObj?.[objKey] !== null) {
        switch (objKey) {
          case "job_search_status":
          case "notice_period":
          case "qualification_status":
            if (source === "apiData") {
              acc[payloadKey] = valueObj[objKey]?.toString();
            } else {
              acc[payloadKey] = Number(valueObj[objKey]);
            }
            break;
          case "current_salary":
          case "expected_salary":
          case "score":
            acc[payloadKey] = Number(valueObj[objKey]);
            break;
          case "start_date":
          case "end_date":
            if (source === "apiData") {
              acc[payloadKey] = getDayJsInstanceFromString(
                valueObj[objKey] as string
              );
            } else {
              acc[payloadKey] = getDateFormatForPayload(
                valueObj[objKey] as dayjsInstance
              );
            }
            break;
          case "skill_sets":
            acc[payloadKey] = (valueObj[objKey] as CommonObjectType[])?.map?.(
              (item: CommonObjectType) => {
                return {
                  ...item,
                  proficiency_level:
                    source === "apiData"
                      ? item?.proficiency_level?.toString()
                      : Number(item?.proficiency_level),
                };
              }
            );
            break;
          default:
            acc[payloadKey] = valueObj[objKey];
        }
      } else {
        switch (objKey) {
          case "skill_sets":
            if (
              source === "apiData" &&
              ((valueObj[objKey] as CommonObjectType[])?.length === 0 ||
                !valueObj[objKey])
            ) {
              // Add Default 1 item for Skill Sets
              acc[payloadKey] = [
                {
                  skill_name: "",
                  proficiency_level: "",
                },
              ];
            }
            break;
        }
      }
      return acc;
    },
    {
      // Default Value When First Time
      job_search_status: SEARCH_STATUS_OPTIONS[0].value,
      notice_period: NOTICE_PERIOD_OPTIONS[0].value,
    } as CommonObjectType
  );
}

export function getDefaultWorkExperienceData() {
  return {
    start_date: undefined,
    end_date: undefined,
    organization_name: "",
    designation: "",
    experience: "",
    salary: "",
  };
}

export function getDefaultCertificationData() {
  return {
    start_date: undefined,
    end_date: undefined,
    certification_name: "",
    institution_name: "",
  };
}

export function getDefaultProjectsData() {
  return {
    start_date: undefined,
    end_date: undefined,
    project_name: "",
    project_organization_name: "",
  };
}

export function createDataForStudentProfileAdditionalInformationDetails({
  valueObj,
  source,
}: {
  valueObj: CommonObjectType;
  source?: string;
}) {
  const payloadArr = {
    work_experiences: "work_experiences",
    certifications: "certifications",
    projects: "projects",
  };

  function getInternalKeysFormattedData({
    valueArr,
    source,
  }: {
    valueArr: CommonObjectType[];
    source?: string;
  }) {
    return valueArr
      ?.map((item) => {
        return Object.entries(item)?.reduce?.(
          (acc, [innerObjKey, innerObjValue]) => {
            if (innerObjValue !== undefined && innerObjValue !== null) {
              switch (innerObjKey) {
                case "experience":
                case "salary":
                  if (source === "apiData") {
                    acc[innerObjKey] = Number(innerObjValue);
                  } else {
                    if (innerObjValue !== "") {
                      acc[innerObjKey] = innerObjValue;
                    }
                  }
                  break;
                case "start_date":
                case "end_date":
                  if (source === "apiData") {
                    acc[innerObjKey] = getDayJsInstanceFromString(
                      innerObjValue as string
                    );
                  } else {
                    acc[innerObjKey] = getDateFormatForPayload(
                      innerObjValue as dayjsInstance
                    );
                  }
                  break;
                default:
                  if (source === "apiData") {
                    acc[innerObjKey] = innerObjValue;
                  } else {
                    if (innerObjValue !== "") {
                      acc[innerObjKey] = innerObjValue;
                    }
                  }
              }
            }
            return acc;
          },
          {} as CommonObjectType
        );
      })
      .filter((item) => {
        return Object.keys(item).length > 0;
      });
  }

  return Object.entries(payloadArr)?.reduce?.((acc, [objKey, payloadKey]) => {
    if (
      valueObj?.[objKey] !== undefined &&
      valueObj?.[objKey] !== null &&
      (valueObj[objKey] as CommonObjectType[])?.length !== 0
    ) {
      switch (objKey) {
        case "work_experiences":
        case "certifications":
        case "projects":
          const internalKeysArray = getInternalKeysFormattedData({
            valueArr: valueObj?.[objKey] as CommonObjectType[],
            source,
          });
          if (internalKeysArray?.length > 0) {
            acc[payloadKey] = internalKeysArray;
          }
          break;
      }
    } else {
      if (
        source === "apiData" &&
        ((valueObj[objKey] as CommonObjectType[])?.length === 0 ||
          !valueObj[objKey])
      ) {
        // Add Default 1 item for Additional Information Sectiions
        switch (objKey) {
          case "work_experiences":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc[payloadKey] = [{ ...getDefaultWorkExperienceData() } as any];
            break;
          case "certifications":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc[payloadKey] = [{ ...getDefaultCertificationData() } as any];
            break;
          case "projects":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc[payloadKey] = [{ ...getDefaultProjectsData() } as any];
            break;
        }
      }
    }
    return acc;
  }, {} as CommonObjectType);
}

export function createDataForStudentProfileSocialLinks({
  valueObj,
  source,
}: {
  valueObj: CommonObjectType;
  source?: string;
}) {
  const payloadArr = {
    social_links: "social_links",
  };
  return Object.entries(payloadArr).reduce((acc, [objKey, payloadKey]) => {
    if (
      valueObj?.[objKey] !== undefined &&
      valueObj?.[objKey] !== null &&
      (valueObj[objKey] as CommonObjectType[])?.length !== 0
    ) {
      acc[payloadKey] = valueObj[objKey];
    } else {
      if (
        source === "apiData" &&
        ((valueObj[objKey] as CommonObjectType[])?.length === 0 ||
          !valueObj[objKey])
      ) {
        acc[payloadKey] = [{ platform: "facebook", url: "" }];
      }
    }
    return acc;
  }, {} as CommonObjectType);
}
