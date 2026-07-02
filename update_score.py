import re

with open('src/components/Score/index.tsx', 'r') as f:
    content = f.read()

# We need to add CircularProgress to imports from @mui/material
if 'CircularProgress' not in content:
    content = content.replace(
        'import {', 
        'import {\n  CircularProgress,', 
        1
    )

new_components = """
function ScoreMetric({
  icon,
  label,
  value,
  caption,
  percentage,
  backgroundColor,
  isBestScore = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  caption: string;
  percentage: number;
  backgroundColor: string;
  isBestScore?: boolean;
}) {
  const accentColor = isBestScore ? colorStyles.gold : colorStyles.blue;
  return (
    <Stack
      stackProps={{
        direction: "row",
        gap: 2,
        alignItems: "center",
        sx: {
          bgcolor: backgroundColor,
          borderRadius: "12px",
          p: 2.5,
          minHeight: 110,
          border: `1px solid ${isBestScore ? '#f5df7a' : '#cce0ff'}`,
          position: "relative",
          overflow: "hidden",
        },
      }}
    >
      <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.05, transform: "scale(2.5)", pointerEvents: "none" }}>
        {icon}
      </div>
      <Stack stackProps={{ position: "relative", display: "inline-flex", mr: 1 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={56}
          thickness={4}
          sx={{ color: 'rgba(0,0,0,0.05)', position: "absolute" }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={56}
          thickness={4}
          sx={{ color: accentColor }}
        />
        <Stack
          stackProps={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            typographyProps={{
              children: `${Math.round(percentage)}%`,
              variant: "caption",
              sx: { fontWeight: 800, color: accentColor, fontSize: '0.7rem' },
            }}
          />
        </Stack>
      </Stack>
      <Stack stackProps={{ gap: 0.25, minWidth: 0, zIndex: 1 }}>
        <Stack stackProps={{ direction: "row", gap: 1, alignItems: "center" }}>
          {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 16, color: accentColor } })}
          <Typography
            typographyProps={{
              children: label,
              variant: "body2",
              sx: { color: colorStyles.listTitleTextColor, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.7rem" },
            }}
          />
        </Stack>
        <Typography
          typographyProps={{
            children: value,
            variant: "h5",
            sx: { lineHeight: 1.25, mt: 0.5 },
          }}
          fontWeight={TypographyFontWeight.bold}
        />
        <Typography
          typographyProps={{
            children: caption,
            variant: "caption",
            sx: { color: colorStyles.listTitleTextColor, mt: 0.5, fontWeight: 500 },
          }}
        />
      </Stack>
    </Stack>
  );
}

function ScoreCard({ group }: { group: ScoreGroup }) {
  const latestPercentage = Math.max(0, Math.min(getPercentage(group.latest), 100));
  const bestPercentage = Math.max(0, Math.min(getPercentage(group.best), 100));
  const sectionName =
    group.sectionName === FALLBACK_TEXT ? "Assessment subject" : group.sectionName;

  return (
    <Paper
      paperProps={{
        sx: {
          border: `1px solid ${colorStyles.borderGreyColor}`,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
            borderColor: colorStyles.cardHoverBorderColor,
          }
        },
      }}
    >
      <Stack stackProps={{ gap: 2.5, sx: { p: { xs: 2.5, md: 3.5 } } }}>
        <Stack
          stackProps={{
            direction: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1.5,
          }}
        >
          <Stack stackProps={{ gap: 0.5, minWidth: 0 }}>
            <Typography
              typographyProps={{
                children: group.subjectName,
                variant: "h5",
                sx: { lineHeight: 1.3 },
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Typography
              typographyProps={{
                children: sectionName,
                variant: "body1",
                sx: { color: colorStyles.listTitleTextColor, mt: 0.5 },
              }}
            />
          </Stack>
          <Chip
            label={`${group.assessmentType} | ${group.attemptsCount} attempt${
              group.attemptsCount === 1 ? "" : "s"
            }`}
            size="medium"
            sx={{
              bgcolor: colorStyles.filterTagsBackgroundColor,
              color: colorStyles.filterTagsTextColor,
              borderRadius: "8px",
              fontWeight: 700,
              px: 1,
            }}
          />
        </Stack>

        <Grid gridProps={{ container: true, spacing: 2 }}>
          <Grid gridProps={{ size: { xs: 12, md: 6 } }}>
            <ScoreMetric
              icon={<HistoryOutlined />}
              label="Latest Score"
              value={getScoreText(group.latest)}
              percentage={latestPercentage}
              caption={`Taken on ${getFormattedDate(group.latest)}`}
              backgroundColor={colorStyles.appliedJobsBackgroundColor}
            />
          </Grid>
          <Grid gridProps={{ size: { xs: 12, md: 6 } }}>
            <ScoreMetric
              icon={<EmojiEventsOutlined />}
              label="Best Score"
              value={getScoreText(group.best)}
              percentage={bestPercentage}
              caption={`Achieved on ${getFormattedDate(group.best)}`}
              backgroundColor={colorStyles.savedJobsBackgroundColor}
              isBestScore
            />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
}

function Score() {
  const { userId } = useCommonDetails();
  const profileQuery = useGetStudentProfilePersonalInfo();
  const profileData = useMemo(() => {
    return (profileQuery.data?.data || {}) as CommonObjectType;
  }, [profileQuery.data]);

  const applicantIds = useMemo(() => {
    return getPossibleApplicantIds(userId, profileData);
  }, [profileData, userId]);

  const applicantAttemptQueries = useQueries({
    queries: applicantIds.map((applicantId) => ({
      queryKey: ["applicant_assessment_attempts", applicantId],
      queryFn: () => getApplicantAssessmentAttempts({ applicantId }),
      enabled: Boolean(applicantId),
    })),
  });

  const attempts = useMemo(() => {
    const attemptsById = new Map<string, CommonObjectType>();

    applicantAttemptQueries.forEach((query) => {
      getArrayData(query.data).forEach((attempt) => {
        const attemptId = getAttemptId(attempt);
        if (attemptId !== FALLBACK_TEXT) attemptsById.set(attemptId, attempt);
      });
    });

    return Array.from(attemptsById.values());
  }, [applicantAttemptQueries]);

  const scoreQueries = useQueries({
    queries: attempts.map((attempt) => {
      const attemptId = getAttemptId(attempt);

      return {
        queryKey: ["assessment_score_full_details", attemptId],
        queryFn: () => getAssessmentScoreInfo({ id: attemptId }),
        enabled: attemptId !== FALLBACK_TEXT,
      };
    }),
  });

  const scoreGroups = useMemo(() => {
    return getScoreGroups(
      attempts,
      scoreQueries.map((query) => getObjectData(query.data))
    );
  }, [attempts, scoreQueries]);

  const isLoading =
    profileQuery.isLoading ||
    applicantAttemptQueries.some((query) => query.isLoading) ||
    scoreQueries.some((query) => query.isLoading);

  if (isLoading) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  return (
    <Stack stackProps={{ gap: 4 }}>
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
          sx: {
            background: `linear-gradient(135deg, ${colorStyles.scoreGradientlightBlue} 0%, ${colorStyles.scoreGradientDarkBlue} 100%)`,
            p: { xs: 3, md: 4 },
            borderRadius: "16px",
            color: colorStyles.white,
            boxShadow: "0 10px 30px rgba(33, 150, 243, 0.2)",
            position: "relative",
            overflow: "hidden",
          }
        }}
      >
        <div style={{ position: "absolute", right: "-5%", top: "-20%", opacity: 0.1, transform: "scale(2)", pointerEvents: "none" }}>
          <AssessmentOutlined sx={{ fontSize: 200 }} />
        </div>
        <Stack stackProps={{ gap: 1, zIndex: 1 }}>
          <Typography
            typographyProps={{
              children: "Your Performance Hub",
              variant: "h4",
            }}
            fontWeight={TypographyFontWeight.bold}
          />
          <Typography
            typographyProps={{
              children: "Track your latest and highest assessment scores across all subjects.",
              variant: "body1",
              sx: { opacity: 0.9, maxWidth: 500 },
            }}
          />
        </Stack>
        <Chip
          icon={<AssessmentOutlined sx={{ color: `${colorStyles.blue} !important` }} />}
          label={`${scoreGroups.length} subject${
            scoreGroups.length === 1 ? "" : "s"
          } recorded`}
          sx={{
            bgcolor: colorStyles.white,
            color: colorStyles.blue,
            borderRadius: "12px",
            fontWeight: 800,
            px: 1,
            py: 2.5,
            zIndex: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </Stack>

      {scoreGroups.length === 0 ? (
        <Paper
          paperProps={{
            sx: {
              border: `2px dashed ${colorStyles.borderGreyColor}`,
              borderRadius: "16px",
              boxShadow: "none",
              p: { xs: 4, md: 8 },
              bgcolor: colorStyles.lightBlue,
            },
          }}
        >
          <Stack
            stackProps={{
              alignItems: "center",
              gap: 2,
              textAlign: "center",
            }}
          >
            <AssessmentOutlined sx={{ color: colorStyles.blue, fontSize: 64, opacity: 0.5 }} />
            <Typography
              typographyProps={{
                children: "No assessments completed yet",
                variant: "h5",
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Typography
              typographyProps={{
                children:
                  "Once you complete an assessment, your beautifully detailed subject-wise scores will appear right here.",
                variant: "body1",
                sx: { color: colorStyles.listTitleTextColor, maxWidth: 400 },
              }}
            />
          </Stack>
        </Paper>
      ) : (
        <Grid gridProps={{ container: true, spacing: 3 }}>
          {scoreGroups.map((group) => (
            <Grid
              key={group.key}
              gridProps={{
                size: { xs: 12 },
              }}
            >
              <ScoreCard group={group} />
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}

export default Score;
"""

new_content = re.sub(r'function ScoreMetric.*export default Score;', new_components, content, flags=re.DOTALL)

with open('src/components/Score/index.tsx', 'w') as f:
    f.write(new_content)
