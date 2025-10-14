import {
  ADMIN_LOGIN_URL,
  ADMIN_REGISTRATION_PAGE_CONFIG,
  SSO_REDIRECT_URL,
  BACK_TO_ADMIN_URL,
  ADMIN_ENTER_OTP,
} from "@/constants";
import {
  Checkbox,
  Container,
  Divider,
  Dropdown,
  Input,
  Link,
  LoadingButton,
  NextImage,
  Paper,
  SocialLogin,
  Stack,
  Typography,
  When,
} from "../common";
import { useRouter } from "next/router";
import {
  jobSeekerRegistrationValidationSchema,
  recruiterRegistrationValidationSchema,
} from "@/validator";
import {
  useForm,
  useNotification,
  useRegisterUser,
  useScreen,
} from "@/services";
import {
  getErrorConfig,
  getErrorMessageFromAPI,
  isLoggedInUserJobSeeker,
} from "@/helper";
import { CommonObjectType, ShowNotificationProps, UserType } from "@/types";
import { useMemo } from "react";
import { JA_LOGO } from "@/assets";

function AdminRegistration() {
  const {
    HEADER_TEXT,
    SUB_TITLE_TEXT,
    USER_DROPDOWN_FIELD,
    FIRST_NAME_FIELD,
    EMAIL_FIELD,
    BUSINESS_EMAIL_FIELD,
    PASSWORD_FIELD,
    CONFIRM_PASSWORD_FIELD,
    MOBILE_NUMBER_FIELD,
    REGISTER_BUTTON,
    LOGIN_LINK,
    NOTIFICATION_CONFIG,
    SIGN_IN_DIVIDER_CONFIG,
  } = ADMIN_REGISTRATION_PAGE_CONFIG;

  const router = useRouter();
  const { showNotification } = useNotification();
  const { isExtraSmallScreen } = useScreen();

  const registerUser = useRegisterUser({
    mutationConfig: {
      onSuccess: (res) => {
        if (res?.success) {
          showNotification(
            NOTIFICATION_CONFIG.SUCCESS as ShowNotificationProps
          );
          router.push(
            {
              pathname: ADMIN_ENTER_OTP,
              query: { email: res?.data?.email as string },
            },
            ADMIN_ENTER_OTP
          );
        }
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  function handleFormSuccess({ values }: { values: CommonObjectType }) {
    registerUser.mutate({
      data: {
        first_name: values.name as string,
        user_type: Number(values.userType) as number,
        email: values.email as string,
        password: values.password as string,
        phone_number: values.mobileNumber.toString() as string,
      },
    });
  }

  const { onChange, onBlur, onSubmit, errorObj, formValuesObj, resetError } =
    useForm({
      initialValues: {
        userType: UserType.ADMIN_TYPE,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
      },
      validationSchema: () => {
        return isJobSeekerSelected
          ? jobSeekerRegistrationValidationSchema
          : recruiterRegistrationValidationSchema;
      },
      onSuccess: handleFormSuccess,
    });

  const isJobSeekerSelected = useMemo(() => {
    resetError();
    return isLoggedInUserJobSeeker({
      userType: formValuesObj?.userType as UserType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValuesObj?.userType]);
  const navigateToLanding = () => {
    router.push(BACK_TO_ADMIN_URL);
  };

  return (
    <>
      <div>
        <Stack
          stackProps={{
            direction: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Stack
            stackProps={{
              width: "90vw",
            }}
          >
            <Stack
              stackProps={{
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NextImage
                props={{
                  alt: "ja_logo",
                  src: JA_LOGO,
                  onClick: navigateToLanding,
                  style: { cursor: "pointer" },
                }}
              />
            </Stack>
            <Container
              containerProps={{
                maxWidth: "sm",
                className: "flex justify-center items-center",
              }}
            >
              <Paper
                paperProps={{
                  className: "p-4 w-full shadow-none",
                }}
              >
                <Stack>
                  <Stack
                    stackProps={{
                      gap: 2,
                      direction: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography {...HEADER_TEXT()} />
                    <Dropdown
                      {...USER_DROPDOWN_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={formValuesObj?.userType as string}
                      {...getErrorConfig(errorObj, "userType")}
                    />
                  </Stack>
                  <Stack
                    stackProps={{
                      direction: "row",
                      gap: 1,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography {...SUB_TITLE_TEXT()} />

                    <Link
                      {...LOGIN_LINK({
                        onClick: () => router.push(ADMIN_LOGIN_URL),
                      })}
                    />
                  </Stack>
                </Stack>
                <form autoComplete="off" onSubmit={onSubmit}>
                  <Stack
                    stackProps={{
                      paddingTop: "16px",
                      gap: "24px",
                    }}
                  >
                    <Input
                      {...FIRST_NAME_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      {...getErrorConfig(errorObj, "name")}
                    />
                    <When condition={isJobSeekerSelected}>
                      <Input
                        {...EMAIL_FIELD}
                        onChange={onChange}
                        onBlur={onBlur}
                        {...getErrorConfig(errorObj, "email")}
                      />
                    </When>
                    <When condition={!isJobSeekerSelected}>
                      <Input
                        {...BUSINESS_EMAIL_FIELD}
                        onChange={onChange}
                        onBlur={onBlur}
                        {...getErrorConfig(errorObj, "email")}
                      />
                    </When>
                    <Input
                      {...PASSWORD_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      {...getErrorConfig(errorObj, "password")}
                    />
                    <Input
                      {...CONFIRM_PASSWORD_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      {...getErrorConfig(errorObj, "confirmPassword")}
                    />
                    <Input
                      {...MOBILE_NUMBER_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      {...getErrorConfig(errorObj, "mobileNumber")}
                    />
                    <Stack
                      stackProps={{
                        direction: "row",
                        gap: "12px",
                        divider: <span>|</span>,
                      }}
                    >
                      <Checkbox
                        formControlLabelProps={{
                          label: "I accept the Terms of Services",
                          control: <input type="checkbox" />,
                        }}
                      />
                    </Stack>
                    <LoadingButton
                      {...REGISTER_BUTTON}
                      loading={registerUser?.isPending}
                    />
                  </Stack>
                </form>
                <When condition={isJobSeekerSelected}>
                  <Divider {...SIGN_IN_DIVIDER_CONFIG} />
                  <SocialLogin callbackUrl={`${SSO_REDIRECT_URL}`} />
                </When>
              </Paper>
            </Container>
          </Stack>
          <div
            style={{
              width: isExtraSmallScreen ? "10vw" : "inherit",
            }}
            className={"auth-right-panel"}
          />
        </Stack>
      </div>
    </>
  );
}

export default AdminRegistration;
