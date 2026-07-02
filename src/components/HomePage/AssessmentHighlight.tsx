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
        width: "calc(100% + 64px)",
        mx: "-32px",
        background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
        borderTop: "1px solid #1E293B",
        borderBottom: "1px solid #1E293B",
        py: { xs: 6, md: 8 },
        my: { xs: 6, md: 8 },
        position: "relative",
        overflow: "visible",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 6 }}
        alignItems="center"
        justifyContent="space-between"
        className="max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto"
      >
        <Stack spacing={2.5} sx={{ maxWidth: 620 }}>
          <Chip
            icon={<Assessment />}
            label="Assessments"
            sx={{
              width: "fit-content",
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              color: "#818CF8",
              border: "1px solid rgba(129, 140, 248, 0.3)",
              fontWeight: 700,
            }}
          />
          <Stack spacing={1.2}>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: 30, md: 42 },
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.12,
              }}
            >
              Prove your readiness before applying
            </Typography>
            <Typography
              sx={{
                color: "#94A3B8",
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.7,
              }}
            >
              Job Assured provides assessments that help job seekers understand
              their strengths, practice role-based questions, and build a
              stronger profile for recruiters.
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            {assessmentFeatures.map((feature) => (
              <Chip
                key={feature.label}
                icon={feature.icon}
                label={feature.label}
                sx={{
                  justifyContent: "flex-start",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#E2E8F0",
                  fontWeight: 600,
                  height: 38,
                  "& .MuiChip-icon": {
                    color: "#38BDF8",
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Stack
          spacing={2}
          sx={{
            width: { xs: "100%", md: 360 },
            p: { xs: 3, md: 3.5 },
            border: "1px solid rgba(255, 255, 255, 0.15)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            borderRadius: 3,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          }}
        >
          <Typography sx={{ color: "#4F46E5", fontSize: 14, fontWeight: 700 }}>
            Available inside your dashboard
          </Typography>
          <Typography sx={{ color: "#0F172A", fontSize: 22, fontWeight: 800 }}>
            Start with assessment tests
          </Typography>
          <Typography sx={{ color: "#475569", fontSize: 14, lineHeight: 1.7 }}>
            Open the assessment tab, choose a test, submit answers, and review
            your score summary.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleAssessmentClick}
            startIcon={<Assessment />}
            sx={{
              mt: 1.5,
              height: 50,
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              background: "linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)",
              boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #1D4ED8 0%, #4338CA 100%)",
                boxShadow: "0 10px 20px -3px rgba(79, 70, 229, 0.4)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Go to Assessments
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default AssessmentHighlight;
