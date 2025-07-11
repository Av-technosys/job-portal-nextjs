import React, { useMemo } from "react";
import {
  Stack,
  Typography,
  NextImage,
  Divider,
  TextWithIcon,
} from "@/components/common"; // Adjust the path for your common components
import {
  EmailIcon,
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  LocationOnIcon,
  PhoneIcon,
  TwitterIcon,
  JA_LOGO_white,
} from "@/assets";
import {
  FOOTER_CONTENT,
  FOOTER_QUICK_LINKS_MENU,
  JOB_SEEKER_MENU,
  RECRUITER_MENU,
  SUPPORT_MENU,
} from "@/constants";
import { constructClassName } from "@/helper";
import { colorStyles, useThemeContext } from "@/styles";

const Footer: React.FC = () => {
  const { theme } = useThemeContext();

  const {
    COPYRIGHT_TEXT,
    FOLLOW_US_TEXT,
    LOCATION_TEXT,
    CONTACT_TEXT,
    EMAIL_TEXT,
  } = FOOTER_CONTENT;
  const { QUICK_LINKS_TEXT, HOME_TEXT, ABOUT_US_TEXT } =
    FOOTER_QUICK_LINKS_MENU;
  const {
    JOB_SEEKER_TEXT,
    SEARCH_JOB_TEXT,
    SEARCH_RECRUITER_TEXT,
    JOBSEERKER_DASHBOARD_TEXT,
    SAVED_JOBS_TEXT,
  } = JOB_SEEKER_MENU;
  const {
    POST_JOB_TEXT,
    SEARCH_JOBSEEKER_TEXT,
    RECUITER_DASHBOARD_TEXT,
    APPLICATION_TEXT,
    RECRUITER_TEXT,
  } = RECRUITER_MENU;
  const {
    SUPPORT_TEXT,
    CONTACT_US_TEXT,
    PRIVACY_POLICY_TEXT,
    TERMS_CONDITION_TEXT,
  } = SUPPORT_MENU;
  const FooterContacts = useMemo(() => {
    return [
      {
        icon: (
          <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        textProps: LOCATION_TEXT,
      },
      {
        icon: <EmailIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        textProps: CONTACT_TEXT,
      },
      {
        icon: <PhoneIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        textProps: EMAIL_TEXT,
      },
    ];
  }, [LOCATION_TEXT, CONTACT_TEXT, EMAIL_TEXT]);
  return (
    <footer
      className={constructClassName(["w-full"])}
      style={{
        zIndex: theme.zIndex.drawer + 2,
      }}
    >
      {/* Main Stack  */}
      <Stack
        stackProps={{
          gap: 5,
          className: "p-8 md:p-16 cursor-pointer ",
          sx: {
            backgroundColor: colorStyles.footerBackgroundColor,
          },
        }}
      >
        {/* Internal stack */}
        <Stack
          stackProps={{
            direction: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
          }}
        >
          <Stack
            stackProps={{
              width: { xs: "100%", md: "40%" },
              gap: { xs: 2, md: 6 },
            }}
          >
            <NextImage
              props={{
                className: "-mt-4",
                alt: "ja_logo",
                src: JA_LOGO_white,
              }}
            />
          </Stack>
          <Stack
            stackProps={{
              gap: { xs: 2, md: 0 },
              direction: { xs: "column", md: "row" },
              width: "100%",
              justifyContent: { xs: "center", md: "space-around" },
            }}
          >
            <Stack
              stackProps={{
                gap: { xs: 1, md: 2 },
              }}
            >
              <Typography {...QUICK_LINKS_TEXT} />
              <Typography {...HOME_TEXT} />
              <Typography {...ABOUT_US_TEXT} />
            </Stack>
            <Stack
              stackProps={{
                gap: { xs: 1, md: 2 },
              }}
            >
              <Typography {...JOB_SEEKER_TEXT} />
              <Typography {...SEARCH_JOB_TEXT} />
              <Typography {...SEARCH_RECRUITER_TEXT} />
              <Typography {...JOBSEERKER_DASHBOARD_TEXT} />
              <Typography {...SAVED_JOBS_TEXT} />
            </Stack>
            <Stack
              stackProps={{
                gap: { xs: 1, md: 2 },
              }}
            >
              <Typography {...RECRUITER_TEXT} />
              <Typography {...POST_JOB_TEXT} />
              <Typography {...SEARCH_JOBSEEKER_TEXT} />
              <Typography {...RECUITER_DASHBOARD_TEXT} />
              <Typography {...APPLICATION_TEXT} />
            </Stack>
            <Stack
              stackProps={{
                gap: { xs: 1, md: 2 },
              }}
            >
              <Typography {...SUPPORT_TEXT} />
              <Typography {...CONTACT_US_TEXT} />
              <Typography {...PRIVACY_POLICY_TEXT} />
              <Typography {...TERMS_CONDITION_TEXT} />
            </Stack>
          </Stack>
        </Stack>
        <Stack
          stackProps={{
            direction: "row",
            gap: 2,
          }}
        >
          <Stack>
            <Typography {...FOLLOW_US_TEXT} />
          </Stack>
          <Stack
            stackProps={{
              direction: "row",
              gap: 1,
            }}
          >
            <FacebookIcon sx={{ color: colorStyles.white }} />
            <GoogleIcon sx={{ color: colorStyles.white }} />
            <InstagramIcon sx={{ color: colorStyles.white }} />
            <TwitterIcon sx={{ color: colorStyles.white }} />
          </Stack>
        </Stack>

        <Divider
          sx={{
            backgroundColor: colorStyles.filterTagsTextColor,
          }}
        />
        <Stack
          stackProps={{
            gap: { xs: 2, md: 0 },
            direction: { xs: "column", md: "row" },
            justifyContent: { md: "space-between" },
            sx: { backgroundColor: colorStyles.footerBackgroundColor },
          }}
        >
          <Typography {...COPYRIGHT_TEXT} />
          <Stack
            stackProps={{
              direction: { xs: "column", md: "row" },
              gap: { xs: 1, md: 3 },
            }}
          >
            {FooterContacts.map((detail, index) => (
              <TextWithIcon
                key={`FooterContacts-${index}`}
                icon={detail.icon}
                textProps={detail.textProps}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </footer>
  );
};

export default Footer;
