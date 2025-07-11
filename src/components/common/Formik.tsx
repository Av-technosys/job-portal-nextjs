import {
  CommonObjectType,
  DatePickerProps,
  DropdownProps,
  FormikArrayFieldProps,
  FormikDatePickerProps,
  FormikDropdownProps,
  FormikFieldsEnum,
  FormikFormProps,
  FormikInputProps,
  FormikMultiSelectDropdownProps,
  FormikProps,
  FormikSocialLinkInputProps,
  FormikTypographyProps,
  InputProps,
  MultiSelectDropdownProps,
  FormikCheckboxProps,
  CheckBoxProps,
  FormikUploadDocumentProps,
} from "@/types";
import { FastField, Field, Form, Formik as MUIFormik } from "formik";
import React, { useCallback, useState } from "react";
import { constructClassName, getErrorConfig } from "@/helper";
import Button from "./Button";
import Stack from "./Stack";
import FormikFields from "./FormikFields";

export function FormikForm({
  fieldDetailsArray,
  errors,
  setFieldValue,
  parentFieldName,
}: FormikFormProps) {
  function getFieldName(
    fieldDetail:
      | FormikInputProps
      | FormikDatePickerProps
      | FormikDropdownProps
      | FormikMultiSelectDropdownProps
      | FormikArrayFieldProps
      | FormikSocialLinkInputProps
      | FormikCheckboxProps
      | FormikUploadDocumentProps
  ) {
    let fieldName = "fieldName";
    switch (fieldDetail.fieldType) {
      case FormikFieldsEnum.DATE_PICKER:
        const { dateProps } = fieldDetail as DatePickerProps;
        fieldName = dateProps?.name || "datePickerFieldName";
        break;
      case FormikFieldsEnum.DROPDOWN:
        const { selectProps } = fieldDetail as DropdownProps;
        fieldName = selectProps?.name || "dropdownFieldName";
        break;
      case FormikFieldsEnum.ARRAY_FIELD:
        const { arrayFieldName } = fieldDetail as FormikArrayFieldProps;
        fieldName = arrayFieldName || "arrayFieldName";
        break;
      case FormikFieldsEnum.TYPOGRAPHY:
        const { typographyProps } = fieldDetail as FormikTypographyProps;
        fieldName =
          (typographyProps?.children as string) || "typographyFieldName";
        break;
      case FormikFieldsEnum.MULTI_SELECT_DROPDOWN:
        const { selectProps: multiSelectProps } =
          fieldDetail as MultiSelectDropdownProps;
        fieldName = multiSelectProps?.name || "multiSelectDropdownFieldName";
        break;
      case FormikFieldsEnum.SOCIAL_URL_INPUT:
        const { socialUrlFieldName } =
          fieldDetail as FormikSocialLinkInputProps;
        fieldName = socialUrlFieldName || "socialUrlInputFieldName";
        break;
      case FormikFieldsEnum.CHECKBOX:
        const { checkboxProps } = fieldDetail as CheckBoxProps;
        fieldName = checkboxProps?.name || "checkboxFieldName";
        break;
      default:
        const { inputProps } = fieldDetail as InputProps;
        fieldName = inputProps?.name || "textFieldFieldName";
    }

    // If Array Field is present, then return the parentFieldName
    // Format:: {array_field_name}.{index}.{child_fieldName}
    if (parentFieldName) return `${parentFieldName}.${fieldName}`;
    return fieldName;
  }

  return (
    <>
      {fieldDetailsArray?.map((fieldDetail, idx) => {
        // Normal Fields
        if (
          [
            FormikFieldsEnum.TYPOGRAPHY,
            FormikFieldsEnum.UPLOAD_DOCUMENT,
            FormikFieldsEnum.UPLOAD_PROFILE_IMAGE,
          ].includes(fieldDetail?.fieldType as FormikFieldsEnum)
        ) {
          return (
            <Field key={`ja-form-${fieldDetail?.fieldType}_${idx}`}>
              {({ field }: { field: CommonObjectType }) => {
                return (
                  <FormikFields
                    {...fieldDetail}
                    setFieldValue={setFieldValue}
                    field={field}
                    errors={errors}
                  />
                );
              }}
            </Field>
          );
        }

        const fieldName = getFieldName(fieldDetail);
        return (
          <FastField key={`${fieldName}_${idx}`} name={fieldName}>
            {({ field }: { field: CommonObjectType }) => {
              return (
                <FormikFields
                  {...fieldDetail}
                  {...getErrorConfig(errors, fieldName)}
                  setFieldValue={setFieldValue}
                  field={field}
                  errors={errors}
                />
              );
            }}
          </FastField>
        );
      })}
    </>
  );
}

function Formik({
  initialValues,
  onSuccess,
  validationSchema,
  fieldDetailsArray,
  formFooterArray,
  classNames,
}: FormikProps) {
  const [isFormSubmittedOnce, setIsFormSubmittedOnce] = useState(false);
  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: CommonObjectType, formikHelpers: any) => {
      try {
        await formikHelpers.validateForm();
        onSuccess({ values });
      } catch (e) {
        console.error(e, "Form Error");
      }
    },
    [onSuccess]
  );

  return (
    <MUIFormik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnBlur={isFormSubmittedOnce}
      validateOnChange={isFormSubmittedOnce}
    >
      {({ setFieldValue, errors, handleSubmit }) => {
        return (
          <Form
            onSubmit={(values) => {
              setIsFormSubmittedOnce(true);
              handleSubmit(values);
            }}
          >
            <Stack
              stackProps={{
                className: constructClassName([
                  classNames?.formItemParentClassName || "",
                  "w-full gap-12 flex-col flex-wrap items-center md:flex-row md:gap-12 items-start",
                ]),
              }}
            >
              <FormikForm
                errors={errors as CommonObjectType}
                setFieldValue={setFieldValue}
                fieldDetailsArray={fieldDetailsArray}
              />
            </Stack>
            {formFooterArray?.map((fieldDetail, idx) => {
              return (
                <Stack
                  stackProps={{
                    className: constructClassName([
                      classNames?.formFooterClassName || "",
                      "gap-8 m-4",
                    ]),
                  }}
                  key={`${idx}-form-footer`}
                >
                  <Button {...fieldDetail} />
                </Stack>
              );
            })}
          </Form>
        );
      }}
    </MUIFormik>
  );
}

export default Formik;
