import { RESET_PASSWORD_CONFIG, LOGIN_URL, LANDING_URL } from "@/constants";
import {
  Container,
  Input,
  LoadingButton,
  NextImage,
  Paper,
  Stack,
  Typography,
} from "../common";
import { useRouter } from "next/router";
import { forgotPasswordOtpAndPasswordValidationSchema } from "@/validator";
import {
  useForm,
  useNotification,
  useResetPasswordUser,
  useResendOtp,
  useScreen,
} from "@/services";
import { getErrorConfig, getErrorMessageFromAPI } from "@/helper";
import { CommonObjectType, ShowNotificationProps } from "@/types";
import { JA_LOGO } from "@/assets";

interface ResetPasswordProps {
  email: string;
}

function ResetPassword({ email }: ResetPasswordProps) {
  const {
    HEADER_TEXT,
    SUB_TITLE_TEXT_1,
    SUB_TITLE_TEXT_2,
    SUB_TITLE_TEXT_3,
    OTP_INPUT_FIELD,
    PASSWORD_FIELD,
    CONFIRM_PASSWORD_FIELD,
    RESET_PASSWORD_BUTTON,
    RESEND_OTP_BUTTON,
    NOTIFICATION_CONFIG,
    OTP_TEXT,
  } = RESET_PASSWORD_CONFIG;

  const router = useRouter();
  const { showNotification } = useNotification();
  const { isExtraSmallScreen } = useScreen();
  const resetPasswordUser = useResetPasswordUser({
    mutationConfig: {
      onSuccess: (res) => {
        if (res?.success) {
          showNotification(
            NOTIFICATION_CONFIG.SUCCESS as ShowNotificationProps
          );
          router.push(
            {
              pathname: LOGIN_URL,
            },
            LOGIN_URL
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
    resetPasswordUser.mutate({
      data: {
        email,
        email_otp: values.emailOtp.toString() as string,
        new_password: values.password as string,
        confirm_password: values.password as string,
      },
    });
  }

  const { onChange, onBlur, onSubmit, errorObj } = useForm({
    initialValues: {
      email: "",
      emailOtp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: forgotPasswordOtpAndPasswordValidationSchema,
    onSuccess: handleFormSuccess,
  });

  const resendOtp = useResendOtp({
    mutationConfig: {
      onSuccess: (res) => {
        if (res?.success) {
          showNotification(
            NOTIFICATION_CONFIG.RESEND_SUCCESS as ShowNotificationProps
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

  function handleResendOtp(event: React.MouseEvent) {
    event.preventDefault();
    resendOtp.mutate({ data: { email } });
  }
  const navigateToLanding = () => {
    router.push(LANDING_URL);
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
                className: "h-screen flex justify-center items-center",
              }}
            >
              <Paper
                paperProps={{
                  className: "p-4 w-full shadow-none",
                }}
              >
                <Stack
                  stackProps={{
                    gap: "4px",
                    direction: "column",
                  }}
                >
                  <Typography {...HEADER_TEXT()} />
                  <div>
                    <Typography {...SUB_TITLE_TEXT_1()} />
                    <Typography {...SUB_TITLE_TEXT_2({ email })} />
                    <Typography {...SUB_TITLE_TEXT_3()} />
                  </div>
                </Stack>
                <form autoComplete="off" onSubmit={onSubmit}>
                  <Stack
                    stackProps={{
                      paddingTop: "16px",
                      gap: "24px",
                    }}
                  >
                    <Input
                      {...OTP_INPUT_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      {...getErrorConfig(errorObj, "emailOtp")}
                    />

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
                    <LoadingButton
                      {...RESET_PASSWORD_BUTTON}
                      loading={resetPasswordUser?.isPending}
                    />
                    <Stack
                      stackProps={{
                        direction: "row",
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      <Typography {...OTP_TEXT()} />
                      <LoadingButton
                        {...RESEND_OTP_BUTTON}
                        onClick={handleResendOtp}
                        loading={resendOtp?.isPending}
                      />
                    </Stack>
                  </Stack>
                </form>
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

export default ResetPassword;
