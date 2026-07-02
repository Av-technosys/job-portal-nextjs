import re

with open('src/components/Score/index.tsx', 'r') as f:
    content = f.read()

# Replace ScoreCard to make it "cute" and smaller
cute_score_card = """
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
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          transition: "all 0.3s ease",
          height: "100%",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
            borderColor: colorStyles.cardHoverBorderColor,
          }
        },
      }}
    >
      <Stack stackProps={{ gap: 1.5, sx: { p: 1.5, height: "100%" } }}>
        <Stack stackProps={{ direction: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
          <Stack stackProps={{ gap: 0, minWidth: 0, flex: 1 }}>
            <Typography
              typographyProps={{
                children: group.subjectName,
                variant: "body1",
                sx: { lineHeight: 1.2 },
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Typography
              typographyProps={{
                children: sectionName,
                variant: "caption",
                sx: { color: colorStyles.listTitleTextColor, mt: 0.25, fontSize: "0.65rem" },
              }}
            />
          </Stack>
          <Chip
            label={`${group.attemptsCount} attempt${group.attemptsCount === 1 ? "" : "s"}`}
            size="small"
            sx={{
              bgcolor: colorStyles.filterTagsBackgroundColor,
              color: colorStyles.filterTagsTextColor,
              borderRadius: "6px",
              fontWeight: 700,
              fontSize: "0.6rem",
              height: 20,
            }}
          />
        </Stack>

        <Stack stackProps={{ mt: "auto", gap: 1 }}>
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
"""

content = re.sub(r'function ScoreCard\(.*?\}\)\s*\{\s*const latestPercentage.*?</Paper>\s*\);\s*\}', cute_score_card, content, flags=re.DOTALL)

with open('src/components/Score/index.tsx', 'w') as f:
    f.write(content)
