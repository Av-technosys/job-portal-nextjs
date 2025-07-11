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
  CreateOrUpdateDocumentInput,
  JobSeekerDocumentKeyEnum,
  RecruiterDocumentKeyEnum,
} from "@/types";
import { api } from "@/helper";

// GET Hook
export const getUserDocuments = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.uploadDocument}`);
};

export const getUserDocumentsQueryOptions = () => {
  return queryOptions({
    queryKey: ["user_documents"],
    queryFn: () => getUserDocuments(),
  });
};

type UserDocumentsQueryOptions = {
  queryConfig?: QueryConfig<typeof getUserDocumentsQueryOptions>;
};

export const useGetUserDocuments = ({
  queryConfig,
}: UserDocumentsQueryOptions = {}) => {
  return useQuery({
    ...getUserDocumentsQueryOptions(),
    ...queryConfig,
  });
};

// POST/PATCH Hook
export const CreateOrUpdateUserDocuments = ({
  data,
  id,
}: {
  data: CreateOrUpdateDocumentInput;
  id?: number;
}): Promise<CommonAllDataType> => {
  if (id) {
    return api.patchForm(`${apiConstantsURL.profile.uploadDocument}`, {
      ...data,
      id,
    });
  }
  return api.postForm(`${apiConstantsURL.profile.uploadDocument}`, data);
};

type UseCreateOrUpdateUserDocumentsOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateUserDocuments>;
};

export const useCreateOrUpdateUserDocuments = ({
  mutationConfig,
}: UseCreateOrUpdateUserDocumentsOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getUserDocumentsQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateUserDocuments,
  });
};

// DELETE
export const DeleteUserDocuments = ({
  id,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  file_type,
}: {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  file_type: JobSeekerDocumentKeyEnum | RecruiterDocumentKeyEnum;
}): Promise<CommonAllDataType> => {
  return api.delete(`${apiConstantsURL.profile.uploadDocument}`, {
    data: { id },
  });
};

type UseDeleteUserDocumentsOptions = {
  mutationConfig?: MutationConfig<typeof DeleteUserDocuments>;
};

export const useDeleteUserDocuments = ({
  mutationConfig,
}: UseDeleteUserDocumentsOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getUserDocumentsQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: DeleteUserDocuments,
  });
};
