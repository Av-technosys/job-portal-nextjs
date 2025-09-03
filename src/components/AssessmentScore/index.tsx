import { CheckCircleIcon, JA_LOGO } from "@/assets";
import {
  Button,
  Divider,
  NextImage,
  Stack,
  TextWithIcon,
  Typography,
} from "../common";
import { ASSESSMENT_SCORE_PAGE_CONFIG } from "@/constants";
import { colorStyles } from "@/styles";
import { useMemo } from "react";

function AssessmentScore() {
  const {
    SCORE_TEXT,
    SCORE_VALUE_1,
    SCORE_VALUE_2,
    CONGRATS_TEXT,
    RETAKE_TEST,
    CONTINUE_BUTTON,
    ASSESSMENT_SPREAD_TEXT,
    SUMMERY,
    SCORE_VALUE_3,
  } = ASSESSMENT_SCORE_PAGE_CONFIG;

  const section = useMemo(() => {
    return {
      summery: "summery",
      value: "76/100",
    };
  }, []);

  const scoreListDetails = useMemo(() => {
    return [
      {
        icon: (
          <CheckCircleIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        textProps: SUMMERY(section),
      },
      {
        icon: (
          <CheckCircleIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        textProps: SUMMERY(section),
      },
      {
        icon: (
          <CheckCircleIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        textProps: SUMMERY(section),
      },
      {
        icon: (
          <CheckCircleIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        textProps: SUMMERY(section),
      },
      {
        icon: (
          <CheckCircleIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        textProps: SUMMERY(section),
      },
    ];
  }, [SUMMERY, section]);
  return (
    <>
      <Stack>
        <NextImage
          props={{
            alt: "ja_logo",
            src: JA_LOGO,
          }}
        />
        <Divider />
        <Stack
          stackProps={{
            direction: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            stackProps={{
              width: "45%",
              gap: 2,
              className: " mt-5",
              direction: "column",
            }}
          >
            <Typography {...SCORE_TEXT()} />
            <Stack
              stackProps={{
                gap: 1,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Stack
                stackProps={{
                  justifyContent: "center",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                <Stack
                  stackProps={{
                    className: "rounded-full mx-auto",
                    height: 200,
                    width: 200,
                    justifyContent: "center",
                    textAlign: "center",
                    sx: {
                      background: `linear-gradient(to top, ${colorStyles.scoreGradientlightBlue}, ${colorStyles.scoreGradientDarkBlue})`,
                      color: colorStyles.white,
                    },
                  }}
                >
                  <Typography {...SCORE_VALUE_1()} />
                  <Typography {...SCORE_VALUE_2()} />
                </Stack>
              </Stack>
              <Stack
                stackProps={{
                  justifyContent: "center",
                  textAlign: "center",
                  sx: { bgcolor: colorStyles.lightBlue },
                }}
              >
                <Typography {...CONGRATS_TEXT()} />
              </Stack>
              <Stack
                stackProps={{
                  direction: "row",
                  justifyContent: "space-around",
                  mt: 2,
                }}
              >
                <Button {...RETAKE_TEST} />
                <Button {...CONTINUE_BUTTON} />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            stackProps={{
              width: "40%",
              gap: 2,
              className: "mt-7",
            }}
          >
            <Typography {...ASSESSMENT_SPREAD_TEXT()} />
            <Stack
              stackProps={{
                className: "p-4 border shadow",
                direction: "column",
                justifyContent: "space-between",
                spacing: 2,
              }}
            >
              {scoreListDetails.map((details, index) => (
                <Stack
                  key={`scoreListDetails-${index}`}
                  stackProps={{
                    className: "border rounded-lg",
                    direction: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    spacing: 1,
                  }}
                >
                  <TextWithIcon
                    textWithIconProps={{
                      className: "p-2",
                    }}
                    icon={details.icon}
                    textProps={details.textProps}
                  />
                  <Typography {...SCORE_VALUE_3(section)} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default AssessmentScore;
