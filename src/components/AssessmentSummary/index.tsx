import { ASSESSMENT_SUMMARY, CheckCircleIcon, JA_LOGO } from "@/assets";
import { Button, Divider, NextImage, Stack, Typography } from "../common";
import { ASSESSMENT_SUMMARY_PAGE_CONFIG } from "@/constants/assessmentSummary";
import { colorStyles } from "@/styles";

function AssessmentSummary() {
  const {
    SUBMITTED_MESSAGE,
    SUMMERY_TEXT,
    ASSESSMENT,
    ASSESSMENT_TEXT,
    TIME_TAKEN,
    TIME,
    SUBMITTED_ON_TEXT,
    SUBMITTED_ON_TIME,
    SUBMITTED_TIME_TEXT,
    SUBMITTED_TIME,
    JOB_SEEKER_ID,
    JOB_SEEKER_ID_VALUE,
    FEEDBACK_TEXT,
    GIVE_FEEDBACK,
    SHOW_SCORE,
  } = ASSESSMENT_SUMMARY_PAGE_CONFIG;
  return (
    <>
      <Stack>
        <Stack
          stackProps={{
            className: "mb-4",
            direction: "row",
            justifyContent: "space-between",
          }}
        >
          <NextImage
            props={{
              alt: "ja_logo",
              src: JA_LOGO,
            }}
          />
        </Stack>
        <Divider />
        <Stack
          stackProps={{
            className: "p-2 mt-4 ml-8",
            gap: 2,
            direction: "row",
            alignItems: "center",
            sx: { bgcolor: colorStyles.filterTagsBackgroundColor },
          }}
        >
          <CheckCircleIcon sx={{ color: colorStyles.filterTagsTextColor }} />
          <Typography {...SUBMITTED_MESSAGE()} />
        </Stack>
        <Stack
          stackProps={{
            direction: "row",
          }}
        >
          <Stack>
            <NextImage
              props={{
                alt: "Assessment_summary_image",
                src: ASSESSMENT_SUMMARY,
              }}
            />
          </Stack>
          <Stack
            stackProps={{
              className: "border mt-4 h-fit rounded-lg shadow ",
            }}
          >
            <Stack
              stackProps={{
                className: "p-3",
              }}
            >
              <Typography {...SUMMERY_TEXT()} />
            </Stack>
            <Stack
              stackProps={{
                className: "p-3",
                gap: 1,
              }}
            >
              <Typography {...ASSESSMENT()} />
              <Typography {...ASSESSMENT_TEXT()} />
            </Stack>
            <Stack
              stackProps={{
                className: "p-3",
                gap: 1,
              }}
            >
              <Typography {...TIME_TAKEN()} />
              <Typography {...TIME()} />
            </Stack>
            <Stack
              stackProps={{
                className: "p-3",
                direction: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack
                stackProps={{
                  gap: 1,
                }}
              >
                <Typography {...SUBMITTED_ON_TEXT()} />
                <Typography {...SUBMITTED_ON_TIME()} />
              </Stack>
              <Stack
                stackProps={{
                  gap: 1,
                }}
              >
                <Typography {...SUBMITTED_TIME_TEXT()} />
                <Typography {...SUBMITTED_TIME()} />
              </Stack>
            </Stack>
            <Stack
              stackProps={{
                className: "p-3",
                gap: 1,
              }}
            >
              <Typography {...JOB_SEEKER_ID()} />
              <Typography {...JOB_SEEKER_ID_VALUE()} />
            </Stack>
            <Stack
              stackProps={{
                className: "p-4",
                gap: 1,
                sx: { bgcolor: colorStyles.savedJobsBackgroundColor },
              }}
            >
              <Typography {...FEEDBACK_TEXT()} />
              <Stack
                stackProps={{
                  direction: "row",
                  gap: 1,
                  justifyContent: "space-between",
                }}
              >
                <Button {...GIVE_FEEDBACK} />
                <Button {...SHOW_SCORE} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
export default AssessmentSummary;
