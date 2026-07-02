import re

with open('src/components/Score/index.tsx', 'r') as f:
    content = f.read()

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
        gap: 1.5,
        alignItems: "center",
        sx: {
          bgcolor: backgroundColor,
          borderRadius: "12px",
          p: 2,
          minHeight: 80,
          border: `1px solid ${isBestScore ? '#f5df7a' : '#cce0ff'}`,
          position: "relative",
          overflow: "hidden",
        },
      }}
    >
      <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.05, transform: "scale(2)", pointerEvents: "none" }}>
        {icon}
      </div>
      <Stack stackProps={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={48}
          thickness={4}
          sx={{ color: 'rgba(0,0,0,0.05)', position: "absolute" }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={48}
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
              sx: { fontWeight: 800, color: accentColor, fontSize: '0.65rem' },
            }}
          />
        </Stack>
      </Stack>
      <Stack stackProps={{ gap: 0.25, minWidth: 0, zIndex: 1 }}>
        <Stack stackProps={{ direction: "row", gap: 1, alignItems: "center" }}>
          {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 14, color: accentColor } })}
          <Typography
            typographyProps={{
              children: label,
              variant: "body2",
              sx: { color: colorStyles.listTitleTextColor, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.65rem" },
            }}
          />
        </Stack>
        <Typography
          typographyProps={{
            children: value,
            variant: "h6",
            sx: { lineHeight: 1.2, mt: 0.25 },
          }}
          fontWeight={TypographyFontWeight.bold}
        />
        <Typography
          typographyProps={{
            children: caption,
            variant: "caption",
            sx: { color: colorStyles.listTitleTextColor, mt: 0.25, fontWeight: 500, fontSize: "0.65rem" },
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
          height: "100%",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
            borderColor: colorStyles.cardHoverBorderColor,
          }
        },
      }}
    >
      <Stack stackProps={{ gap: 2, sx: { p: 2, height: "100%" } }}>
        <Stack
          stackProps={{
            direction: "column",
            gap: 1.5,
          }}
        >
          <Stack stackProps={{ direction: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 1, flexWrap: "wrap" }}>
            <Stack stackProps={{ gap: 0.5, minWidth: 0, flex: 1 }}>
              <Typography
                typographyProps={{
                  children: group.subjectName,
                  variant: "h6",
                  sx: { lineHeight: 1.2 },
                }}
                fontWeight={TypographyFontWeight.bold}
              />
              <Typography
                typographyProps={{
                  children: sectionName,
                  variant: "body2",
                  sx: { color: colorStyles.listTitleTextColor, mt: 0.25 },
                }}
              />
            </Stack>
            <Chip
              label={`${group.assessmentType} | ${group.attemptsCount} attempt${
                group.attemptsCount === 1 ? "" : "s"
              }`}
              size="small"
              sx={{
                bgcolor: colorStyles.filterTagsBackgroundColor,
                color: colorStyles.filterTagsTextColor,
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.65rem",
                height: 24,
              }}
            />
          </Stack>
        </Stack>

        <Stack stackProps={{ mt: "auto", gap: 1.5 }}>
          <ScoreMetric
            icon={<HistoryOutlined />}
            label="Latest Score"
            value={getScoreText(group.latest)}
            percentage={latestPercentage}
            caption={`Taken on ${getFormattedDate(group.latest)}`}
            backgroundColor={colorStyles.appliedJobsBackgroundColor}
          />
          <ScoreMetric
            icon={<EmojiEventsOutlined />}
            label="Best Score"
            value={getScoreText(group.best)}
            percentage={bestPercentage}
            caption={`Achieved on ${getFormattedDate(group.best)}`}
            backgroundColor={colorStyles.savedJobsBackgroundColor}
            isBestScore
          />
        </Stack>
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
          gap: 1.5,
          sx: {
            bgcolor: colorStyles.lightBlue,
            p: { xs: 3, md: 4 },
            borderRadius: "16px",
            border: `1px solid ${colorStyles.borderGreyColor}`,
          }
        }}
      >
        <Stack stackProps={{ gap: 0.5 }}>
          <Typography
            typographyProps={{
              children: "Subject Scores",
              variant: "h3",
              sx: { color: colorStyles.black }
            }}
            fontWeight={TypographyFontWeight.bold}
          />
          <Typography
            typographyProps={{
              children: "Latest and best assessment scores grouped by subject",
              variant: "body1",
              sx: { color: colorStyles.listTitleTextColor },
            }}
          />
        </Stack>
        <Chip
          icon={<AssessmentOutlined />}
          label={`${scoreGroups.length} subject${
            scoreGroups.length === 1 ? "" : "s"
          }`}
          sx={{
            bgcolor: colorStyles.filterTagsBackgroundColor,
            color: colorStyles.filterTagsTextColor,
            borderRadius: "8px",
            fontWeight: 600,
            px: 0.5,
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
                size: { xs: 12, sm: 6, md: 4, lg: 3 },
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
