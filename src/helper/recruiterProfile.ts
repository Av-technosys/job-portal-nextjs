import { CommonObjectType } from "@/types";

export function createDataForRecruiterProfile({
  valueObj,
}: // source,
{
  valueObj: CommonObjectType;
  // source?: string;
}) {
  // Field mapping: form field name => payload field name
  const payloadArr = {
    first_name: "first_name",
    company_about_us: "company_about_us",
    address_line_1: "address_line_1",
    address_line_2: "address_line_2",
    city: "city",
    state: "state",
    postal_code: "postal_code",
    country: "country",
    recruiter_profile_id: "recruiter_profile_id",
  };

  return Object.entries(payloadArr).reduce(
    (acc, [objKey, payloadKey]) => {
      if (valueObj?.[objKey] !== undefined && valueObj?.[objKey] !== null) {
        switch (objKey) {
          case "postal_code":
            acc[payloadKey] = Number(valueObj[objKey]);
            break;
          default:
            if (valueObj?.[objKey] !== "") {
              acc[payloadKey] = valueObj[objKey];
            }
        }
      }
      return acc;
    },
    {
      // Default values
      country: "India", // Default country set to India
    } as CommonObjectType
  );
}

export function createDataForRecruiterFoundingInfo({
  valueObj,
}: // source,
{
  valueObj: CommonObjectType;
  // source?: string;
}) {
  const payloadArr = {
    organization_type: "organization_type",
    industry_type: "industry_type",
    company_size: "company_size",
    company_website: "company_website",
    mission: "mission",
    vision: "vision",
    recruiter_founding_info_id: "recruiter_founding_info_id",
  };
  return Object.entries(payloadArr).reduce((acc, [objKey, payloadKey]) => {
    if (
      valueObj?.[objKey] !== undefined &&
      valueObj?.[objKey] !== null &&
      valueObj?.[objKey] !== ""
    ) {
      acc[payloadKey] = valueObj[objKey];
    }
    return acc;
  }, {} as CommonObjectType);
}

export function createDataForRecruiterSocialLinks({
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
