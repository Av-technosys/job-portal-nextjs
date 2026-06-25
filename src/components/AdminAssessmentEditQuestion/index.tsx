import { Button, Formik, Loader, Stack } from "@/components";
import AdminLayout from "@/components/AdminLayout";
import { QUESTION_UPLOAD_CONFIG } from "@/constants";
import { QUESTION_CONFIG } from "@/constants/questionFormat";
import { getErrorMessageFromAPI } from "@/helper";
import { useGetAssesmentQuestionDetails, useNotification } from "@/services";
import { useUpdateQuestionInfo } from "@/services/useUpdateQuestion";
import { useCreateQuestionInfo } from "@/services/useCreateQuestion";
import { useCreateOrUpdateQuestionPicture } from "@/services/useUploadQuestionPic";

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
  const isUpdateMode = questionMethod === "update-question";

  const questionAPIData = useGetAssesmentQuestionDetails({
    queryParams: {
      id: subjectId,
    },
    queryConfig: {
      enabled: isUpdateMode && Boolean(subjectId),
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const questionData = useMemo(() => {
    return isUpdateMode ? questionAPIData?.data?.data : undefined;
  }, [isUpdateMode, questionAPIData]);

  const { NOTIFICATION_CONFIG } = QUESTION_CONFIG;
  const { showNotification } = useNotification();

  async function uploadQuestionImage(questionId: number | string, image: unknown) {
    if (!(image instanceof File)) {
      return;
    }

    await UploadQuestionImageMutate.mutateAsync({
      data: {
        question_id: questionId,
        question_image: image,
      },
    });
  }

  function getQuestionPayload(values: CommonObjectType) {
    const { question_image, ...payload } = values;
    return {
      payload,
      questionImage: question_image,
    };
  }

  function handleSuccessRedirect(path: string) {
    showNotification(NOTIFICATION_CONFIG.SUCCESS);
    queryClient.invalidateQueries({
      queryKey: ["question_by_subject_id"],
    });
    router.push(path);
  }

  const UploadQuestionImageMutate = useCreateOrUpdateQuestionPicture({
    mutationConfig: {
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  const UpdateQuestionInfoMutate = useUpdateQuestionInfo({
    mutationConfig: {
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
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    const { payload, questionImage } = getQuestionPayload(values);

    if (questionMethod == "create-question") {
      CreateQuestionInfoMutate.mutate({
        data: payload as CreateOrUpdateQuestionInfoInput,
      }, {
        onSuccess: async (response) => {
          const questionId = response?.data?.id;

          if (questionId) {
            await uploadQuestionImage(questionId, questionImage);
          }

          handleSuccessRedirect(`/admin/assessment/${subjectId}`);
        },
      });
    } else {
      UpdateQuestionInfoMutate.mutate({
        data: payload as CreateOrUpdateQuestionInfoInput,
      }, {
        onSuccess: async () => {
          if (questionData?.id) {
            await uploadQuestionImage(questionData.id, questionImage);
          }

          handleSuccessRedirect(`/admin/assessment/${questionData?.subject}`);
        },
      });
    }
  }

  if (isUpdateMode && subjectId && !questionData) {
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
        UpdateQuestionInfoMutate.isPending ||
        UploadQuestionImageMutate.isPending) && (
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
            isUpdateMode && questionData
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
            QUESTION_CONFIG.FORM_CONFIG.QUESTION_DIFFICULTY_FIELD,
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
