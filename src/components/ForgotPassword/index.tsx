import {
  FORGOT_PASSWORD_CONFIG,
  LANDING_URL,
  RESET_PASSWORD,
} from "@/constants";
import {
  Container,
  Input,
  LoadingButton,
  NextImage,
  Paper,
  Stack,
  Typography,
} from "../common";
import { forgotPasswordEmailValidationSchema } from "@/validator";
import { useRouter } from "next/router";
import {
  useForm,
  useNotification,
  useForgotPasswordUser,
  useScreen,
} from "@/services";
import { getErrorConfig, getErrorMessageFromAPI } from "@/helper";
import { CommonObjectType, ShowNotificationProps } from "@/types";
import { JA_LOGO } from "@/assets";

function ForgotPassword() {
  const { HEADER_TEXT, EMAIL_FIELD, VERIFY_OTP_BUTTON, NOTIFICATION_CONFIG } =
    FORGOT_PASSWORD_CONFIG;

  const router = useRouter();
  const { showNotification } = useNotification();
  const { isExtraSmallScreen } = useScreen();
  const forgotPasswordUser = useForgotPasswordUser({
    mutationConfig: {
      onSuccess: (res) => {
        if (res?.success) {
          showNotification(
            NOTIFICATION_CONFIG.SUCCESS as ShowNotificationProps
          );
          router.push(
            {
              pathname: RESET_PASSWORD,
              query: { email: formValuesObj.email as string },
            },
            RESET_PASSWORD
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
    forgotPasswordUser.mutate({
      data: {
        email: values.email as string,
      },
    });
  }

  const { onChange, onBlur, onSubmit, errorObj, formValuesObj } = useForm({
    initialValues: {
      email: "",
    },
    validationSchema: () => {
      return forgotPasswordEmailValidationSchema;
    },
    onSuccess: handleFormSuccess,
  });

  const navigateToLanding = () => {
    router.push(LANDING_URL);
  };

  return (
    <>
      <div>
        <Stack
          stackProps={{
            className: "h-screen",
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
                className: "h-screen flex justify-center items-center mt-16",
              }}
            >
              <Paper
                paperProps={{
                  className: "p-4 w-full shadow-none",
                }}
              >
                <Stack
                  stackProps={{
                    className: "mb-8",
                    gap: 4,
                    direction: "column",
                  }}
                >
                  <Typography {...HEADER_TEXT()} />
                </Stack>

                <form autoComplete="off" onSubmit={onSubmit}>
                  <Stack
                    stackProps={{
                      paddingTop: "16px",
                      gap: "24px",
                    }}
                  >
                    <Input
                      {...EMAIL_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      {...getErrorConfig(errorObj, "email")}
                    />

                    <LoadingButton
                      {...VERIFY_OTP_BUTTON}
                      loading={forgotPasswordUser?.isPending}
                    />
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
export default ForgotPassword;
