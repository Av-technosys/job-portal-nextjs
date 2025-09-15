import {
  CONTACT_FORM_CONFIG,
  LEFT_SECTION_CONFIG,
} from "@/constants/contactUs";
import {
  Button,
  Container,
  Formik,
  Input,
  Paper,
  SocialLogin,
  Stack,
  TextWithIcon,
  Typography,
} from "../common";
import { colorStyles } from "@/styles";
import { useMemo } from "react";
import { EmailIcon, LocationOnIcon, PhoneIcon } from "@/assets";
import { SSO_REDIRECT_URL } from "@/constants";
import { contactUsFormSchema } from "@/validator/contactUs";
import { useCreateContactUsInfo } from "@/services/useCreateContactUs";
import { useNotification } from "@/services";
import { getErrorMessageFromAPI } from "@/helper";

export interface contactFormData {
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  message: string;
  subject: string;
}

function ContactUs() {
  const { TITLE_TEXT, SUB_TITLE_TEXT, NOTIFICATION_CONFIG } =
    CONTACT_FORM_CONFIG;
  const { showNotification } = useNotification();

  const {
    FIRST_NAME_FIELD,
    LAST_NAME_FIELD,
    EMAIL_FIELD,
    CONTACT_NUMBER_FIELD,
    SUBJECT_FIELD,
    MESSAGE_FIELD,
    SEND_BUTTON,
  } = CONTACT_FORM_CONFIG.FORM_CONFIG;

  const { HEADER_TEXT, SUB_TITLE_TEXT2, LOCATION, EMAIL, CONTACT } =
    LEFT_SECTION_CONFIG;

  const companyContact = useMemo(() => {
    return [
      {
        icon: <PhoneIcon sx={{ color: colorStyles.white }} />,
        textProps: CONTACT,
      },
      {
        icon: <EmailIcon sx={{ color: colorStyles.white }} />,
        textProps: EMAIL,
      },
      {
        icon: <LocationOnIcon sx={{ color: colorStyles.white }} />,
        textProps: LOCATION,
      },
    ];
  }, [CONTACT, EMAIL, LOCATION]);

  const CreateContactUsInfoMutate = useCreateContactUsInfo({
    mutationConfig: {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.SUCCESS);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  function handleFormSuccess(values: any) {
    CreateContactUsInfoMutate.mutate({
      data: values.values as contactFormData,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Container
        containerProps={{
          maxWidth: "lg",
          className: "w-full py-12",
        }}
      >
        <Paper
          paperProps={{
            className: "p-6 md:p-10 shadow-lg rounded-lg",
          }}
        >
          {/* Title Section */}
          <Stack
            stackProps={{
              gap: 2,
              direction: "column",
              justifyContent: "center",
              alignItems: "center",
              className: "mb-10",
            }}
          >
            <Typography {...TITLE_TEXT} />
            <Typography {...SUB_TITLE_TEXT} />
          </Stack>

          {/* Main Layout */}
          <Stack
            stackProps={{
              direction: { xs: "column", md: "row" },
              gap: 6,
              width: "100%",
            }}
          >
            {/* Left Section */}
            <Stack
              stackProps={{
                className: "rounded-lg p-6 md:p-10 flex-1",
                sx: { bgcolor: colorStyles.footerBackgroundColor },
              }}
            >
              <Stack
                stackProps={{
                  gap: 8,
                  direction: "column",
                  alignItems: "start",
                }}
              >
                <Stack stackProps={{ gap: 2, width: "100%" }}>
                  <Typography {...HEADER_TEXT} />
                  <Typography {...SUB_TITLE_TEXT2} />
                </Stack>

                <Stack
                  stackProps={{
                    gap: 4,
                    className: "mb-6",
                  }}
                >
                  {companyContact.map((detail, index) => (
                    <TextWithIcon
                      key={`companyContact-${index}`}
                      icon={detail.icon}
                      textProps={detail.textProps}
                    />
                  ))}
                </Stack>

                <SocialLogin callbackUrl={`${SSO_REDIRECT_URL}`} />
              </Stack>
            </Stack>

            {/* Right Section (Form) */}
            <Stack
              stackProps={{
                className: "flex-1",
              }}
            >
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  phone_number: "",
                  subject: "",
                  message: "",
                }}
                onSuccess={handleFormSuccess}
                validationSchema={contactUsFormSchema}
                fieldDetailsArray={[
                  FIRST_NAME_FIELD,
                  LAST_NAME_FIELD,
                  EMAIL_FIELD,
                  CONTACT_NUMBER_FIELD,
                  SUBJECT_FIELD,
                  MESSAGE_FIELD,
                ]}
                formFooterArray={[SEND_BUTTON]}
              />
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}

export default ContactUs;
