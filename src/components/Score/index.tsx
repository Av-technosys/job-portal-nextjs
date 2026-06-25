import { formatDate } from "@/helper";
import { getApplicantAssessmentAttempts } from "@/services/useGetApplicantAssessmentAttempts";
import { getAssessmentScoreInfo } from "@/services/useGetAssessmentScoreDetails";
import { useCommonDetails, useGetStudentProfilePersonalInfo } from "@/services";
import { colorStyles } from "@/styles";
import { CommonObjectType, TypographyFontWeight } from "@/types";
import {
  AssessmentOutlined,
  EmojiEventsOutlined,
  HistoryOutlined,
} from "@mui/icons-material";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { Chip, Grid, Loader, Paper, Stack, Typography } from "@/components/common";

type AttemptScore = {
  attempt: CommonObjectType;
  score: CommonObjectType;
};

type ScoreGroup = {
  key: string;
  subjectName: string;
  sectionName: string;
  assessmentType: string;
  latest: AttemptScore;
  best: AttemptScore;
  attemptsCount: number;
};

const FALLBACK_TEXT = "N/A";

function getArrayData(value: unknown): CommonObjectType[] {
  const data = (value as { data?: unknown })?.data ?? value;

  if (Array.isArray(data)) return data as CommonObjectType[];
  if (Array.isArray((data as { data?: unknown })?.data)) {
    return (data as { data: CommonObjectType[] }).data;
  }

  if (data && typeof data === "object") {
    const objectData = data as Record<string, unknown>;
    const arrayKeys = [
      "results",
      "attempts",
      "assessment_attempts",
      "assesment_attempts",
      "subject_attempts",
      "free_attempts",
      "paid_attempts",
      "free_assessment",
      "paid_assessment",
    ];

    for (const key of arrayKeys) {
      if (Array.isArray(objectData[key])) return objectData[key] as CommonObjectType[];
    }

    const nestedItems = Object.values(objectData).flatMap((item) =>
      Array.isArray(item) ? (item as CommonObjectType[]) : []
    );
    if (nestedItems.length > 0) return nestedItems;
  }

  return [];
}

function getObjectData(value: unknown): CommonObjectType {
  const data = (value as { data?: unknown })?.data;
  return ((data as { data?: unknown })?.data || data || {}) as CommonObjectType;
}

function isReadableValue(value: unknown) {
  if (value === undefined || value === null) return false;
  if (typeof value === "object") return false;

  const text = String(value).trim();
  return Boolean(text) && !text.startsWith("Total:");
}

function getDisplayText(...values: unknown[]) {
  const value = values.find(isReadableValue);
  return value !== undefined && value !== null ? String(value) : FALLBACK_TEXT;
}

function getNumber(...values: unknown[]) {
  for (const value of values) {
    if (value === undefined || value === null || value === "") continue;

    const parsedValue = Number(value);
    if (!Number.isNaN(parsedValue)) return parsedValue;
  }

  return null;
}

function getAttemptId(attempt: CommonObjectType) {
  return getDisplayText(
    attempt.id,
    attempt.attempt_id,
    attempt.assessment_attempt_id
  );
}

function getCandidateId(value: unknown) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return null;
}

function getPossibleApplicantIds(
  userId: number,
  profileData: CommonObjectType
) {
  const nestedUserId =
    typeof profileData?.user === "object"
      ? getCandidateId((profileData.user as CommonObjectType)?.id)
      : getCandidateId(profileData?.user);

  return Array.from(
    new Set(
      [
        nestedUserId,
        getCandidateId(profileData?.user_id),
        getCandidateId(profileData?.student_id),
        getCandidateId(profileData?.student_profile_id),
        getCandidateId(profileData?.id),
        userId && userId !== -1 ? String(userId) : null,
      ].filter((id): id is string => Boolean(id))
    )
  );
}

function getAssessmentKey(item: AttemptScore) {
  const subjectKey = getSubjectIdentity(item);

  if (subjectKey === FALLBACK_TEXT) return FALLBACK_TEXT;

  return `${getAssessmentType(item)}-${subjectKey}`;
}

function getSubjectIdentity(item: AttemptScore) {
  return getDisplayText(
    item.score.subject_id,
    item.attempt.subject_id,
    (item.score.subject as CommonObjectType)?.id,
    (item.attempt.subject as CommonObjectType)?.id,
    item.score.subject_name,
    item.attempt.subject_name,
    item.score.exam_name,
    item.attempt.exam_name
  );
}

