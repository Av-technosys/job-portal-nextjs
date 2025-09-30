import {
  useQuery,
  queryOptions,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import {
  CommonAllDataType,
  MutationConfig,
  QueryConfig,
  SuccessResponseType,
  CreateOrUpdateProfilePicInput,
  CreateOrUpdateQuestionPicInput,
} from "@/types";
import { api } from "@/helper";

// GET Hook
export const getQuestionPicture = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile?.questionImage}`);
};

export const getQuestionPictureQueryOptions = () => {
  return queryOptions({
    queryKey: ["question_documents"],
    queryFn: () => getQuestionPicture(),
  });
};

type UseQuestionPictureQueryOptions = {
  queryConfig?: QueryConfig<typeof getQuestionPictureQueryOptions>;
};

export const useGetQuestionPicture = ({
  queryConfig,
}: UseQuestionPictureQueryOptions = {}) => {
  return useQuery({
    ...getQuestionPictureQueryOptions(),
    ...queryConfig,
  });
};

// POST/PATCH Hook
export const CreateOrUpdateQuestionPicture = ({
  data,
}: {
  data: CreateOrUpdateQuestionPicInput;
}): Promise<CommonAllDataType> => {
  return api.postForm(`${apiConstantsURL.profile.questionImage}`, data);
};

type UseCreateOrUpdateQuestionPictureOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateQuestionPicture>;
};

export const useCreateOrUpdateQuestionPicture = ({
  mutationConfig,
}: UseCreateOrUpdateQuestionPictureOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      await queryClient.invalidateQueries({
        queryKey: getQuestionPictureQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateQuestionPicture,
  });
};

export type QuestionIdInfoInput = {
  question_id: string | number;
};
// DELETE
export const DeleteQuestionPicture = ({
  data,
}: {
  data: QuestionIdInfoInput;
}): Promise<CommonAllDataType> => {
  return api.patch(`${apiConstantsURL.profile.questionImage}`, data);
};

type UseDeleteQuestionPictureOptions = {
  mutationConfig?: MutationConfig<typeof DeleteQuestionPicture>;
};

export const useDeleteQuestionPicture = ({
  mutationConfig,
}: UseDeleteQuestionPictureOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getQuestionPictureQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: DeleteQuestionPicture,
  });
};
