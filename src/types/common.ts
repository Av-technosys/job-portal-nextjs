import { ReactNode } from "react";
import { Dayjs } from "dayjs";

export enum UserType {
  JOB_SEEKER_TYPE = "1",
  RECUITER_TYPE = "2",
  ADMIN_TYPE = "3",
}

export enum AccessType {
  JS_BASIC = "2",
  R_BASIC = "3",
  R_STANDARD = "4",
  R_PREMIUM = "5",
}

export interface AddressType {
  address?: string;
  city?: string;
}

export type dayjsInstance = Dayjs;

export type ElementRenderType = string | number | ReactNode;

export type CommonAllDataType =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | dayjsInstance
  | CommonObjectType
  | CommonObjectType[];

export type CommonObjectType = {
  [P: string]: CommonAllDataType;
};

export interface SuccessResponseType {
  success: boolean;
  data: CommonAllDataType | CommonObjectType;
}

export interface PaginationSuccessResponseType {
  success: boolean;
  data: CommonObjectType | CommonObjectType[];
  total_count: number;
  total_pages: number;
  current_page: number;
}

export interface FailureResponseType {
  success: boolean;
  message: string;
}

export interface UseFormProps {
  initialValues: CommonObjectType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: any;
  onSuccess: ({ values }: { values: CommonObjectType }) => void;
}

export type FileTypeProps = string | ArrayBuffer | null;

export enum JobStatusEnum {
  EXPIRED = "expired",
  ACTIVE = "active",
}

export const JOB_STATUS_LABELS: Record<JobStatusEnum, string> = {
  [JobStatusEnum.ACTIVE]: "Active",
  [JobStatusEnum.EXPIRED]: "Expired",
};
