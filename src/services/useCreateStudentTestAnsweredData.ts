import { useMutation } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { CommonAllDataType, MutationConfig } from "@/types";

export const CreateStudentTestAnsweredData = ({
  data,
  attemptId,
}: {
  data: any;
  attemptId: number;
}): Promise<CommonAllDataType> => {
  return api.post(
    `${apiConstantsURL.assessment.assessmentAnsweredData}${attemptId}/`,
    data
  );
};

type UseCreateStudentAnsweredDataOptions = {
  mutationConfig?: MutationConfig<typeof CreateStudentTestAnsweredData>;
};

export const UseCreateStudentAnsweredData = ({
  mutationConfig,
}: UseCreateStudentAnsweredDataOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: CreateStudentTestAnsweredData,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
  });
};
