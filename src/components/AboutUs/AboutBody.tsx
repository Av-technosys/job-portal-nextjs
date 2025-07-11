import { PAGE_BODY_CONFIG } from "@/constants";
import { Container, NextImage, Paper, Stack, Typography } from "../common";
import { Video } from "@/assets";

function AboutBody() {
  const { BODY_TEXT_1, BODY_TEXT_2, BODY_TEXT_3 } = PAGE_BODY_CONFIG;
  return (
    <>
      <Stack
        stackProps={{
          className: "mb-8",
          direction: "column",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100vw",
        }}
      >
        <NextImage
          props={{
            alt: "Video",
            src: Video,
            width: 550,
            height: 40,
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
            className: "p-4 w-full shadow-none",
          }}
        >
          <Stack
            stackProps={{
              gap: 6,
              direction: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography {...BODY_TEXT_1} />
            <Stack
              stackProps={{
                className: "",
                gap: 24,
                direction: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography {...BODY_TEXT_2} />
              <Typography {...BODY_TEXT_3} />
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
export default AboutBody;
