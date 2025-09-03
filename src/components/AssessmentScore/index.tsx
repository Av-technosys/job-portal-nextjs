import { Button, Grid, Stack, Typography } from "../common";
import { ASSESSMENT_SCORE_PAGE_CONFIG } from "@/constants";
import { colorStyles } from "@/styles";

function AssessmentScore() {
  const {
    SCORE_VALUE_1,
    SCORE_VALUE_2,
    CONGRATS_TEXT,
    RETAKE_TEST,
    CONTINUE_BUTTON,
    ASSESSMENT_TOTAL_ATTEMPTED_QUESTIONS,
    ASSESSMENT_TOTAL_REMAINING_QUESTIONS,
    ASSESSMENT_TOTAL_QUESTIONS,
  } = ASSESSMENT_SCORE_PAGE_CONFIG;

  return (
    <>
      {/* <Stack
        stackProps={{
          direction: "row",
          justifyContent: "space-between",
          className: "max-w-5xl mx-auto",
        }}
      > */}
      <Grid
        gridProps={{
          container: true,
          spacing: 3,
          className: "max-w-5xl mx-auto mt-5 ",
        }}
      >
        <Grid
          gridProps={{
            size: { xs: 12, sm: 6 },
          }}
        >
          <Stack
            stackProps={{
              width: { xs: "100%", sm: "80%" },
              gap: 2,
              className: "mt-7 flex flex-col justify-between",
            }}
          >
            <Stack
              stackProps={{
                className: "p-4 border shadow bg-blue-100",
                direction: "column",
                justifyContent: "space-between",
                spacing: 2,
              }}
            >
              <Stack
                stackProps={{
                  direction: "column",
                  spacing: "3px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  stackProps={{ className: "text-blue-600 text-2xl font-bold" }}
                >
                  30
                </Stack>
                <Typography {...ASSESSMENT_TOTAL_QUESTIONS()} />
              </Stack>
            </Stack>
            <Stack
              stackProps={{
                className: "p-4 border shadow bg-green-100",
                direction: "column",
                justifyContent: "space-between",
                spacing: 2,
              }}
            >
              <Stack
                stackProps={{
                  direction: "column",
                  spacing: "3px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  stackProps={{
                    className: "text-green-600 text-2xl font-bold",
                  }}
                >
                  25
                </Stack>
                <Typography {...ASSESSMENT_TOTAL_ATTEMPTED_QUESTIONS()} />
              </Stack>
            </Stack>
            <Stack
              stackProps={{
                className: "p-4 border shadow bg-red-100",
                direction: "column",
                justifyContent: "space-between",
                spacing: 2,
              }}
            >
              <Stack
                stackProps={{
                  direction: "column",
                  spacing: "3px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  stackProps={{ className: "text-red-600 text-2xl font-bold" }}
                >
                  5
                </Stack>
                <Typography {...ASSESSMENT_TOTAL_REMAINING_QUESTIONS()} />
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid gridProps={{ size: { xs: 12, sm: 6 } }}>
          <Stack
            stackProps={{
              width: "100%",
              gap: 2,
              className: " mt-5 ",
              direction: "column",
            }}
          >
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
                  className: "my-2",
                }}
              >
                <Stack
                  stackProps={{
                    className: "rounded-full mx-auto",
                    height: 150,
                    width: 150,
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
                  className: "bg-blue-100 p-2",
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
        </Grid>
      </Grid>
      {/* </Stack> */}
    </>
  );
}

export default AssessmentScore;
