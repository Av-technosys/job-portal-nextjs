import { Button, Grid, Loader, Stack, Typography } from "../common";
import { ASSESSMENT_SCORE_PAGE_CONFIG } from "@/constants";
import { useGetAssessmentScoreInfo } from "@/services/useGetAssessmentScoreDetails";
import { colorStyles } from "@/styles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type paramID = {
  id: string | number | string[];
};

function AssessmentScore({ id }: paramID) {
  const router = useRouter();
  const [scoreDetails, setScoreDetails] = useState(null);
  const assessmentScoreDetails = useGetAssessmentScoreInfo({
    queryParams: { id },
  });

  useEffect(() => {
    setScoreDetails(assessmentScoreDetails?.data?.data);
  }, [assessmentScoreDetails]);

  const { SCORE_VALUE_1, SCORE_VALUE_2, CONGRATS_TEXT, CONTINUE_BUTTON } =
    ASSESSMENT_SCORE_PAGE_CONFIG;

  if (!scoreDetails) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  } else {
    return (
      <>
        <Grid
          gridProps={{
            container: true,
            spacing: 3,
            className: "max-w-5xl mx-auto mt-5 flex justify-center",
          }}
        >
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
                    <Typography
                      {...SCORE_VALUE_1(scoreDetails?.total_marks_scored)}
                    />
                    <Typography
                      {...SCORE_VALUE_2(scoreDetails?.assesment_total)}
                    />
                  </Stack>
                </Stack>
                <Stack
                  stackProps={{
                    justifyContent: "center",
                    textAlign: "center",
                    className: "bg-blue-100 p-2",
                  }}
                >
                  <Typography
                    {...CONGRATS_TEXT(
                      scoreDetails?.total_marks_scored,
                      scoreDetails?.assesment_total
                    )}
                  />
                </Stack>
                <Stack
                  stackProps={{
                    direction: "row",
                    justifyContent: "space-around",
                    mt: 2,
                  }}
                >
                  <Button
                    onClick={() =>
                      router.push(
                        `/dashboard/assessment/${scoreDetails?.assesment_session_id}`
                      )
                    }
                    {...CONTINUE_BUTTON}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default AssessmentScore;
