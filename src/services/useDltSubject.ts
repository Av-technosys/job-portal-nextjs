// services/deleteSubject.ts
import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { CommonAllDataType } from "@/types";

export const deleteSubject = ({
  user,
}: {
  user: string;
}): Promise<CommonAllDataType> => {
  return api.delete(apiConstantsURL.assessment.deleteSubject, {
    data: { id: user },
  });
};
