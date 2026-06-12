import React from "react";
import { Chip } from "@mui/material";
import { Button, Stack, Typography } from "../common";
import { ADMIN_QUESTION_URL, ASSESSMENT_SCORE_PAGE_CONFIG } from "@/constants";
import DialogEdit from "../common/DialogEdit";
import { useRouter } from "next/navigation";
import AlertDialogDelete from "../common/DialogAlert";
import { useDeleteSubject } from "@/services/useDeleteSubject";
import { useNotification } from "@/services";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { getErrorMessageFromAPI } from "@/helper";
import { useUpdateSubjectInfo } from "@/services/useUpdateSubject";
import { useQueryClient } from "@tanstack/react-query";

interface AssessmentType {
  exam_name: string;
  id: number;
  section_name: string;
  duration_minutes: number;
  difficult_question_count: number;
  medium_question_count: number;
  easy_question_count: number;
  marks_correct: string;
  marks_incorrect: string;
  marks_unattempted: string;
  is_paid: boolean;
  is_live: boolean;
  is_ready: boolean;
  available_easy_questions: number;
  available_medium_questions: number;
  available_difficult_questions: number;
}

interface AssessmentContentProps {
  paidAssessment: AssessmentType[];
  assessmentContent: any;
  btntype: boolean;
}

