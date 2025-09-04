import { Session } from "next-auth";
import { AccessType, CommonObjectType, UserType } from "./common";
import { QueryObserverResult } from "@tanstack/react-query";

export interface CommonDetailsProps {
  userType: UserType | -1;
  accessType: AccessType | -1;
  question: string;
  paragraph: string;
  option1: number;
  option2: number;
  option3: number;
  option4: number;
  questionImage: string;
  refetchCommonDetails: () => Promise<
    QueryObserverResult<CommonObjectType, Error>
  >;
}

export interface StoreFCMTokenInput {
  fcm_token: string;
}

export interface SSOSessionProps extends Session {
  accessToken: string;
}
