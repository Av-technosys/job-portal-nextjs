// services/deleteRecruiterOrStudent.ts
import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { CommonAllDataType } from "@/types";

export const deleteUser = ({
  user,
}: {
  user: string;
}): Promise<CommonAllDataType> => {
  return api.post(apiConstantsURL.profile.deleteUser, { id: user });
};
