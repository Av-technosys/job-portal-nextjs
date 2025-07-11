import { CommonObjectType, FormikFormProps } from "@/types";
import { FastField, FieldArray } from "formik";
import Stack from "./Stack";
import Dropdown from "./Dropdown";
import Input from "./Input";
import Button from "./Button";
import Typography from "./Typography";
import IconButton from "./IconButton";
import {
  DeleteOutline,
  FacebookIcon,
  GoogleIcon,
  PublicIcon,
  InstagramIcon,
  TwitterIcon,
  AddCircleOutlineIcon,
} from "@/assets";
import { getErrorConfig } from "@/helper";
import Divider from "./Divider";
import { useMemo } from "react";
import { colorStyles } from "@/styles";
import { SOCIAL_LINKS_CONFIG } from "@/constants";
import When from "./When";

function SocialLinksInput({
  field,
  errors,
  setFieldValue,
}: {
  field: CommonObjectType;
  errors?: CommonObjectType;
  setFieldValue: FormikFormProps["setFieldValue"];
}) {
  const {
    TITLE_TEXT,
    PLATFORM_DROPDOWN,
    FIELD_DIVIDER,
    URL_FIELD,
    ADD_MORE_BUTTON,
  } = SOCIAL_LINKS_CONFIG;

  const iconConfig = useMemo(() => {
    return {
      instagram: <InstagramIcon />,
      twitter: <TwitterIcon />,
      facebook: <FacebookIcon />,
      google: <GoogleIcon />,
      other: <PublicIcon />,
    } as Record<string, JSX.Element>;
  }, []);

  const fieldsHeight = 50;
  const parentFieldName = field?.name as string;
  const platformFieldName = "platform";
  const urlFieldName = "url";
  return (
    <FieldArray name={parentFieldName}>
      {({ push, remove }) => {
        return (
          <>
            {(field?.value as CommonObjectType[])?.map(
              (item: CommonObjectType, fieldIdx: number) => {
                const fieldArrayError = errors?.[
                  parentFieldName
                ] as CommonObjectType[];
                const errorObj = fieldArrayError?.[fieldIdx];
                const arrayFieldName = `${parentFieldName}.${fieldIdx}`;
                return (
                  <>
                    <Stack
                      stackProps={{
                        width: "100%",
                      }}
                    >
                      <Typography {...TITLE_TEXT(fieldIdx + 1)} />
                      <Stack
                        stackProps={{
                          direction: "row",
                          spacing: 2,
                          height: fieldsHeight,
                        }}
                      >
                        <Stack
                          stackProps={{
                            width: "95%",
                            direction: "row",
                            spacing: 2,
                            border: `1px solid ${colorStyles.borderGreyColor}`,
                            borderRadius: 1,
                            height: fieldsHeight,
                            flexWrap: "wrap",
                          }}
                        >
                          <FastField
                            name={`${arrayFieldName}.${platformFieldName}`}
                          >
                            {() => {
                              return (
                                <Dropdown
                                  selectProps={{
                                    name: `${arrayFieldName}.${platformFieldName}`,
                                    sx: {
                                      minWidth: 140,
                                      height: fieldsHeight,
                                      margin: "0px 0px 0px 8px !important",
                                      "::before": {
                                        borderBottom: "none",
                                      },
                                      "::after": {
                                        borderBottom: "none",
                                      },
                                      ":hover::before": {
                                        borderBottom: "none !important",
                                      },
                                    },
                                  }}
                                  formControlProps={
                                    PLATFORM_DROPDOWN.formControlProps
                                  }
                                  {...getErrorConfig(
                                    errorObj,
                                    platformFieldName
                                  )}
                                  onChange={(event) => {
                                    setFieldValue(
                                      `${arrayFieldName}.${platformFieldName}` as string,
                                      (event?.target?.value || "") as string
                                    );
                                  }}
                                  value={item[platformFieldName] as string}
                                  options={PLATFORM_DROPDOWN?.options?.map(
                                    (item) => {
                                      return {
                                        ...item,
                                        icon: iconConfig[item.value as string],
                                      };
                                    }
                                  )}
                                />
                              );
                            }}
                          </FastField>
                          <Divider {...FIELD_DIVIDER} />
                          <FastField name={`${arrayFieldName}.${urlFieldName}`}>
                            {() => {
                              return (
                                <Input
                                  inputProps={{
                                    name: `${arrayFieldName}.${urlFieldName}`,
                                    ...URL_FIELD.inputProps,
                                  }}
                                  formControlProps={URL_FIELD.formControlProps}
                                  onChange={(event) =>
                                    setFieldValue(
                                      `${arrayFieldName}.${urlFieldName}`,
                                      event?.target?.value || ""
                                    )
                                  }
                                  {...getErrorConfig(errorObj, urlFieldName)}
                                  value={item[urlFieldName] as string}
                                />
                              );
                            }}
                          </FastField>
                        </Stack>
                        <When condition={fieldIdx !== 0}>
                          <IconButton onClick={() => remove(fieldIdx)}>
                            <DeleteOutline />
                          </IconButton>
                        </When>
                      </Stack>
                    </Stack>
                  </>
                );
              }
            )}
            <Button
              {...ADD_MORE_BUTTON(<AddCircleOutlineIcon />)}
              onClick={() =>
                push({
                  platform: "instagram",
                  url: "",
                })
              }
            />
          </>
        );
      }}
    </FieldArray>
  );
}

export default SocialLinksInput;
