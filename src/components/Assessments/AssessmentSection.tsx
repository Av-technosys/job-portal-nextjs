import { ASSESSMENT_SECTION_PAGE_CONFIG } from "@/constants/assessmentSection";
import React from "react";
import { Button, Loader, Paper, Stack, Typography } from "../common";
import { StopWatchIcon, TotalQuestionsIcon } from "@/assets";
import { useGetAssessmentAttemptsInfo } from "@/services/useGetAssessmentAttempts";
import { useGetSubjectList } from "@/services/useGetFindSubject";
import { useRouter } from "next/navigation";

type testProps = {
  id: string | string[] | undefined | number;
  assessmentType: string;
};

const {
  SECTION_HEADER,
  START_TEST,
  RETAKE_TEST,
  ANALYSIS_TEST,
  BACK_BUTTON,
  MAX_TIME,
  TOTAL_QUESTIONS,
} = ASSESSMENT_SECTION_PAGE_CONFIG;

const AssessmentSection = ({ id, assessmentType }: testProps) => {
  const router = useRouter();

  const allSubjectList = useGetSubjectList();
  const subdata = allSubjectList.data?.data;
  let data = [];

  if (assessmentType == "paid") {
    data = subdata?.filter((item: any) => {
      if (item?.is_paid == true) {
        return item;
      }
    });
  } else {
    data = subdata?.filter((item: any) => {
      if (item?.is_paid == false) {
        return item;
      }
    });
  }

  const assessmentAttemptsDetails = useGetAssessmentAttemptsInfo({
    queryParams: { id },
  });

  if (!data || !assessmentAttemptsDetails) {
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
        <Stack
          stackProps={{
            direction: "column",
            spacing: "16px",
            alignItems: "center",
            className: "max-w-6xl mx-auto",
          }}
        >
          <Stack stackProps={{ className: "w-full" }}>
            <Stack stackProps={{ className: "mr-auto" }}>
              <Button
                onClick={() => router.push("/dashboard/assessment")}
                {...BACK_BUTTON}
              />
            </Stack>
          </Stack>
          <Typography {...SECTION_HEADER()} />

          <Stack
            stackProps={{
              direction: "column",
              spacing: "16px",
              className: "w-full",
            }}
          >
            {data?.map((item) => {
              const attempt = assessmentAttemptsDetails?.data?.data?.find(
                (att) => att?.subject_id === item?.id
              );

              return (
                <Paper key={item.id} paperProps={{ className: "p-3" }}>
                  <Stack
                    stackProps={{
                      direction: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Stack>
                      <Stack>{item?.exam_name}</Stack>
                      <Stack stackProps={{ direction: "row", spacing: "20px" }}>
                        <Stack
                          stackProps={{
                            direction: "row",
                            spacing: "1px",
                            alignItems: "center",
                          }}
                        >
                          <TotalQuestionsIcon style={{ fontSize: "15px" }} />
                          <Typography
                            {...TOTAL_QUESTIONS(
                              item?.easy_question_count +
                                item?.medium_question_count +
                                item?.difficult_question_count
                            )}
                          />
                        </Stack>
                        <Stack
                          stackProps={{
                            direction: "row",
                            spacing: "1px",
                            alignItems: "center",
                          }}
                        >
                          <StopWatchIcon style={{ fontSize: "15px" }} />
                          <Typography {...MAX_TIME(item?.duration_minutes)} />
                        </Stack>
                      </Stack>
                    </Stack>
                    {attempt ? (
                      <Stack
                        stackProps={{
                          direction: { xs: "column", sm: "row" },
                          spacing: "8px",
                        }}
                      >
                        <Button {...RETAKE_TEST} />
                        <Button
                          onClick={() =>
                            router.push(
                              `/dashboard/assessment-score/${attempt?.id}`
                            )
                          }
                          {...ANALYSIS_TEST}
                        />
                      </Stack>
                    ) : (
                      <Button
                        onClick={() =>
                          router.push(
                            `/assessment/get_test_question?assesment_session_id=${id}&subject_id=${item?.id}`
                          )
                        }
                        {...START_TEST}
                      />
                    )}
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        </Stack>
      </>
    );
  }
};

export default AssessmentSection;
