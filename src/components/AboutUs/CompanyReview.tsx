import { COMPANY_REVIEW_CONFIG } from "@/constants";
import { Container, NextImage, Paper, Stack, Typography } from "../common";
import { AboutUs2 } from "@/assets";
import { colorStyles } from "@/styles";

function CompanyReview() {
  const { TITLE_TEXT, NAME_TEXT, JOB_TITLE_TEXT, REIVEW_TEXT } =
    COMPANY_REVIEW_CONFIG;
  return (
    <>
      <Stack
        stackProps={{
          className: "mt-12",
          direction: "row",
          justifyContent: "space-between",
          width: "100%",
          sx: {
            bgcolor: colorStyles.listTitleBackgroundColor,
          },
        }}
      >
        <Stack
          stackProps={{
            className: " ml-8",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <NextImage
            props={{
              alt: "AboutUs2",
              src: AboutUs2,
              width: 550,
              height: 100,
            }}
          />
        </Stack>
        <Container
          containerProps={{
            maxWidth: "lg",
            className: "flex justify-center items-center",
          }}
        >
          <Paper
            paperProps={{
              className: "p-4 w-full shadow-none ",
            }}
          >
            <Stack
              stackProps={{
                direction: "column",
                gap: 2,
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography {...TITLE_TEXT} />
              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                }}
              >
                <Stack
                  stackProps={{
                    className: "w-10 h-1 rotate-90",
                    sx: {
                      bgcolor: colorStyles.listTitleBackgroundColor1,
                    },
                  }}
                />
                <Stack>
                  <Typography {...NAME_TEXT} />
                  <Typography {...JOB_TITLE_TEXT} />
                </Stack>
              </Stack>
              <Typography {...REIVEW_TEXT} />
            </Stack>
          </Paper>
        </Container>
      </Stack>
    </>
  );
}
export default CompanyReview;
