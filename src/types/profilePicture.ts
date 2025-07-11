import { CommonObjectType } from "./common";
import { FormControlProps } from "@mui/material";

export enum ProfileImageEnum {
  PROFILE_IMAGE = "profile_image",
}
export type CreateOrUpdateProfilePicInput = {
  file_type: ProfileImageEnum.PROFILE_IMAGE;
  file: File;
};

export type CreateOrUpdateDocumentInput = {
  file_type: JobSeekerDocumentKeyEnum | RecruiterDocumentKeyEnum;
  file: File;
};

export enum JobSeekerDocumentKeyEnum {
  RESUME = "resume",
  VIDEO_RESUME = "video_resume",
  CERTIFICATE = "certificate",
  OTHER = "other",
}

export enum RecruiterDocumentKeyEnum {
  ORG_REGISTRATION_NUMBER = "organization_registration_number",
  CIN_NUMBER = "CIN_number",
  GST_NUMBER = "GST_number",
  OTHER = "other",
}

export enum DocumentTypeEnum {
  PDF = ".pdf",
  MP4 = ".mp4",
}

export interface UploadDocumentProps {
  lines?: string[];
  uploadText?: string;
  dragText?: string;
  fileInfo?: string;
  accept?: DocumentTypeEnum;
  onUpload?: (file: File | null) => void;
  onDelete?: () => void;
  formControlProps?: FormControlProps;
  documentKey: JobSeekerDocumentKeyEnum;
  documentDetails?: CommonObjectType;
}
