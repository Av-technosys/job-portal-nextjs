import {
  CONTACT_US_PAGE_CONFIG,
  LEFT_SECTION_CONFIG,
} from "@/constants/contactUs";
import {
  Button,
  Container,
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

function ContactUs() {
  const {
    TITLE_TEXT,
    SUB_TITLE_TEXT,
    FIRST_NAME_FIELD,
    LAST_NAME_FIELD,
    EMAIL_FIELD,
    CONTACT_FIELD,
    SUBJECT_FIELD,
    MESSAGE_FIELD,
    SEND_BUTTON,
  } = CONTACT_US_PAGE_CONFIG;

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

  return (
    <>
      <div>
        <Stack
          stackProps={{
            className: "h-screen",
            direction: "row",
            justifyContent: "space-between",
            gap: 16,
            width: "100%",
          }}
        >
          <Stack
            stackProps={{
              width: "100vw",
            }}
          >
            <Container
              containerProps={{
                maxWidth: "lg",
                className: "h-screen flex justify-center items-center mt-10",
              }}
            >
              <Paper
                paperProps={{
                  className: "p-4 w-full shadow-none",
                }}
              >
                <Stack
                  stackProps={{
                    className: "mt-10 mb-10",
                    gap: 2,
                    direction: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography {...TITLE_TEXT} />
                  <Typography {...SUB_TITLE_TEXT} />
                </Stack>
                <Stack
                  stackProps={{
                    direction: "row",
                    flexWrap: "wrap",
                    width: "100%",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <Stack
                    stackProps={{
                      className: "rounded-lg p-10",
                      sx: {
                        bgcolor: colorStyles.footerBackgroundColor,
                      },
                    }}
                  >
                    {/* left section */}
                    <Stack
                      stackProps={{
                        gap: 10,
                        direction: "column",
                        alignItems: "start",
                      }}
                    >
                      <Stack
                        stackProps={{
                          className: "",
                          width: "100%",
                          gap: 2,
                        }}
                      >
                        <Typography {...HEADER_TEXT} />
                        <Typography {...SUB_TITLE_TEXT2} />
                      </Stack>
                      <Stack
                        stackProps={{
                          className: "mb-6",
                          gap: 4,
                          justifyContent: "space-between",
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
                  {/* form */}
                  <form>
                    <Stack
                      stackProps={{
                        className: "ml-2",
                        paddingTop: "16px",
                        gap: 6,
                        direction: "column",
                        alignContent: "space-around",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                      }}
                    >
                      <Stack
                        stackProps={{
                          direction: "row",
                          gap: 4,
                          display: "flex",
                        }}
                      >
                        <Input {...FIRST_NAME_FIELD} />
                        <Input {...LAST_NAME_FIELD} />
                      </Stack>
                      <Stack
                        stackProps={{
                          direction: "row",
                          gap: 4,
                          display: "flex",
                        }}
                      >
                        <Input {...EMAIL_FIELD} />
                        <Input {...CONTACT_FIELD} />
                      </Stack>
                      <Input {...SUBJECT_FIELD} />
                      <Input {...MESSAGE_FIELD} />
                    </Stack>
                    <Stack
                      stackProps={{
                        marginTop: 8,
                        direction: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button {...SEND_BUTTON} />
                    </Stack>
                  </form>
                </Stack>
              </Paper>
            </Container>
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default ContactUs;
