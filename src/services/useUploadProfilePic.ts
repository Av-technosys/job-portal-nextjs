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
} from "@/types";
import { api } from "@/helper";

// GET Hook
export const getProfilePicture = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile?.profileImage}`);
};

export const getProfilePictureQueryOptions = () => {
  return queryOptions({
    queryKey: ["user_documents"],
    queryFn: () => getProfilePicture(),
  });
};

type UseProfilePictureQueryOptions = {
  queryConfig?: QueryConfig<typeof getProfilePictureQueryOptions>;
};

export const useGetProfilePicture = ({
  queryConfig,
}: UseProfilePictureQueryOptions = {}) => {
  return useQuery({
    ...getProfilePictureQueryOptions(),
    ...queryConfig,
  });
};

// POST/PATCH Hook
export const CreateOrUpdateProfilePicture = ({
  data,
}: {
  data: CreateOrUpdateProfilePicInput;
}): Promise<CommonAllDataType> => {
  return api.postForm(`${apiConstantsURL.profile.profileImage}`, data);
};

type UseCreateOrUpdateProfilePictureOptions = {
  mutationConfig?: MutationConfig<typeof CreateOrUpdateProfilePicture>;
};

export const useCreateOrUpdateProfilePicture = ({
  mutationConfig,
}: UseCreateOrUpdateProfilePictureOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getProfilePictureQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: CreateOrUpdateProfilePicture,
  });
};

// DELETE
export const DeleteProfilePicture = ({}): Promise<CommonAllDataType> => {
  return api.delete(`${apiConstantsURL.profile.profileImage}`);
};

type UseDeleteProfilePictureOptions = {
  mutationConfig?: MutationConfig<typeof DeleteProfilePicture>;
};

export const useDeleteProfilePicture = ({
  mutationConfig,
}: UseDeleteProfilePictureOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
      // Invalidate Old Data
      queryClient.invalidateQueries({
        queryKey: getProfilePictureQueryOptions().queryKey,
      });
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: DeleteProfilePicture,
  });
};
