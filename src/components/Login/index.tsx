import {
  ADMIN_URL,
  FORGOT_PASSWORD,
  LANDING_URL,
  LOCAL_STORAGE_KEY,
  LOGIN_PAGE_CONFIG,
  PROFILE_URL,
  REGISTER_URL,
  SSO_REDIRECT_URL,
} from "@/constants";
import {
  Checkbox,
  Container,
  Divider,
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
import { loginValidationSchema } from "@/validator";
import {
  useForm,
  getUserDetails,
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
import { CommonObjectType, UserType } from "@/types";
import { JA_LOGO } from "@/assets";

function Login() {
  const {
    HEADER_TEXT,
    SUB_TITLE_TEXT,
    EMAIL_FIELD,
    PASSWORD_FIELD,
    LOGIN_BUTTON,
    CREATE_ACCOUNT_LINK,
    FORGOT_PASSWORD_LINK,
    NOTIFICATION_CONFIG,
    SIGN_IN_DIVIDER_CONFIG,
  } = LOGIN_PAGE_CONFIG;

  const router = useRouter();
  const { showNotification } = useNotification();
  const { isExtraSmallScreen } = useScreen();

  const showAdminVerificationNotification = () => {
    showNotification(NOTIFICATION_CONFIG.ADMIN_VERIFICATION_REQUIRED);
  };

  const isAdminVerificationError = (error: unknown) => {
    const errorMessage = getErrorMessageFromAPI(error)?.message?.toLowerCase();
    return (
      errorMessage?.includes("active") ||
      errorMessage?.includes("activate") ||
      errorMessage?.includes("verified") ||
      errorMessage?.includes("verification") ||
      errorMessage?.includes("admin")
    );
  };

  const validateUser = useValidateUser({
    mutationConfig: {
      onSuccess: async (res) => {
        if (res?.data?.token) {
          const accessToken = res?.data?.token as string;
          setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);

          const userDetails = await getUserDetails(accessToken, false);
          const isRecruiterNotActivated =
            userDetails?.data?.user_type?.toString() ===
              UserType.RECUITER_TYPE && userDetails?.data?.is_active === false;

          if (isRecruiterNotActivated) {
            clearAllCookie();
            showAdminVerificationNotification();
            return;
          }

          showNotification(NOTIFICATION_CONFIG.SUCCESS);
          setItem(
            LOCAL_STORAGE_KEY.CURRENT_USER_TYPE,
            userDetails?.data?.user_type as string
          );
          setItem(
            LOCAL_STORAGE_KEY.CURRENT_ACCESS_TYPE,
            userDetails?.data?.access_type as string
          );

          const redirectUrl =
            userDetails?.data?.user_type?.toString() === UserType.ADMIN_TYPE
              ? ADMIN_URL
              : PROFILE_URL;

          router.push(redirectUrl);
        }
      },
      onError: (error) => {
        if (isAdminVerificationError(error)) {
          showAdminVerificationNotification();
          return;
        }

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
                        onClick: () => router.push(REGISTER_URL),
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
                      {/* <Checkbox
                        formControlLabelProps={{
                          label: "Remember Me",
                          control: <input type="checkbox" />,
                        }}
                      /> */}

                      <Checkbox
                        key={`remember-me`}
                        label={"Remember Me"}
                        name="datePosted"
                        value={"remember-me"}
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
                <Stack stackProps={{ className: "my-3" }}>
                  <Divider {...SIGN_IN_DIVIDER_CONFIG} />
                </Stack>
                <SocialLogin callbackUrl={`${SSO_REDIRECT_URL}`} />
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

export default Login;
