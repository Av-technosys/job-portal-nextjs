import {
  FORGOT_PASSWORD,
  LANDING_URL,
  LOCAL_STORAGE_KEY,
  ADMIN_LOGIN_PAGE_CONFIG,
  BACK_TO_ADMIN_URL,
  ADMIN_REGISTER_URL,
} from "@/constants";
import {
  Checkbox,
  Container,
  Input,
  Link,
  LoadingButton,
  NextImage,
  Paper,
  Stack,
  Typography,
} from "../common";
import { useRouter } from "next/router";
import { loginValidationSchema } from "@/validator";
import {
  useForm,
  useNotification,
  useScreen,
  useValidateUser,
} from "@/services";
import {
  clearAllCookie,
  getErrorConfig,
  getErrorMessageFromAPI,
  setItem,
} from "@/helper";
import { CommonObjectType } from "@/types";
import { JA_LOGO } from "@/assets";

function AdminLogin() {
  const {
    HEADER_TEXT,
    SUB_TITLE_TEXT,
    EMAIL_FIELD,
    PASSWORD_FIELD,
    LOGIN_BUTTON,
    CREATE_ACCOUNT_LINK,
    FORGOT_PASSWORD_LINK,
    NOTIFICATION_CONFIG,
  } = ADMIN_LOGIN_PAGE_CONFIG;

  const router = useRouter();
  const { showNotification } = useNotification();
  const { isExtraSmallScreen } = useScreen();

  const validateUser = useValidateUser({
    mutationConfig: {
      onSuccess: (res) => {
        if (res?.data?.token) {
          showNotification(NOTIFICATION_CONFIG.SUCCESS);
          setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res?.data?.token as string);
          router.push(BACK_TO_ADMIN_URL);
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
    clearAllCookie();
    validateUser.mutate({
      data: {
        email: values.email as string,
        password: values.password as string,
      },
    });
  }

  const { onChange, onBlur, onSubmit, errorObj } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
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
                flexWrap: "wrap",
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
                    gap: 4,
                    direction: "column",
                  }}
                >
                  <Typography {...HEADER_TEXT()} />

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
                      {...CREATE_ACCOUNT_LINK({
                        onClick: () => router.push(ADMIN_REGISTER_URL),
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
                      {...EMAIL_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      {...getErrorConfig(errorObj, "email")}
                    />
                    <Input
                      {...PASSWORD_FIELD}
                      onChange={onChange}
                      onBlur={onBlur}
                      {...getErrorConfig(errorObj, "password")}
                    />
                    <Stack
                      stackProps={{
                        direction: "row",
                        gap: "12px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Checkbox
                        formControlLabelProps={{
                          label: "Remember Me",
                          control: <input type="checkbox" />,
                        }}
                      />
                      <Link
                        {...FORGOT_PASSWORD_LINK({
                          onClick: () => router.push(FORGOT_PASSWORD),
                        })}
                      />
                    </Stack>
                    <LoadingButton
                      {...LOGIN_BUTTON}
                      loading={validateUser?.isPending}
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

export default AdminLogin;
