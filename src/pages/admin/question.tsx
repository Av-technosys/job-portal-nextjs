import { Formik, Stack } from "@/components";
import AdminLayout from "@/components/AdminLayout";
import { NOTIFICATION_CONFIG, QUESTION_UPLOAD_CONFIG } from "@/constants";
import { QUESTION_CONFIG } from "@/constants/questionFormat";
import {
  createDataForStudentProfileAdditionalInformationDetails,
  getErrorMessageFromAPI,
} from "@/helper";
import {
  useGetStudentProfileAdditionalInfo,
  useNotification,
} from "@/services";
import { useCreateOrUpdateQuestionInfo } from "@/services/useUpdateQuestion";

import {
  CommonObjectType,
  CreateOrUpdateQuestionInfoInput,
  CreateOrUpdateSubjectInfoInput,
} from "@/types";
import { questionSchema } from "@/validator/question";
import React, { ReactElement, useMemo } from "react";

const Index = () => {
  const {
    OPTION,
    QUESTION_FORM_CONFIG,
    QUESTION_FORM_OPTIONS,
    QUESTION_PARAGRAPH_HEADING,
    NOTIFICATION_CONFIG,
  } = QUESTION_CONFIG;
  const { QUESTION_SAVEMORE_BUTTON, QUESTION_SAVE_BUTTON } = QUESTION_CONFIG;
  const { showNotification } = useNotification();
  const UpdateQuestionInfoMutate = useCreateOrUpdateQuestionInfo({
    mutationConfig: {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.SUCCESS);
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
    const { work_experiences, ...rest } = values;

    const transformedValues = {
      ...rest,
      question_details: Array.isArray(work_experiences)
        ? work_experiences.map((exp: any) => ({
            ...exp,
          }))
        : [],
    };

    UpdateQuestionInfoMutate.mutate({
      data: transformedValues as CreateOrUpdateQuestionInfoInput,
    });
  }

  return (
    <>
      <Stack stackProps={{ className: "max-w-5xl border my-5 p-10 mx-auto" }}>
        <Formik
          initialValues={{
            work_experiences: [
              {
                id: 2,
                question_text:
                  "What is the sum of the first 10 natural numbers?",
                question_paragraph: "This is a testing...",
                question_image: "",
                option_1: "45",
                option_2: "50",
                option_3: "55",
                option_4: "60",
                correct_option: "option_3",
                difficulty_level: 1,
              },
            ],
          }}
          validationSchema={questionSchema}
          onSuccess={handleFormSuccess}
          fieldDetailsArray={[
            QUESTION_FORM_CONFIG.QUESTION_ARRAY_FIELD,
            QUESTION_PARAGRAPH_HEADING,
            QUESTION_UPLOAD_CONFIG,
            OPTION,
            QUESTION_FORM_OPTIONS.QUESTION_ARRAY_FIELD,
          ]}
          formFooterArray={[QUESTION_SAVEMORE_BUTTON, QUESTION_SAVE_BUTTON]}
        />
      </Stack>
    </>
  );
};
Index.getLayout = (page: ReactElement) => (
  <AdminLayout pageProps={page.props}>{page}</AdminLayout>
);

export default Index;
