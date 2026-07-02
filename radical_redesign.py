import re

with open('src/components/Score/index.tsx', 'r') as f:
    content = f.read()

radical_card = """
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
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          height: "100%",
          position: "relative",
          bgcolor: colorStyles.white,
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: `0 16px 32px rgba(29, 78, 216, 0.1)`,
            borderColor: colorStyles.blue,
            "& .best-ring": {
              filter: "drop-shadow(0 0 8px rgba(196, 174, 49, 0.8))"
            }
          }
        },
      }}
    >
      <Stack stackProps={{ direction: "row", height: "100%" }}>
        {/* Left Side: Details & Latest Score */}
        <Stack stackProps={{ p: 2, flex: 1, gap: 1.5, justifyContent: "space-between" }}>
          
          <Stack stackProps={{ gap: 0.5 }}>
            <Chip
              label={`${group.attemptsCount} attempt${group.attemptsCount === 1 ? "" : "s"}`}
              size="small"
              sx={{
                bgcolor: colorStyles.lightBlue,
                color: colorStyles.blue,
                borderRadius: "6px",
                fontWeight: 800,
                fontSize: "0.6rem",
                height: 20,
                alignSelf: "flex-start",
                mb: 0.5,
              }}
            />
            <Typography
              typographyProps={{
                children: group.subjectName,
                variant: "subtitle1",
                sx: { lineHeight: 1.2 },
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Typography
              typographyProps={{
                children: sectionName,
                variant: "caption",
                sx: { color: colorStyles.listTitleTextColor, fontSize: "0.65rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
              }}
            />
          </Stack>

          <Stack stackProps={{ gap: 0.25, mt: 1 }}>
            <Stack stackProps={{ direction: "row", gap: 0.5, alignItems: "center" }}>
              <HistoryOutlined sx={{ fontSize: 12, color: colorStyles.listTitleTextColor }} />
              <Typography
                typographyProps={{
                  children: "LATEST",
                  variant: "caption",
                  sx: { color: colorStyles.listTitleTextColor, fontWeight: 700, fontSize: "0.55rem", letterSpacing: "0.5px" },
                }}
              />
            </Stack>
            <Typography
              typographyProps={{
                children: getScoreText(group.latest),
                variant: "body2",
                sx: { lineHeight: 1 },
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Typography
              typographyProps={{
                children: getFormattedDate(group.latest),
                variant: "caption",
                sx: { color: colorStyles.listTitleTextColor, fontSize: "0.55rem" },
              }}
            />
          </Stack>
        </Stack>

        {/* Right Side: Best Score Ring */}
        <Stack 
          stackProps={{ 
            p: 2, 
            bgcolor: "#fffaf0", 
            borderLeft: `1px dashed ${colorStyles.borderGreyColor}`,
            alignItems: "center",
            justifyContent: "center",
            minWidth: 100,
            position: "relative"
          }}
        >
          <div style={{ position: "absolute", top: 10, right: 10, opacity: 0.05, transform: "scale(2)", pointerEvents: "none" }}>
            <EmojiEventsOutlined />
          </div>
          <Typography
            typographyProps={{
              children: "BEST",
              variant: "caption",
              sx: { color: colorStyles.gold, fontWeight: 800, fontSize: "0.6rem", letterSpacing: "1px", mb: 1 },
            }}
          />
          <Stack stackProps={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={56}
              thickness={4.5}
              sx={{ color: 'rgba(196, 174, 49, 0.1)', position: "absolute" }}
            />
            <CircularProgress
              className="best-ring"
              variant="determinate"
              value={bestPercentage}
              size={56}
              thickness={4.5}
              sx={{ color: colorStyles.gold, transition: "filter 0.3s ease" }}
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
                  children: `${Math.round(bestPercentage)}%`,
                  variant: "caption",
                  sx: { fontWeight: 900, color: colorStyles.gold, fontSize: '0.75rem' },
                }}
              />
            </Stack>
          </Stack>
          <Typography
            typographyProps={{
              children: getScoreText(group.best),
              variant: "caption",
              sx: { color: colorStyles.gold, fontWeight: 700, mt: 1, fontSize: "0.7rem" },
            }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
"""

content = re.sub(r'function ScoreMetric\(.*?\}\)\s*\{\s*const accentColor.*?</Paper>\s*\);\s*\}', radical_card, content, flags=re.DOTALL)

with open('src/components/Score/index.tsx', 'w') as f:
    f.write(content)
