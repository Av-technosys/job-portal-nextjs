import { COMPANY_REVIEW_CONFIG } from "@/constants";
import { Container, NextImage, Paper, Stack, Typography } from "../common";
import { AboutUs3 } from "@/assets";
import { colorStyles } from "@/styles";

function CompanyReview() {
  const { TITLE_TEXT, NAME_TEXT, JOB_TITLE_TEXT, REIVEW_TEXT } =
    COMPANY_REVIEW_CONFIG;
  return (
    <>
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          className: "my-12 p-4 max-w-7xl mx-auto",
        }}
      >
        <Container
          containerProps={{
            maxWidth: "lg",
            className:
              "flex justify-center  items-center w-full lg:w-1/2 px-6 lg:px-0",
          }}
        >
          <Stack
            stackProps={{
              direction: "column",
              gap: 4,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {/* Title */}
            <Typography {...TITLE_TEXT} />

            {/* Name & Job Section */}
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Vertical Line */}
              <Stack
                stackProps={{
                  className: "w-1 h-10 md:h-12",
                  sx: {
                    bgcolor: colorStyles.listTitleBackgroundColor1,
                  },
                }}
              />
              {/* Name & Job Title */}
              <Stack
                stackProps={{
                  direction: "column",
                  gap: 0.5,
                }}
              >
                <Typography {...NAME_TEXT} />
                <Typography {...JOB_TITLE_TEXT} />
              </Stack>
            </Stack>

            {/* Review / Description */}
            <Typography {...REIVEW_TEXT} />
          </Stack>
        </Container>

        <Stack stackProps={{ className: "w-full h-96" }}>
          <NextImage
            props={{
              alt: "AboutUs2",
              src: AboutUs3,
              width: 400,
              height: 300,
              className: "w-full   h-full object-cover ",
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}
export default CompanyReview;
