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

const APPLICATION_STATUS_STYLES: Record<
  number,
  { backgroundColor: string; color: string }
> = {
  0: { backgroundColor: "#F1F2F4", color: "#474C54" },
  1: { backgroundColor: "#E6F2FF", color: "#007AFF" },
  2: { backgroundColor: "#FFF4E1", color: "#9A5B00" },
  3: { backgroundColor: "#E8F4FF", color: "#0A65CC" },
  4: { backgroundColor: "#EEF2FF", color: "#4F46E5" },
  5: { backgroundColor: "#FDECEC", color: "#DC2626" },
  6: { backgroundColor: "#FFF7ED", color: "#C2410C" },
  7: { backgroundColor: "#E6FAE6", color: "#0BA02C" },
  8: { backgroundColor: "#ECFDF5", color: "#047857" },
};

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
  const applicationStatus = Number(candidate?.application_status ?? 0);
  const applicationStatusLabel = getCandidateApplicationStatusLabel(
    applicationStatus,
    String(candidate?.application_status_label || "Received")
  );
  const applicationStatusStyle =
    APPLICATION_STATUS_STYLES[applicationStatus] ||
    APPLICATION_STATUS_STYLES[0];

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
  }, [EXPERIENCE, JOB_TYPE, LOCATION, candidate]);

  return (
    <>
      <Stack
        stackProps={{
          className:
            " my-2 shadow-md p-4 rounded-xl border-2 hover:border-2 capitalize",
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: 2, md: 3 },
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
            <Typography {...NAME(candidate.user as CommonObjectType)} />
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Chip
                label={applicationStatusLabel}
                size="small"
                sx={{
                  backgroundColor: applicationStatusStyle.backgroundColor,
                  color: applicationStatusStyle.color,
                  fontWeight: 600,
                  fontSize: "13px",
                  height: 28,
                  borderRadius: "6px",
                  px: 0.5,
                }}
              />
              <IconButton onClick={handleIconButtonClick}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Stack
            stackProps={{
              direction: { xs: "column", sm: "row" },
              gap: { xs: 1.5, sm: 5 },
              justifyContent: "space-between",
              width: "100%",
              alignItems: { xs: "flex-start", sm: "center" },
              flexWrap: "wrap",
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                flexWrap: "wrap",
                gap: { xs: 1.5, md: 3 },
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
                justifyContent: "center",
                alignItems: { xs: "flex-start", sm: "center" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <Button {...BUTTON} buttonProps={{ ...BUTTON.buttonProps, fullWidth: true, sx: { height: 40 } }} onClick={openApplicationPopup} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
