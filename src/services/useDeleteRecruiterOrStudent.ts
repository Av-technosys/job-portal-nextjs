import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
export const UseDeleteRecruiterOrStudent = ({ user }: any) => {
  api.post(apiConstantsURL.profile.deleteUser, { id: user });
  return { flag: 1, msg: "User Deleted Successfully..." };
};
