import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { ASSESSEMENT_EDIT_CONFIG } from "@/constants";
import Formik from "./Formik";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
import { STUDENT_PROFILE_ADDITIONAL_INFORMATION_CONFIG } from "@/constants";
import { getErrorMessageFromAPI } from "@/helper";
import { useCommonDetails, useNotification } from "@/services";
import { CommonObjectType, CreateOrUpdateSubjectInfoInput } from "@/types";
import { useUpdateSubjectInfo } from "@/services/useUpdateSubject";
import { assessmentEditSchema } from "@/validator/assessmentEdit";
import { useCreateSubjectInfo } from "@/services/useCreateSubject";
import { useGetSubjectList } from "@/services/useGetFindSubject";
import { useQueryClient } from "@tanstack/react-query";

export default function DialogEdit({ open, setopen, AssessmentValue }: any) {
  const { NOTIFICATION_CONFIG, SAVE_BUTTON } =
    STUDENT_PROFILE_ADDITIONAL_INFORMATION_CONFIG;
  const { refetchCommonDetails } = useCommonDetails();
  const { ASSESSEMENT_EDIT_FORM_CONFIG } = ASSESSEMENT_EDIT_CONFIG;
  const { showNotification } = useNotification();

  const { refetch } = useGetSubjectList();

  const UpdateSubjectInfoMutate = useUpdateSubjectInfo({
    mutationConfig: {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.SUCCESS_SUBJECT);
        setopen(false);
        refetch();
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });
  const CreateSubjectInfoMutate = useCreateSubjectInfo({
    mutationConfig: {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.SUCCESS_CREATE_SUBJECT);
        setopen(false);
        refetch();
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    if (Array.isArray(values.work_experiences)) {
      if (AssessmentValue == "create_subject") {
        CreateSubjectInfoMutate.mutate({
          data: values?.work_experiences[0] as CreateOrUpdateSubjectInfoInput,
        });
      } else {
        UpdateSubjectInfoMutate.mutate({
          data: values?.work_experiences[0] as CreateOrUpdateSubjectInfoInput,
        });
      }
    }
  }

  const handleClose = () => {
    setopen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Assessment
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Formik
            initialValues={
              AssessmentValue != "create_subject"
                ? {
                    work_experiences: [AssessmentValue],
                  }
                : {
                    work_experiences: [
                      {
                        exam_name: "",
                        section_name: "",
                        is_paid: true,
                        duration_minutes: "",
                        easy_question_count: "",
                        medium_question_count: "",
                        difficult_question_count: "",
                        marks_correct: "",
                        marks_incorrect: "",
                        marks_unattempted: "",
                      },
                    ],
                  }
            }
            validationSchema={assessmentEditSchema}
            onSuccess={handleFormSuccess}
            fieldDetailsArray={[
              ASSESSEMENT_EDIT_FORM_CONFIG.ASSESSEMENT_EDIT_ARRAY_FIELD,
            ]}
            formFooterArray={[SAVE_BUTTON]}
          />
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