function getSubjectName(item: AttemptScore) {
  return getDisplayText(
    item.score.subject_name,
    item.attempt.subject_name,
    item.score.exam_name,
    item.attempt.exam_name,
    (item.score.subject as CommonObjectType)?.exam_name,
    (item.attempt.subject as CommonObjectType)?.exam_name,
    `Subject ${getSubjectIdentity(item)}`
  );
}

function getSectionName(item: AttemptScore) {
  return getDisplayText(
    item.score.section_name,
    item.attempt.section_name,
    (item.score.subject as CommonObjectType)?.section_name,
    (item.attempt.subject as CommonObjectType)?.section_name
  );
}

function getAssessmentType(item: AttemptScore) {
  const isPaid = [
    item.score.is_paid,
    item.attempt.is_paid,
    (item.score.subject as CommonObjectType)?.is_paid,
    (item.attempt.subject as CommonObjectType)?.is_paid,
  ].find((value) => typeof value === "boolean");

  if (isPaid === true) return "Paid";
  if (isPaid === false) return "Free";

  return getDisplayText(
    item.score.assessment_type,
    item.attempt.assessment_type,
    item.score.test_type,
    item.attempt.test_type,
    item.score.plan_type,
    item.attempt.plan_type,
    "Assessment"
  );
}

function getScoredMarks(item: AttemptScore) {
  return getNumber(
    item.score.total_marks_scored,
    item.score.marks_scored,
    item.score.obtained_marks,
    item.score.score,
    item.attempt.total_marks_scored,
    item.attempt.score
  );
}

function getTotalMarks(item: AttemptScore) {
  return getNumber(
    item.score.assessment_total,
    item.score.assesment_total,
    item.score["assesment_total "],
    item.score.total_marks,
    item.score.maximum_possible_score,
    item.attempt.assessment_total,
    item.attempt.assesment_total,
    item.attempt.total_marks,
    item.attempt.maximum_possible_score
  );
}

function getPercentage(item: AttemptScore) {
  const explicitPercentage = getNumber(
    item.score.percentage,
    item.score.score_percentage,
    item.attempt.percentage,
    item.attempt.score_percentage
  );
  if (explicitPercentage !== null) return explicitPercentage;

  const scoredMarks = getScoredMarks(item);
  const totalMarks = getTotalMarks(item);

  if (scoredMarks === null || !totalMarks) return 0;
  return (scoredMarks / totalMarks) * 100;
}

function getAttemptDateValue(item: AttemptScore) {
  return getDisplayText(
    item.score.submit_time,
    item.score.submitted_at,
    item.score.created_at,
    item.score.updated_at,
    item.attempt.submit_time,
    item.attempt.submitted_at,
    item.attempt.created_at,
    item.attempt.updated_at
  );
}

function getAttemptSortValue(item: AttemptScore) {
  const dateValue = Date.parse(getAttemptDateValue(item));
  if (!Number.isNaN(dateValue)) return dateValue;

  return getNumber(item.score.id, item.attempt.id, item.attempt.attempt_id) || 0;
}

function getScoreText(item: AttemptScore) {
  const scoredMarks = getScoredMarks(item);
  const totalMarks = getTotalMarks(item);

  if (scoredMarks === null) return FALLBACK_TEXT;
  if (totalMarks === null) return String(scoredMarks);

  return `${scoredMarks} / ${totalMarks}`;
}

function getFormattedDate(item: AttemptScore) {
  const dateValue = getAttemptDateValue(item);
  const timestamp = Date.parse(dateValue);

  if (dateValue === FALLBACK_TEXT || Number.isNaN(timestamp)) {
    return FALLBACK_TEXT;
  }

  return formatDate(dateValue);
}

function getScoreGroups(attempts: CommonObjectType[], scores: CommonObjectType[]) {
  const groupedScores = new Map<string, AttemptScore[]>();

  attempts.forEach((attempt, index) => {
    const score = scores[index] || {};
    const item = {
      attempt,
      score: Object.keys(score).length > 0 ? score : attempt,
    };
    const assessmentKey = getAssessmentKey(item);

    if (assessmentKey === FALLBACK_TEXT) return;

    if (!groupedScores.has(assessmentKey)) {
      groupedScores.set(assessmentKey, []);
    }

    groupedScores.get(assessmentKey)?.push(item);
  });

  return Array.from(groupedScores.entries()).map(([key, items]) => {
    const sortedByLatest = [...items].sort(
      (a, b) => getAttemptSortValue(b) - getAttemptSortValue(a)
    );
    const sortedByBest = [...items].sort(
      (a, b) => getPercentage(b) - getPercentage(a)
    );

    return {
      key,
      subjectName: getSubjectName(sortedByLatest[0]),
      sectionName: getSectionName(sortedByLatest[0]),
      assessmentType: getAssessmentType(sortedByLatest[0]),
      latest: sortedByLatest[0],
      best: sortedByBest[0],
      attemptsCount: items.length,
    } as ScoreGroup;
  });
}

