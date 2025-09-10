import React from "react";
import { Button, Stack, Typography, When } from "../common";
import { ADMIN_QUESTION_URL, ASSESSMENT_SCORE_PAGE_CONFIG } from "@/constants";
import DialogEdit from "../common/DialogEdit";
import { useRouter } from "next/navigation";
import AlertDialogDelete from "../common/DialogAlert";
import { useDeleteSubject } from "@/services/useDeleteSubject";
import { useNotification } from "@/services";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { getErrorMessageFromAPI } from "@/helper";

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

  const deleteSubjectMutation = useDeleteSubject();
  const { showNotification } = useNotification();
  const { SUCCESS_SUBJECT } = FIND_STUDENT_PAGE_CONFIG;

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
        <When condition={btntype}>
          {" "}
          <Button
            onClick={() => assessmentEditHandler({ value: "create_subject" })}
            {...ASSESSMENT_ADD_BUTTON}
          />
        </When>
      </Stack>
      <Stack>
        {paidAssessment?.map((assesment, index) => (
          <Stack
            key={index}
            stackProps={{
              direction: "row",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#f5f5f5",
              border: "1px solid #D9D9D9",
              className: "px-2 py-2 mt-4 rounded-md",
            }}
          >
            <Stack>{assesment.exam_name}</Stack>
            <Stack
              stackProps={{
                direction: "row",
                justifyContent: "space-evenly",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => router.push(ADMIN_QUESTION_URL(assesment.id))}
                {...ASSESSMENT_VQ_BUTTON}
              />
              <Button
                onClick={() =>
                  assessmentEditHandler({
                    value: assesment,
                  })
                }
                {...ASSESSMENT_EDIT_BUTTON}
              />
              <When condition={btntype}>
                <Button
                  onClick={() => handleDeleteClick(assesment?.id)}
                  {...ASSESSMENT_DELETE_BUTTON}
                />
              </When>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default AssessmentContent;
