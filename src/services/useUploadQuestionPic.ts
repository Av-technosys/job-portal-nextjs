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
    mutationFn: CreateOrUpdateQuestionPicture,
  });
};

// DELETE
export const DeleteQuestionPicture = ({}): Promise<CommonAllDataType> => {
  return api.delete(`${apiConstantsURL.profile.questionImage}`);
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
