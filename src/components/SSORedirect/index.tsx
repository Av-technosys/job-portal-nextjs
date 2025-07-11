import {
  LOCAL_STORAGE_KEY,
  PROFILE_URL,
  SSO_REDIRECT_CONFIG,
} from "@/constants";
import { SaveAltIcon } from "@/assets";
import { colorStyles } from "@/styles";
import { Container, Paper, Stack, Typography } from "../common";
import { useEffect } from "react";
import { SSOSessionProps } from "@/types";
import { setItem } from "@/helper";
import { useRouter } from "next/router";
import { useCommonDetails, useSSOSession } from "@/services";

function SSORedirect() {
  const { HEADER_TEXT, SUB_TITLE_TEXT } = SSO_REDIRECT_CONFIG.SUCCEESS;
  const { ssoData } = useSSOSession();
  const { refetchCommonDetails } = useCommonDetails();
  const router = useRouter();

  useEffect(() => {
    if ((ssoData as SSOSessionProps)?.accessToken) {
      setItem(
        LOCAL_STORAGE_KEY.ACCESS_TOKEN,
        (ssoData as SSOSessionProps).accessToken
      );
      refetchCommonDetails().then(() => {
        router.push(PROFILE_URL);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ssoData]);

  return (
    <Container
      containerProps={{
        maxWidth: "sm",
        className: "mt-4",
      }}
    >
      <Paper
        paperProps={{
          className: "p-4",
        }}
      >
        <Stack
          stackProps={{
            className: "items-center",
          }}
        >
          <SaveAltIcon style={{ fontSize: "90px", color: colorStyles.gold }} />
          <Typography {...HEADER_TEXT()} />
          <Typography {...SUB_TITLE_TEXT()} />
        </Stack>
      </Paper>
    </Container>
  );
}

export default SSORedirect;
