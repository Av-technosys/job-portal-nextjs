import { useContext } from "react";
import { CommonDetailsContext } from "./CommonDetailsProvider";

export const useCommonDetails = () => {
  return useContext(CommonDetailsContext);
};
