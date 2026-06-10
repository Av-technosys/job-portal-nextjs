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
  FormikSkillsInputProps,
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
  values,
  parentFieldName,
}: FormikFormProps) {
  function getFieldName(
    fieldDetail:
      | FormikInputProps
      | FormikDatePickerProps
      | FormikDropdownProps
      | FormikMultiSelectDropdownProps
      | FormikSkillsInputProps
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
      case FormikFieldsEnum.SKILLS_INPUT:
        const { inputProps: skillsInputProps } =
          fieldDetail as FormikSkillsInputProps;
        fieldName = skillsInputProps?.name || "skillsInputFieldName";
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

  function getFieldDetailWithDependentOptions(
    fieldDetail:
      | FormikInputProps
      | FormikDatePickerProps
      | FormikDropdownProps
      | FormikMultiSelectDropdownProps
      | FormikSkillsInputProps
      | FormikArrayFieldProps
      | FormikSocialLinkInputProps
      | FormikCheckboxProps
      | FormikUploadDocumentProps
  ) {
    if (fieldDetail.fieldType !== FormikFieldsEnum.DROPDOWN) {
      return fieldDetail;
    }

    const dropdownFieldDetail = fieldDetail as DropdownProps;
    const dependentOptions = dropdownFieldDetail.dependentOptions;

    if (!dependentOptions) return fieldDetail;

    const dependentFieldValue = values?.[dependentOptions.fieldName] as string;
    const selectProps = (dropdownFieldDetail.selectProps || {}) as Record<string, unknown>;

    return {
      ...fieldDetail,
      options: dependentOptions.optionsByValue[dependentFieldValue] || [],
      selectProps: {
        ...selectProps,
        disabled: Boolean((selectProps as any).disabled) || !Boolean(dependentFieldValue),
      },
    } as typeof fieldDetail;
  }

  return (
    <>
      {fieldDetailsArray?.map((fieldDetail, idx) => {
        const resolvedFieldDetail =
          getFieldDetailWithDependentOptions(fieldDetail);

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
                    {...resolvedFieldDetail}
                    setFieldValue={setFieldValue}
                    field={field}
                    errors={errors}
                  />
                );
              }}
            </Field>
          );
        }

        const fieldName = getFieldName(resolvedFieldDetail);
      const isDependentDropdown =
        fieldDetail.fieldType === FormikFieldsEnum.DROPDOWN &&
        (fieldDetail as DropdownProps).dependentOptions;

      const FieldComponent = isDependentDropdown ? Field : FastField;
      return (
        <FieldComponent key={`${fieldName}_${idx}`} name={fieldName}>
          {({ field }: { field: CommonObjectType }) => {
            return (
              <FormikFields
                {...resolvedFieldDetail}
                {...getErrorConfig(errors, fieldName)}
                setFieldValue={setFieldValue}
                field={field}
                errors={errors}
              />
            );
          }}
        </FieldComponent>
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
      {({ setFieldValue, errors, handleSubmit, values }) => {
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
                  "w-full gap-6  flex-col flex-wrap items-center md:flex-row md:gap-6 items-start",
                ]),
              }}
            >
              <FormikForm
                errors={errors as CommonObjectType}
                setFieldValue={setFieldValue}
                values={values}
                fieldDetailsArray={fieldDetailsArray}
              />
            </Stack>
            <Stack
              stackProps={{
                className: constructClassName([
                  classNames?.formFooterClassName || "",
                  "flex flex-row justify-end mt-12 items-center space-x-4 ",
                ]),
              }}
            >
              {formFooterArray?.map((fieldDetail, idx) => (
                <Button key={idx} {...fieldDetail} />
              ))}
            </Stack>
          </Form>
        );
      }}
    </MUIFormik>
  );
}

export default Formik;