function ScoreMetric({
  icon,
  label,
  value,
  caption,
  backgroundColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  caption: string;
  backgroundColor: string;
}) {
  return (
    <Stack
      stackProps={{
        direction: "row",
        gap: 1.5,
        alignItems: "center",
        sx: {
          bgcolor: backgroundColor,
          borderRadius: "8px",
          p: 2,
          minHeight: 96,
        },
      }}
    >
      <Stack
        stackProps={{
          alignItems: "center",
          justifyContent: "center",
          sx: {
            bgcolor: colorStyles.white,
            borderRadius: "8px",
            color: colorStyles.blue,
            height: 40,
            width: 40,
            flex: "0 0 40px",
          },
        }}
      >
        {icon}
      </Stack>
      <Stack stackProps={{ gap: 0.25, minWidth: 0 }}>
        <Typography
          typographyProps={{
            children: label,
            variant: "caption",
            sx: { color: colorStyles.listTitleTextColor },
          }}
        />
        <Typography
          typographyProps={{
            children: value,
            variant: "h6",
            sx: { lineHeight: 1.25 },
          }}
          fontWeight={TypographyFontWeight.bold}
        />
        <Typography
          typographyProps={{
            children: caption,
            variant: "caption",
            sx: { color: colorStyles.listTitleTextColor },
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
          borderRadius: "8px",
          boxShadow: "0 8px 24px rgba(24, 25, 28, 0.06)",
          overflow: "hidden",
        },
      }}
    >
      <Stack stackProps={{ gap: 2, sx: { p: { xs: 2, md: 3 } } }}>
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
                variant: "h6",
                sx: { lineHeight: 1.3 },
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Typography
              typographyProps={{
                children: sectionName,
                variant: "body2",
                sx: { color: colorStyles.listTitleTextColor },
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
              borderRadius: "8px",
              fontWeight: 600,
            }}
          />
        </Stack>

        <Grid gridProps={{ container: true, spacing: 2 }}>
          <Grid gridProps={{ size: { xs: 12, md: 6 } }}>
            <ScoreMetric
              icon={<HistoryOutlined fontSize="small" />}
              label="Latest Score"
              value={getScoreText(group.latest)}
              caption={`${latestPercentage.toFixed(2)}% | ${getFormattedDate(
                group.latest
              )}`}
              backgroundColor={colorStyles.appliedJobsBackgroundColor}
            />
          </Grid>
          <Grid gridProps={{ size: { xs: 12, md: 6 } }}>
            <ScoreMetric
              icon={<EmojiEventsOutlined fontSize="small" />}
              label="Best Score"
              value={getScoreText(group.best)}
              caption={`${bestPercentage.toFixed(2)}% | ${getFormattedDate(
                group.best
              )}`}
              backgroundColor={colorStyles.savedJobsBackgroundColor}
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
    <Stack stackProps={{ gap: 3 }}>
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 1.5,
        }}
      >
        <Stack stackProps={{ gap: 0.5 }}>
          <Typography
            typographyProps={{
              children: "Subject Scores",
              variant: "h5",
            }}
            fontWeight={TypographyFontWeight.bold}
          />
          <Typography
            typographyProps={{
              children: "Latest and best assessment scores grouped by subject",
              variant: "body2",
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
              border: `1px solid ${colorStyles.borderGreyColor}`,
              borderRadius: "8px",
              boxShadow: "none",
              p: { xs: 3, md: 4 },
            },
          }}
        >
          <Stack
            stackProps={{
              alignItems: "center",
              gap: 1,
              textAlign: "center",
            }}
          >
            <AssessmentOutlined sx={{ color: colorStyles.blue, fontSize: 36 }} />
            <Typography
              typographyProps={{
                children: "No subject scores found",
                variant: "h6",
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Typography
              typographyProps={{
                children:
                  "Completed assessments will appear here with subject-wise score details.",
                variant: "body2",
                sx: { color: colorStyles.listTitleTextColor },
              }}
            />
          </Stack>
        </Paper>
      ) : (
        <Grid gridProps={{ container: true, spacing: 2.5 }}>
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
