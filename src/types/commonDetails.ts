import { Session } from "next-auth";
import { AccessType, CommonObjectType, UserType } from "./common";
import { QueryObserverResult } from "@tanstack/react-query";

export interface CommonDetailsProps {
  userType: UserType | -1;
  accessType: AccessType | -1;
  name: string;
  email: string;
  phoneNumber: number;
  userId: number;
  profileImage: string;
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
