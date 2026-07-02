import { CommonObjectType } from "@/types";
import {
  Avatar,
  Button,
  Chip,
  Stack,
  TextWithIcon,
  Typography,
  IconButton,
} from "../common";
import {
  CANDIDATE_APPLICATION_PAGE_CONFIG,
  getCandidateApplicationStatusLabel,
} from "@/constants";
import { getInitials } from "@/helper";

import {
  AccessTimeOutlinedIcon,
  BusinessCenterOutlinedIcon,
  FmdGoodOutlinedIcon,
  MoreVertIcon,
} from "@/assets";
import { useMemo } from "react";
import { colorStyles } from "@/styles";

function getStatusColor(status: number) {
  if (status === 5) {
    return "error";
  }

  if (status >= 7) {
    return "success";
  }

  if (status >= 4) {
    return "info";
  }

  if (status === 3) {
    return "primary";
  }

  if (status === 2) {
    return "warning";
  }

  return "default";
}

export default function CandidateApplicationCard({
  candidate,
  openApplicationPopup,
  handleIconButtonClick,
}: {
  candidate: CommonObjectType;
  openApplicationPopup: VoidFunction;
  handleIconButtonClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const { CANDIDATE_CARD } = CANDIDATE_APPLICATION_PAGE_CONFIG;
  const { IMAGE, NAME, JOB_TYPE, LOCATION, EXPERIENCE, BUTTON } =
    CANDIDATE_CARD;
  const applicationStatus = Number(candidate?.application_status || 0);
  const applicationStatusLabel = getCandidateApplicationStatusLabel(
    applicationStatus,
    String(candidate?.application_status_label || "Received")
  );

  const candidateDetails = useMemo(() => {
    return [
      {
        icon: (
          <BusinessCenterOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: JOB_TYPE(candidate),
      },
      {
        icon: (
          <AccessTimeOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: EXPERIENCE(candidate),
      },
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: LOCATION(candidate),
      },
    ];
  }, [EXPERIENCE, JOB_TYPE, LOCATION, , candidate]);

  return (
    <>
      <Stack
        stackProps={{
          className:
            " my-2  shadow-md p-4 rounded-xl border-2 hover:border-2 capitalize",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 3,
          sx: {
            borderColor: colorStyles.grey,
            "&:hover": {
              borderColor: colorStyles.cardHoverBorderColor,
            },
          },
        }}
      >
        <Stack>
          <Avatar {...IMAGE(candidate.user as CommonObjectType).avatarProps}>
            {getInitials({ name: String(candidate?.name || "") })}
          </Avatar>
        </Stack>
        <Stack
          stackProps={{
            width: "100%",
            direction: "column",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Typography {...NAME(candidate.user as CommonObjectType)} />
              <Chip
                label={applicationStatusLabel}
                color={getStatusColor(applicationStatus)}
                size="small"
                variant="outlined"
                sx={{ textTransform: "none" }}
              />
            </Stack>
            <IconButton onClick={handleIconButtonClick}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
          <Stack
            stackProps={{
              direction: "row",
              gap: 5,
              justifyContent: "space-between",
              width: "100%",
              alignContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",

                gap: 3,
              }}
            >
              {candidateDetails.map((detail, index) => (
                <TextWithIcon
                  key={`CandidateApplicationDetails-${index}`}
                  icon={detail.icon}
                  textProps={detail.textProps}
                />
              ))}
            </Stack>
            <Stack
              stackProps={{
                className: "-mt-14 md:-mt-7 ",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button {...BUTTON} onClick={openApplicationPopup} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
