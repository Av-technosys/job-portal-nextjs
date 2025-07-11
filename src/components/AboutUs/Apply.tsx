import { JOB_SEEKER_CONFIG, RECRUITER_CONFIG, REGISTER_URL } from "@/constants";
import { Button, Container, Paper, Stack, Typography } from "../common";
import { useRouter } from "next/router";
import { colorStyles } from "@/styles";
function Apply() {
  const router = useRouter();
  const { SEEKER_TITLE_FIELD, SEEKER_TEXT_FIELD, SEEKER_REGISTER_BUTTON } =
    JOB_SEEKER_CONFIG;
  const {
    RECRUTITER_TITLE_FIELD,
    RECRUITER_TEXT_FIELD,
    RECRUITER_REGISTER_BUTTON,
  } = RECRUITER_CONFIG;
  const navigateToJobSeeker = () => {
    router.push(REGISTER_URL);
  };
  const navigateToRecruiter = () => {
    router.push(REGISTER_URL);
  };
  return (
    <>
      <Stack
        stackProps={{
          className: "mt-2",
          direction: "row",
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
                direction: "row",
                gap: 4,
              }}
            >
              <Stack
                stackProps={{
                  className: "p-4 rounded-lg ",
                  direction: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 1,
                  sx: {
                    bgcolor: colorStyles.listTitleBackgroundColor,
                  },
                }}
              >
                <Typography {...SEEKER_TITLE_FIELD} />
                <Typography {...SEEKER_TEXT_FIELD} />
                <Button
                  {...SEEKER_REGISTER_BUTTON}
                  onClick={navigateToJobSeeker}
                />
              </Stack>
              <Stack
                stackProps={{
                  className: "p-4 rounded-lg",
                  direction: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: 1,
                  sx: {
                    bgcolor: colorStyles.listTitleBackgroundColor1,
                  },
                }}
              >
                <Typography {...RECRUTITER_TITLE_FIELD} />
                <Typography {...RECRUITER_TEXT_FIELD} />
                <Button
                  {...RECRUITER_REGISTER_BUTTON}
                  onClick={navigateToRecruiter}
                />
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Stack>
    </>
  );
}

export default Apply;
