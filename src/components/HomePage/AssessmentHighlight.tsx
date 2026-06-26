import React from "react";
import { useRouter } from "next/router";
import { Assessment, FactCheck, School } from "@mui/icons-material";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import {
  ASSESSMENT_URL,
  LOCAL_STORAGE_KEY,
  LOGIN_URL,
} from "@/constants";
import { getItem, isUserAuthenticated } from "@/helper";
import { useNotification } from "@/services";
import { UserType } from "@/types";

const assessmentFeatures = [
  {
    icon: <FactCheck fontSize="small" />,
    label: "Skill readiness checks",
  },
  {
    icon: <School fontSize="small" />,
    label: "Curated practice tests",
  },
  {
    icon: <Assessment fontSize="small" />,
    label: "Performance summary",
  },
];

function AssessmentHighlight() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleAssessmentClick = () => {
    if (isUserAuthenticated() || getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) {
      const currentUserType = getItem(LOCAL_STORAGE_KEY.CURRENT_USER_TYPE);

      if (currentUserType === UserType.RECUITER_TYPE) {
        showNotification({
          message: "Assessments are only available for job seekers.",
        });
        return;
      }

      router.push(ASSESSMENT_URL);
      return;
    }

    router.push({
      pathname: LOGIN_URL,
      query: {
        redirectTo: ASSESSMENT_URL,
      },
    });
  };

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        backgroundColor: "#F5F9FC",
        borderTop: "1px solid #E4ECF3",
        borderBottom: "1px solid #E4ECF3",
        py: { xs: 5, md: 7 },
        my: { xs: 4, md: 6 },
      }}
    >
      {/* Centred wrapper — plain div so margin:auto works correctly */}
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          padding: "0 16px",
          width: "100%",
          minWidth: 0,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 6 }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Stack spacing={2.5} sx={{ maxWidth: 620, width: "100%" }}>
            <Chip
              icon={<Assessment />}
              label="Assessments"
              sx={{
                width: "fit-content",
                backgroundColor: "#E7F0FF",
                color: "#0B63CE",
                fontWeight: 700,
              }}
            />
            <Stack spacing={1.2}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: 26, md: 42 },
                  fontWeight: 800,
                  color: "#172033",
                  lineHeight: 1.12,
                }}
              >
                Prove your readiness before applying
              </Typography>
              <Typography
                sx={{
                  color: "#566276",
                  fontSize: { xs: 15, md: 17 },
                  lineHeight: 1.7,
                }}
              >
                Job Assured provides assessments that help job seekers understand
                their strengths, practice role-based questions, and build a
                stronger profile for recruiters.
              </Typography>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap">
              {assessmentFeatures.map((feature) => (
                <Chip
                  key={feature.label}
                  icon={feature.icon}
                  label={feature.label}
                  sx={{
                    justifyContent: "flex-start",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #DCE6F1",
                    color: "#273449",
                    fontWeight: 600,
                    height: 38,
                  }}
                />
              ))}
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            sx={{
              width: { xs: "100%", md: 360 },
              flexShrink: 0,
              p: { xs: 2.5, md: 3 },
              border: "1px solid #D9E5EF",
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              boxShadow: "0 12px 28px rgba(30, 54, 83, 0.08)",
            }}
          >
            <Typography sx={{ color: "#687589", fontSize: 14, fontWeight: 700 }}>
              Available inside your dashboard
            </Typography>
            <Typography sx={{ color: "#172033", fontSize: 22, fontWeight: 800 }}>
              Start with assessment tests
            </Typography>
            <Typography sx={{ color: "#566276", fontSize: 14, lineHeight: 1.7 }}>
              Open the assessment tab, choose a test, submit answers, and review
              your score summary.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleAssessmentClick}
              startIcon={<Assessment />}
              sx={{
                mt: 1,
                height: 48,
                textTransform: "none",
                fontWeight: 700,
                backgroundColor: "#0B63CE",
                "&:hover": {
                  backgroundColor: "#084C9E",
                },
              }}
            >
              Go to Assessments
            </Button>
          </Stack>
        </Stack>
      </div>
    </Box>
  );
}

export default AssessmentHighlight;
