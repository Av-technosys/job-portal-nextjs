import React from "react";
import { Button, Stack, Typography, When } from "../common";
import { ADMIN_QUESTION_URL, ASSESSMENT_SCORE_PAGE_CONFIG } from "@/constants";
import DialogEdit from "../common/DialogEdit";
import { useRouter } from "next/navigation";
import AlertDialog from "../common/DialogAlert";

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
  PaidAssessment: AssessmentType[];
  AssessmentContent: any;
  btntype: boolean;
}

const AssessmentContent: React.FC<AssessmentContentProps> = ({
  PaidAssessment,
  AssessmentContent,
  btntype,
}) => {
  const {
    ASSESSMENT_ADD_BUTTON,
    ASSESSMENT_DELETE_BUTTON,
    ASSESSMENT_EDIT_BUTTON,
    ASSESSMENT_VQ_BUTTON,
  } = ASSESSMENT_SCORE_PAGE_CONFIG;

  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [DialogOpen, setDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [Value, setValue] = React.useState({});

  const handlemenuclick = (userValue: any) => {
    setDialogOpen(true);
    setAnchorEl(null);
    setSelectedUser(userValue);
  };

  const assessmentEditHandler = ({ value }: any) => {
    setOpen(true);
    setValue(value);
  };

  return (
    <Stack>
      {open && (
        <DialogEdit open={open} setopen={setOpen} AssessmentValue={Value} />
      )}
      {DialogOpen && (
        <AlertDialog
          user={selectedUser}
          open={DialogOpen}
          setOpen={setDialogOpen}
          subject={"Subject"}
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
        <Typography {...AssessmentContent} />
        <When condition={btntype}>
          {" "}
          <Button
            onClick={() => assessmentEditHandler({ value: "create_subject" })}
            {...ASSESSMENT_ADD_BUTTON}
          />
        </When>
      </Stack>
      <Stack>
        {PaidAssessment?.map((Assessment, index) => (
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
            <Stack>{Assessment.exam_name}</Stack>
            <Stack
              stackProps={{
                direction: "row",
                justifyContent: "space-evenly",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => router.push(ADMIN_QUESTION_URL)}
                {...ASSESSMENT_VQ_BUTTON}
              />
              <Button
                onClick={() =>
                  assessmentEditHandler({
                    value: Assessment,
                  })
                }
                {...ASSESSMENT_EDIT_BUTTON}
              />
              <When condition={btntype}>
                <Button
                  onClick={() => handlemenuclick(Assessment?.id)}
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
