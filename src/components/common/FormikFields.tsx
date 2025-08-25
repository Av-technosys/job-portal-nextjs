import {
  ButtonProps,
  CheckBoxProps,
  CommonObjectType,
  dayjsInstance,
  FormikArrayFieldProps,
  FormikFieldsEnum,
  FormikFormProps,
  TypographyProps,
  UploadDocumentProps,
} from "@/types";
import DatePicker from "./DatePicker";
import Input from "./Input";
import When from "./When";
import { FieldArray } from "formik";
import Dropdown from "./Dropdown";
import Typography from "./Typography";
import UploadProfilePic from "./UploadProfilePic";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { FormikForm } from "./Formik";
import Button from "./Button";
import { constructClassName } from "@/helper";
import { Stack, UploadDocument } from ".";
import { FormControl, FormHelperText } from "@mui/material";
import SocialLinksInput from "./SocialLinksInput";
import CheckBox from "./Checkbox";
import UploadQuestionPic from "./UploadQuestionPic";

function FormikFields({
  fieldType = FormikFieldsEnum.TEXT_FIELD,
  setFieldValue,
  field,
  errors,
  ...rest
}: {
  fieldType?: FormikFieldsEnum;
  setFieldValue: FormikFormProps["setFieldValue"];
  field: CommonObjectType;
  errors?: CommonObjectType;
}) {
  return (
    <>
      <When condition={fieldType === FormikFieldsEnum.DATE_PICKER}>
        <DatePicker
          {...rest}
          onChange={(newValue) => {
            setFieldValue(field?.name as string, newValue as dayjsInstance);
          }}
          value={field.value as dayjsInstance}
        />
      </When>
      <When condition={fieldType === FormikFieldsEnum.TEXT_FIELD}>
        <Input
          {...rest}
          onChange={(event) =>
            setFieldValue(field?.name as string, event?.target?.value || "")
          }
          value={field.value as string}
        />
      </When>
      <When condition={fieldType === FormikFieldsEnum.DROPDOWN}>
        <Dropdown
          {...rest}
          onChange={(event) => {
            setFieldValue(
              field?.name as string,
              (event?.target?.value || "") as string
            );
          }}
          value={field.value as string}
        />
      </When>
      <When condition={fieldType === FormikFieldsEnum.TYPOGRAPHY}>
        <Typography {...(rest as TypographyProps)} />
      </When>
      <When condition={fieldType === FormikFieldsEnum.UPLOAD_PROFILE_IMAGE}>
        <UploadProfilePic />
      </When>
      <When condition={fieldType === FormikFieldsEnum.UPLOAD_QUESTION_IMAGE}>
        <UploadQuestionPic />
      </When>
      <When condition={fieldType === FormikFieldsEnum.MULTI_SELECT_DROPDOWN}>
        <MultiSelectDropdown
          {...rest}
          onChange={(event) => {
            setFieldValue(
              field?.name as string,
              (event?.target?.value || []) as string[]
            );
          }}
          value={field.value as string[]}
        />
      </When>
      <When condition={fieldType === FormikFieldsEnum.SOCIAL_URL_INPUT}>
        <SocialLinksInput
          field={field}
          errors={errors}
          setFieldValue={setFieldValue}
        />
      </When>
      <When condition={fieldType === FormikFieldsEnum.ARRAY_FIELD}>
        <FieldArray name={field?.name as string}>
          {({ push, remove }) => {
            const {
              childFieldArray = [],
              initialValue,
              addMoreButtonProps,
              removeExtraProps,
              removeButtonProps,
              arrayFormItemParentClassName = "",
              hideFirstRemoveButton = false,
            } = rest as FormikArrayFieldProps;
            const fieldArrayError = errors?.[`${field?.name}`] as
              | CommonObjectType[]
              | string;
            return (
              <>
                <When
                  condition={(field?.value as CommonObjectType[])?.length !== 0}
                >
                  <Stack
                    stackProps={{
                      className: constructClassName([
                        (arrayFormItemParentClassName as string) || "",
                        "w-full gap-6 flex-col flex-wrap items-center md:flex-row md:gap-6",
                      ]),
                    }}
                  >
                    {(field?.value as CommonObjectType[])?.map((_, idx) => {
                      let showRemoveButton = removeButtonProps !== undefined;
                      if (hideFirstRemoveButton && idx === 0)
                        showRemoveButton = false;
                      return (
                        <>
                          <FormikForm
                            fieldDetailsArray={childFieldArray}
                            setFieldValue={setFieldValue}
                            errors={
                              (fieldArrayError as CommonObjectType[])?.[idx]
                            }
                            parentFieldName={`${field?.name}.${idx}`}
                          />
                          <When condition={showRemoveButton}>
                            <When condition={removeExtraProps !== undefined}>
                              <Typography {...removeExtraProps} />
                            </When>
                            <Button
                              {...(removeButtonProps as ButtonProps)}
                              onClick={() => {
                                remove(idx);
                              }}
                            />
                          </When>
                        </>
                      );
                    })}
                  </Stack>
                </When>
                <When condition={typeof fieldArrayError === "string"}>
                  <FormControl error={true} className="w-full">
                    <FormHelperText>{`${fieldArrayError}`}</FormHelperText>
                  </FormControl>
                </When>
                <When condition={addMoreButtonProps !== undefined}>
                  <Button
                    {...(addMoreButtonProps as ButtonProps)}
                    onClick={() => {
                      if (initialValue instanceof Function)
                        push(initialValue());
                      else push(initialValue);
                    }}
                  />
                </When>
              </>
            );
          }}
        </FieldArray>
      </When>
      <When condition={fieldType === FormikFieldsEnum.CHECKBOX}>
        <CheckBox
          {...(rest as CheckBoxProps)}
          onChange={(event) => {
            setFieldValue(
              field?.name as string,
              event?.target?.checked || false
            );
          }}
          checked={field.value as boolean}
        />
      </When>
      <When condition={fieldType === FormikFieldsEnum.UPLOAD_DOCUMENT}>
        <UploadDocument {...(rest as UploadDocumentProps)} />
      </When>
    </>
  );
}

export default FormikFields;
