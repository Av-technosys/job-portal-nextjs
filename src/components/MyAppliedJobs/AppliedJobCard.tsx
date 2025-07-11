import { CommonObjectType } from "@/types";
import {
  Avatar,
  Button,
  Divider,
  Stack,
  TextWithIcon,
  Typography,
  When,
} from "../common";
import { APPLIED_JOB_PAGE_CONFIG } from "@/constants";
import Messaging from "../Messaging";
import { getInitials } from "@/helper";
import { useMemo } from "react";
import { CurrencyRupeeIcon, FmdGoodOutlinedIcon } from "@/assets";
import { colorStyles } from "@/styles";

export default function AppliedJobCard({ job }: { job: CommonObjectType }) {
  const { APPLIED_JOB_CARD } = APPLIED_JOB_PAGE_CONFIG;
  const {
    DESIGNATION,
    IMAGE,
    LOCATION,
    SALARY_RANGE,
    JOB_TYPE,
    TIME_STAMP,
    VIEW_DETAILS_BUTTON,
  } = APPLIED_JOB_CARD;

  const appliedJobDetails = useMemo(() => {
    return [
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{
              color: colorStyles.listTitleTextColor,
              fontSize: "medium",
            }}
          />
        ),
        textProps: LOCATION(job) || { children: "N/A" },
      },
      {
        icon: (
          <CurrencyRupeeIcon
            sx={{
              color: colorStyles.listTitleTextColor,
              fontSize: "medium",
            }}
          />
        ),
        textProps: SALARY_RANGE(job) || { children: "N/A" },
      },
    ];
  }, [LOCATION, SALARY_RANGE, job]);

  return (
    <>
      <Stack
        stackProps={{
          className: "my-2 mb-2 p-2 border hover:border capitalize",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
          sx: {
            borderColor: colorStyles.cardBorderColor,
            "&:hover": {
              borderColor: colorStyles.filterTagsTextColor,
            },
          },
        }}
      >
        <Stack stackProps={{ direction: "row", gap: 2 }}>
          <Stack stackProps={{}}>
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({ name: String(job?.company_name || "") })}
            </Avatar>
          </Stack>
          <Stack
            stackProps={{
              direction: "column",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography {...DESIGNATION(job)} />
            <Stack
              stackProps={{
                direction: "row",
                gap: 1,
              }}
            >
              {appliedJobDetails.map((detail, index) => (
                <TextWithIcon
                  key={`appliedJobDetails-${index}`}
                  icon={detail.icon}
                  textProps={detail.textProps}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Typography {...JOB_TYPE(job)} />
        </Stack>
        <Stack>
          <Typography {...TIME_STAMP(job)} />
        </Stack>
        <Stack
          stackProps={{
            marginRight: 10,
          }}
        >
          <Button {...VIEW_DETAILS_BUTTON} />
        </Stack>
        {/* Only show messaging when job is posted by logged in user 28 */}
        <When condition={job?.user === 28}>
          <Messaging applicationId={job?.applicationId as number} />
        </When>
      </Stack>
      <Divider />
    </>
  );
}
