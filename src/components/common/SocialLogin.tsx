import { useMemo } from "react";
import IconButton from "./IconButton";
import Stack from "./Stack";
import { FacebookIcon, GoogleIcon, InstagramIcon, TwitterIcon } from "@/assets";
import { useSSOAuth } from "@/services";
import { SSO_REDIRECT_URL } from "@/constants";

function SocialLogin({
  callbackUrl = SSO_REDIRECT_URL,
}: {
  callbackUrl: string;
}) {
  const { facebookSignIn, googleSignIn, instagramSignIn, twitterSignIn } =
    useSSOAuth();

  const socialLoginMap = useMemo(() => {
    const commonStyles = {
      fontSize: "40px",
      color: "white",
    };

    return [
      {
        key: "facebook-sso",
        icon: <FacebookIcon sx={commonStyles} />,
      },
      {
        key: "google-sso",
        icon: <GoogleIcon sx={commonStyles} />,
      },
      {
        key: "instagram-sso",
        icon: <InstagramIcon sx={commonStyles} />,
      },
      {
        key: "twitter-sso",
        icon: <TwitterIcon sx={commonStyles} />,
      },
    ];
  }, []);

  function handleSSOClick(key: string) {
    switch (key) {
      case "facebook-sso":
        facebookSignIn({
          callbackUrl,
        });
        break;
      case "google-sso":
        googleSignIn({
          callbackUrl,
        });
        break;
      case "instagram-sso":
        instagramSignIn({
          callbackUrl,
        });
        break;
      case "twitter-sso":
        twitterSignIn({
          callbackUrl,
        });
        break;
    }
  }

  return (
    <>
      <Stack
        stackProps={{
          direction: "row",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {socialLoginMap?.map(({ key, icon }) => {
          return (
            <IconButton
              key={`socialLoginMap-${key}`}
              onClick={() => handleSSOClick(key)}
            >
              {icon}
            </IconButton>
          );
        })}
      </Stack>
    </>
  );
}

export default SocialLogin;
