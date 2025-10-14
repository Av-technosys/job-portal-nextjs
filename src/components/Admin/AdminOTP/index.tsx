import {
  ADMIN_LOGIN_URL,
  ADMIN_PROFILE_URL,
  LOCAL_STORAGE_KEY,
  OTP_PAGE_CONFIG,
} from "@/constants";
import {
  Container,
  Input,
  LoadingButton,
  Paper,
  Stack,
  Typography,
} from "../../common";
import { useRouter } from "next/router";
import { otpVerificationValidationSchema } from "@/validator";
import {
  useForm,
  useNotification,
  useResendOtp,
  useVerifyOtp,
} from "@/services";
import { getErrorConfig, getErrorMessageFromAPI, setItem } from "@/helper";
import { CommonObjectType, ShowNotificationProps } from "@/types";

interface OTPProps {
  email: string;
}

function AdminOTP({ email }: OTPProps) {
  const {
    HEADER_TEXT,
    SUB_TITLE_TEXT,
    NOTIFICATION_CONFIG,
    OTP_INPUT_FIELD,
    CONTINUE_BUTTON,
    RESEND_OTP_BUTTON,
  } = OTP_PAGE_CONFIG;

  const router = useRouter();
  const { showNotification } = useNotification();

  const verifyOtp = useVerifyOtp({
    mutationConfig: {
      onSuccess: (res) => {
        if (res?.data?.token) {
          showNotification(
            NOTIFICATION_CONFIG.SUCCESS as ShowNotificationProps
          );
          setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, res?.data?.token as string);
          router.push(ADMIN_LOGIN_URL);
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
    verifyOtp.mutate({
      data: {
        email,
        email_otp: values.emailOtp.toString() as string,
      },
    });
  }

  const { onChange, onBlur, onSubmit, errorObj } = useForm({
    initialValues: {
      emailOtp: "",
    },
    validationSchema: otpVerificationValidationSchema,
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
  return (
    <>
      <div>
        <Container
          containerProps={{
            maxWidth: "sm",
            className: "h-screen flex justify-center items-center",
          }}
        >
          <Paper
            paperProps={{
              className: "p-4 w-full",
            }}
          >
            <Stack
              stackProps={{
                gap: "4px",
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
                  {...OTP_INPUT_FIELD}
                  onChange={onChange}
                  onBlur={onBlur}
                  {...getErrorConfig(errorObj, "emailOtp")}
                />
                <Typography {...SUB_TITLE_TEXT()} />
                <LoadingButton
                  {...CONTINUE_BUTTON}
                  loading={verifyOtp?.isPending}
                />
              </Stack>
            </form>
            <br />
            <LoadingButton
              {...RESEND_OTP_BUTTON}
              onClick={handleResendOtp}
              loading={resendOtp?.isPending}
            />
          </Paper>
        </Container>
      </div>
    </>
  );
}

export default AdminOTP;
