import { PAGE_BODY_CONFIG } from "@/constants";
import { Container, NextImage, Paper, Stack, Typography } from "../common";
import { Video } from "@/assets";

function AboutBody() {
  const { BODY_TEXT_1, BODY_TEXT_2 } = PAGE_BODY_CONFIG;
  return (
    <>
      <Stack
        stackProps={{
          className: "max-w-7xl mx-auto",
          direction: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        <Stack
          stackProps={{
            className:
              "mb-8 w-full p-6 flex flex-col items-center justify-center",
          }}
        >
          <NextImage
            props={{
              alt: "Video",
              src: Video,
              width: 550,
              height: 400,
              className: "w-full max-w-xl h-auto object-cover rounded-lg ",
            }}
          />
        </Stack>

        <Container
          containerProps={{
            maxWidth: "lg",
            className: "flex justify-center items-center px-4 md:px-8",
          }}
        >
          <Stack
            stackProps={{
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {/* Top body text */}
            <Typography {...BODY_TEXT_1} />

            {/* Two-column section */}
            <Stack
              stackProps={{
                className:
                  "flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12 w-full",
              }}
            >
              <Typography {...BODY_TEXT_2} />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
}
export default AboutBody;