const AssessmentContent: React.FC<AssessmentContentProps> = ({
  paidAssessment,
  assessmentContent,
  btntype,
}) => {
  const {
    ASSESSMENT_ADD_BUTTON,
    ASSESSMENT_DELETE_BUTTON,
    ASSESSMENT_EDIT_BUTTON,
    ASSESSMENT_VQ_BUTTON,
  } = ASSESSMENT_SCORE_PAGE_CONFIG;

  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);

  const [Value, setValue] = React.useState({});

  const handleDeleteClick = (userValue: any) => {
    setIsDeleteDialogOpen(true);
    setSelectedUser(userValue);
  };

  const assessmentEditHandler = ({ value }: any) => {
    setIsEditDialogOpen(true);
    setValue(value);
  };

  const assessmentCreateHandler = () => {
    setIsEditDialogOpen(true);
    setValue({ mode: "create_subject", is_paid: btntype });
  };

  const deleteSubjectMutation = useDeleteSubject();
  const updateSubjectMutation = useUpdateSubjectInfo();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { SUCCESS_SUBJECT } = FIND_STUDENT_PAGE_CONFIG;

  const refreshSubjects = () => {
    queryClient.invalidateQueries({ queryKey: ["get_all_subjects"] });
  };

  const assesmentDeleteHandler = () => {
    deleteSubjectMutation.mutate(
      { user: selectedUser },
      {
        onSuccess: () => {
          showNotification(SUCCESS_SUBJECT);
          setIsDeleteDialogOpen(false);
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      }
    );
  };

  const subjectLiveHandler = (assesment: AssessmentType) => {
    updateSubjectMutation.mutate(
      {
        data: {
          id: assesment.id,
          exam_name: assesment.exam_name,
          section_name: assesment.section_name,
          duration_minutes: assesment.duration_minutes,
          easy_question_count: assesment.easy_question_count,
          medium_question_count: assesment.medium_question_count,
          difficult_question_count: assesment.difficult_question_count,
          is_paid: assesment.is_paid,
          is_live: !assesment.is_live,
          marks_correct: assesment.marks_correct,
          marks_incorrect: assesment.marks_incorrect,
          marks_unattempted: assesment.marks_unattempted,
        },
      },
      {
        onSuccess: () => {
          showNotification({
            message: assesment.is_live ? "Subject unpublished." : "Subject published.",
          });
          refreshSubjects();
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
        },
      }
    );
  };

  const getQuestionReadinessDetails = (assesment: AssessmentType) => {
    const counts = [
      {
        label: "Easy",
        available: assesment.available_easy_questions,
        required: assesment.easy_question_count,
      },
      {
        label: "Medium",
        available: assesment.available_medium_questions,
        required: assesment.medium_question_count,
      },
      {
        label: "Hard",
        available: assesment.available_difficult_questions,
        required: assesment.difficult_question_count,
      },
    ];

    const missing = counts
      .map((item) => ({
        label: item.label,
        count: Math.max(item.required - item.available, 0),
      }))
      .filter((item) => item.count > 0);

    return {
      counts,
      missingText:
        missing.length > 0
          ? `Missing ${missing.map((item) => `${item.count} ${item.label}`).join(", ")}`
          : "Ready to publish",
    };
  };

  return (
    <Stack>
      {isEditDialogOpen && (
        <DialogEdit
          open={isEditDialogOpen}
          setopen={setIsEditDialogOpen}
          AssessmentValue={Value}
        />
      )}
      {isDeleteDialogOpen && (
        <AlertDialogDelete
          open={isDeleteDialogOpen}
          setOpen={setIsDeleteDialogOpen}
          deleteItemType={"Subject"}
          deleteHandler={assesmentDeleteHandler}
        />
      )}
      <Stack
        stackProps={{
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
          sx:
            btntype == false
              ? {
                  mt: "24px",
                }
              : {},
        }}
      >
        <Typography {...assessmentContent} />
        <Button onClick={assessmentCreateHandler} {...ASSESSMENT_ADD_BUTTON} />
      </Stack>
      <Stack>
        {paidAssessment?.map((assesment, index) => {
          const readinessDetails = getQuestionReadinessDetails(assesment);

          return (
          <Stack
            key={index}
            stackProps={{
              direction: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "space-between",
              gap: "20px",
              bgcolor: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
              className: "px-4 py-4 mt-4",
            }}
          >
            <Stack
              stackProps={{
                gap: "12px",
                sx: { minWidth: 0, flex: 1 },
              }}
            >
              <Stack
                stackProps={{
                  direction: "row",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  typographyProps={{
                    variant: "body1",
                    fontWeight: 600,
                    sx: {
                      color: "#111827",
                      lineHeight: 1.25,
                    },
                    children: assesment.exam_name,
                  }}
                />
                <Chip
                  size="small"
                  label={assesment.is_live ? "Live" : "Draft"}
                  sx={{
                    height: 24,
                    borderRadius: "6px",
                    bgcolor: assesment.is_live ? "#DCFCE7" : "#FEF3C7",
                    color: assesment.is_live ? "#166534" : "#92400E",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                />
                <Chip
                  size="small"
                  label={assesment.is_ready ? "Ready to publish" : "Needs questions"}
                  sx={{
                    height: 24,
                    borderRadius: "6px",
                    bgcolor: assesment.is_ready ? "#DBEAFE" : "#FEE2E2",
                    color: assesment.is_ready ? "#1D4ED8" : "#B91C1C",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                />
              </Stack>

              <Stack
                stackProps={{
                  gap: "8px",
                  sx: { maxWidth: 620 },
                }}
              >
                <Stack
                  stackProps={{
                    direction: "row",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {readinessDetails.counts.map((item) => {
                    const isComplete = item.available >= item.required;

                    return (
                      <Stack
                        key={item.label}
                        stackProps={{
                          direction: "row",
                          alignItems: "center",
                          gap: "6px",
                          sx: {
                            px: 1,
                            py: 0.5,
                            borderRadius: "6px",
                            border: "1px solid #E2E8F0",
                            bgcolor: isComplete ? "#F8FAFC" : "#FFF7ED",
                          },
                        }}
                      >
                        <Typography
                          typographyProps={{
                            variant: "caption",
                            sx: {
                              color: "#334155",
                              fontWeight: 600,
                            },
                            children: item.label,
                          }}
                        />
                        <Typography
                          typographyProps={{
                            variant: "caption",
                            sx: {
                              color: isComplete ? "#475569" : "#C2410C",
                            },
                            children: `${item.available}/${item.required}`,
                          }}
                        />
                      </Stack>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
            <Stack
              stackProps={{
                direction: "row",
                justifyContent: { xs: "flex-start", md: "flex-end" },
                gap: "8px",
                alignItems: "center",
                flexWrap: "wrap",
                sx: { flexShrink: 0 },
              }}
            >
              <Button
                onClick={() => router.push(ADMIN_QUESTION_URL(assesment.id))}
                {...ASSESSMENT_VQ_BUTTON}
              />
              <Button
                onClick={() => subjectLiveHandler(assesment)}
                buttonProps={{
                  variant: assesment.is_live ? "outlined" : "contained",
                  color: assesment.is_live ? "warning" : "success",
                  size: "small",
                  disabled: updateSubjectMutation.isPending || (!assesment.is_ready && !assesment.is_live),
                  children: assesment.is_live ? "Unpublish" : "Publish",
                }}
              />
              <Button
                onClick={() =>
                  assessmentEditHandler({
                    value: assesment,
                  })
                }
                {...ASSESSMENT_EDIT_BUTTON}
              />
              <Button
                onClick={() => handleDeleteClick(assesment?.id)}
                {...ASSESSMENT_DELETE_BUTTON}
              />
            </Stack>
          </Stack>
        )})}
      </Stack>
    </Stack>
  );
};

export default AssessmentContent;
