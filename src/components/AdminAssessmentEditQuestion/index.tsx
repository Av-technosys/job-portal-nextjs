import { Button, Formik, Loader, Stack } from "@/components";
import AdminLayout from "@/components/AdminLayout";
import { QUESTION_UPLOAD_CONFIG } from "@/constants";
import { QUESTION_CONFIG } from "@/constants/questionFormat";
import { getErrorMessageFromAPI } from "@/helper";
import { useGetAssesmentQuestionDetails, useNotification } from "@/services";
import { useUpdateQuestionInfo } from "@/services/useUpdateQuestion";
import { useCreateQuestionInfo } from "@/services/useCreateQuestion";

import { CommonObjectType, CreateOrUpdateQuestionInfoInput } from "@/types";
import { questionSchema } from "@/validator/question";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { ReactElement, useMemo } from "react";

const Index = ({
  subjectId,
  questionMethod,
}: {
  subjectId: number;
  questionMethod: string;
}) => {
  const questionAPIData = useGetAssesmentQuestionDetails({
    queryParams: {
      id: subjectId,
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const questionData = useMemo(() => {
    return questionAPIData?.data?.data;
  }, [questionAPIData]);

  const { NOTIFICATION_CONFIG } = QUESTION_CONFIG;
  const { showNotification } = useNotification();
  const UpdateQuestionInfoMutate = useUpdateQuestionInfo({
    mutationConfig: {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.SUCCESS);
        router.push(`/admin/assessment/${questionData?.subject}`);
        queryClient.invalidateQueries({
          queryKey: ["question_by_subject_id"],
        });
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  const CreateQuestionInfoMutate = useCreateQuestionInfo({
    mutationConfig: {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.SUCCESS);
        queryClient.invalidateQueries({
          queryKey: ["question_by_subject_id"],
        });
        router.push(`/admin/assessment/${subjectId}`);
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
    if (questionMethod == "create-question") {
      CreateQuestionInfoMutate.mutate({
        data: values as CreateOrUpdateQuestionInfoInput,
      });
    } else {
      UpdateQuestionInfoMutate.mutate({
        data: values as CreateOrUpdateQuestionInfoInput,
      });
    }
  }

  if (subjectId && !questionData && questionMethod == "update-question") {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }
  return (
    <>
      {(CreateQuestionInfoMutate.isPending ||
        UpdateQuestionInfoMutate.isPending) && (
        <Loader
          loaderProps={{
            open: true,
          }}
        />
      )}

      <Stack stackProps={{ className: "max-w-5xl border my-5 p-10 mx-auto" }}>
        <Button
          onClick={() => router.back()}
          {...QUESTION_CONFIG.FORM_CONFIG.BACK_BUTTON}
        />
        <Formik
          initialValues={
            subjectId && questionData
              ? {
                  id: questionData.id,
                  question_text: questionData.question_text,
                  question_paragraph: questionData.question_paragraph,
                  question_image: questionData.question_image,
                  option_1: questionData.option_1,
                  option_2: questionData.option_2,
                  option_3: questionData.option_3,
                  option_4: questionData.option_4,
                  correct_option: questionData.correct_option,
                  difficulty_level: questionData.difficulty_level,
                }
              : {
                  question_text: "",
                  question_paragraph: "",
                  question_image: null,
                  option_1: "",
                  option_2: "",
                  option_3: "",
                  option_4: "",
                  correct_option: "",
                  difficulty_level: 1,
                  subject: subjectId,
                }
          }
          validationSchema={questionSchema}
          onSuccess={handleFormSuccess}
          fieldDetailsArray={[
            QUESTION_CONFIG.FORM_CONFIG.QUESTION_TEXT_FIELD,
            QUESTION_CONFIG.FORM_CONFIG.QUESTION_PARAGRAPH_FIELD,
            QUESTION_CONFIG.FORM_CONFIG.QUESTION_PARAGRAPH_HEADING,
            QUESTION_UPLOAD_CONFIG,
            QUESTION_CONFIG.FORM_CONFIG.QUESTION_OPTIONS_HEADING,
            QUESTION_CONFIG.FORM_CONFIG.OPTION_1_FIELD,
            QUESTION_CONFIG.FORM_CONFIG.OPTION_2_FIELD,
            QUESTION_CONFIG.FORM_CONFIG.OPTION_3_FIELD,
            QUESTION_CONFIG.FORM_CONFIG.OPTION_4_FIELD,
            QUESTION_CONFIG.FORM_CONFIG.CORRECT_OPTION_HEADING,
            QUESTION_CONFIG.FORM_CONFIG.CORRECT_OPTION_FIELD,
          ]}
          formFooterArray={[QUESTION_CONFIG.FORM_CONFIG.SAVE_BUTTON]}
        />
      </Stack>
    </>
  );
};
Index.getLayout = (page: ReactElement) => (
  <AdminLayout pageProps={page.props}>{page}</AdminLayout>
);

export default Index;
