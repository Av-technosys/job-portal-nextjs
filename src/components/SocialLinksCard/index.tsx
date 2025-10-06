import React from "react";
import { Stack, Typography, Link, When } from "../common";
import { colorStyles } from "@/styles";
import { JOB_DETAIL_PAGE_CONFIG } from "@/constants";
import {
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  PublicIcon,
  TwitterIcon,
} from "@/assets";
import { ApplicantSocialLinkProps } from "@/types";
import { useGetApplicantSocialLinks } from "@/services/useGetApplicantSocialLinks";

const SocialLinksCard = ({ userId }: ApplicantSocialLinkProps) => {
  const { SOCIAL_HANDLE } = JOB_DETAIL_PAGE_CONFIG;
  const ApplicantSocialLinksDetails = useGetApplicantSocialLinks({
    queryParams: {
      UserId: userId,
    },
  });

  const social_links = ApplicantSocialLinksDetails?.data?.data;

  const platformIconMap: Record<string, JSX.Element> = {
    instagram: <InstagramIcon />,
    twitter: <TwitterIcon />,
    facebook: <FacebookIcon />,
    google: <GoogleIcon />,
    other: <PublicIcon />,
  };

  return (
    <Stack
      stackProps={{
        className: "border-2 rounded-lg p-4",
        borderColor: colorStyles.filterTagsBackgroundColor,
        gap: 1,
      }}
    >
      <Typography {...SOCIAL_HANDLE} />

      {/* Render only if socialLinks exist */}
      <When condition={!!social_links}>
        <Stack
          stackProps={{
            className: "p-4",
            direction: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          {social_links?.map((link) => (
            <When
              key={`socialLinks-${link.id}`}
              condition={!!platformIconMap[link?.platform]}
            >
              <Link
                linkProps={{
                  href: link?.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }}
              >
                <Stack
                  stackProps={{
                    className: "cursor-pointer",
                  }}
                >
                  {platformIconMap[link.platform]}
                </Stack>
              </Link>
            </When>
          ))}
        </Stack>
      </When>
    </Stack>
  );
};

export default SocialLinksCard;
