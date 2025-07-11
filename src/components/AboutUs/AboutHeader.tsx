import { HEADER_PAGE_CONFIG } from "@/constants";
import { Container, NextImage, Paper, Stack, Typography } from "../common";
import { AboutUs1 } from "@/assets";

function AboutHeader() {
  const { HEADER_TEXT, TITLE_TEXT, SUB_TITLE_TEXT } = HEADER_PAGE_CONFIG;
  return (
    <>
      <Stack
        stackProps={{
          className: "mt-4",
          direction: "row",
          justifyContent: "space-between",
          width: "100%",
          gap: 4,
        }}
      >
        <Stack
          stackProps={{
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100vw",
          }}
        >
          <Container
            containerProps={{
              maxWidth: "lg",
              className: "flex justify-center items-center",
            }}
          >
            <Paper
              paperProps={{
                className: "p-4 w-full shadow-none",
              }}
            >
              <Stack
                stackProps={{
                  gap: 2,
                  direction: "column",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  width: "60%",
                }}
              >
                <Typography {...HEADER_TEXT} />
                <Typography {...TITLE_TEXT} />
                <Typography {...SUB_TITLE_TEXT} />
              </Stack>
            </Paper>
          </Container>
        </Stack>
        <Stack
          stackProps={{
            className: "mr-10",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <NextImage
            props={{
              alt: "AboutUs1",
              src: AboutUs1,
              width: 550,
              height: 40,
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default AboutHeader;
