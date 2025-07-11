import { FormikHelpers } from "formik";
import { CommonAllDataType, CommonObjectType } from "./common";
import {
  ButtonProps,
  CheckBoxProps,
  DatePickerProps,
  DropdownProps,
  InputProps,
  MultiSelectDropdownProps,
  TypographyProps,
} from "./components";
import { UploadDocumentProps } from "./profilePicture";

export enum FormikFieldsEnum {
  DATE_PICKER = "datePicker",
  TEXT_FIELD = "textfield",
  DROPDOWN = "dropdown",
  TYPOGRAPHY = "typography",
  UPLOAD_PROFILE_IMAGE = "uploadProfileImage",
  UPLOAD_DOCUMENT = "uploadDocument",
  MULTI_SELECT_DROPDOWN = "multiSelectDropdown",
  ARRAY_FIELD = "formikArrayField",
  SOCIAL_URL_INPUT = "socialUrlInput",
  CHECKBOX = "checkbox",
}

export interface FomrikCommonProps {
  fieldType: FormikFieldsEnum;
}

export interface FormikInputProps extends InputProps {
  fieldType?: FormikFieldsEnum;
}

export interface FormikDatePickerProps extends DatePickerProps {
  fieldType?: FormikFieldsEnum;
}

export interface FormikDropdownProps extends DropdownProps {
  fieldType?: FormikFieldsEnum;
}

export interface FormikTypographyProps extends TypographyProps {
  fieldType?: FormikFieldsEnum;
}

export interface FormikMultiSelectDropdownProps
  extends MultiSelectDropdownProps {
  fieldType?: FormikFieldsEnum;
}

export interface FormikCheckboxProps extends CheckBoxProps {
  fieldType?: FormikFieldsEnum;
}

export interface FormikUploadDocumentProps extends UploadDocumentProps {
  fieldType?: FormikFieldsEnum;
}

export interface FormikProps {
  initialValues: CommonObjectType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: any;
  onSuccess: ({ values }: { values: CommonObjectType }) => void;
  fieldDetailsArray?:
    | FormikInputProps[]
    | FormikDatePickerProps[]
    | FormikDropdownProps[]
    | FormikTypographyProps[]
    | FormikMultiSelectDropdownProps[]
    | FormikArrayFieldProps[]
    | FormikCheckboxProps[]
    | FormikUploadDocumentProps[];
  formFooterArray?: ButtonProps[];
  classNames?: {
    formItemParentClassName?: string;
    formFooterClassName?: string;
  };
}

export interface FormikFormProps {
  fieldDetailsArray: FormikProps["fieldDetailsArray"];
  errors: CommonObjectType;
  setFieldValue: FormikHelpers<CommonObjectType>["setFieldValue"];
  parentFieldName?: string;
  classNames?: FormikProps["classNames"];
}

export interface FormikArrayFieldProps {
  fieldType: FormikFieldsEnum;
  childFieldArray: FormikProps["fieldDetailsArray"];
  initialValue: () => CommonAllDataType | CommonAllDataType;
  arrayFieldName: string;
  arrayFormItemParentClassName?: string;
  arrayFormFooterClassName?: string;
  addMoreButtonProps?: {
    buttonProps: ButtonProps["buttonProps"];
    formControlProps: ButtonProps["formControlProps"];
  };
  removeExtraProps: TypographyProps;
  hideFirstRemoveButton: boolean;
  removeButtonProps: {
    buttonProps: ButtonProps["buttonProps"];
    formControlProps: ButtonProps["formControlProps"];
  };
}

export interface FormikSocialLinkInputProps {
  fieldType: FormikFieldsEnum;
  socialUrlFieldName: string;
}
