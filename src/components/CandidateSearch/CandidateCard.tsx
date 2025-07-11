import { CommonObjectType } from "@/types";
import {
  Avatar,
  Button,
  Stack,
  TextWithIcon,
  Typography,
  When,
} from "../common";
import { CANDIDATE_SEARCH_PAGE_CONFIG } from "@/constants";
import {
  BookmarkBorderIcon,
  FmdGoodOutlinedIcon,
  MoreVertIcon,
} from "@/assets";
import { getInitials } from "@/helper";
import { useMemo } from "react";
import { colorStyles } from "@/styles";
import {
  useCreateSavedJobseeker,
  useDeleteSavedJobseeker,
  useNotification,
} from "@/services";

export default function CandidateSearchCard({
  candidate,
}: {
  candidate: CommonObjectType;
}) {
  const { CANDIDATE_CARD } = CANDIDATE_SEARCH_PAGE_CONFIG;
  const {
    DESIGNATION,
    COMPANY_NAME,
    LOCATION,
    EXPERIENCE,
    IMAGE,
    JOB_TYPE,
    APPLY_BUTTON,
    NOTIFICATION_CONFIG,
  } = CANDIDATE_CARD;

  const { showNotification } = useNotification();
  const createCandidateMutate = useCreateSavedJobseeker();
  const deleteCandidateMutate = useDeleteSavedJobseeker();

  const onSaveClick = (studentId: number) => {
    if (studentId !== undefined) {
      createCandidateMutate.mutate(
        { student: studentId },
        {
          onSuccess: () => {
            showNotification(NOTIFICATION_CONFIG.SUCCESS);
          },
        }
      );
    }
  };

  const onUnSaveClick = (studentId: number) => {
    if (studentId !== undefined) {
      deleteCandidateMutate.mutate(String(studentId), {
        onSuccess: () => {
          showNotification(NOTIFICATION_CONFIG.DELETE_SUCCESS);
        },
      });
    }
  };

  const candidateDetails = useMemo(() => {
    return [
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: LOCATION(candidate) || { children: "N/A" },
      },
      {
        textProps: EXPERIENCE(candidate) || {
          children: "years of experience",
        },
      },
    ];
  }, [LOCATION, EXPERIENCE, candidate]);

  return (
    <>
      <Stack
        stackProps={{
          className: "my-2 border border-black p-4 capitalize",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            gap: 3,
          }}
        >
          <Stack>
            <Avatar {...IMAGE(candidate).avatarProps}>
              {getInitials({ name: String(candidate?.company_name || "") })}
            </Avatar>
          </Stack>
          <Stack
            stackProps={{
              direction: "column",
              gap: 1,
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                gap: 1,
              }}
            >
              <Typography {...DESIGNATION(candidate)} />
              <Stack
                stackProps={{
                  className: "rounded-lg p-1",
                  bgcolor: colorStyles.filterTagsBackgroundColor,
                  color: colorStyles.filterTagsTextColor,
                }}
              >
                <Typography {...JOB_TYPE(candidate)} />
              </Stack>
            </Stack>
            <Stack>
              <Typography {...COMPANY_NAME(candidate)} />
            </Stack>
            <Stack
              stackProps={{
                direction: "row",
                gap: 3,
              }}
            >
              {candidateDetails.map((detail, index) => (
                <TextWithIcon
                  key={`candidateDetails-${index}`}
                  icon={detail.icon}
                  textProps={detail.textProps}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Stack
          stackProps={{
            direction: "column",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography {...LOCATION(candidate)} />
        </Stack>

        <Stack
          stackProps={{
            direction: "row",
            gap: 3,
          }}
        >
          <When condition={candidate?.id !== undefined}>
            <BookmarkBorderIcon
              onClick={() => {
                if (candidate?.is_applied) {
                  onUnSaveClick(candidate?.user as number);
                } else {
                  onSaveClick(candidate?.user as number);
                }
              }}
              sx={{
                cursor: "pointer",
              }}
            />
          </When>
          <Button {...APPLY_BUTTON} />
          <MoreVertIcon />
        </Stack>
      </Stack>
    </>
  );
}
