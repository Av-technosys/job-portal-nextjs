import re

with open('src/components/Score/index.tsx', 'r') as f:
    content = f.read()

# Replace ScoreMetric styling to make it much more compact
compact_metric = """
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
          borderRadius: "8px",
          p: 1.5,
          border: `1px solid ${isBestScore ? '#f5df7a' : '#cce0ff'}`,
          position: "relative",
          overflow: "hidden",
        },
      }}
    >
      <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.05, transform: "scale(1.5)", pointerEvents: "none" }}>
        {icon}
      </div>
      <Stack stackProps={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={36}
          thickness={4}
          sx={{ color: 'rgba(0,0,0,0.05)', position: "absolute" }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={36}
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
              sx: { fontWeight: 800, color: accentColor, fontSize: '0.55rem' },
            }}
          />
        </Stack>
      </Stack>
      <Stack stackProps={{ gap: 0, minWidth: 0, zIndex: 1 }}>
        <Stack stackProps={{ direction: "row", gap: 0.5, alignItems: "center" }}>
          {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 12, color: accentColor } })}
          <Typography
            typographyProps={{
              children: label,
              variant: "body2",
              sx: { color: colorStyles.listTitleTextColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.55rem" },
            }}
          />
        </Stack>
        <Typography
          typographyProps={{
            children: value,
            variant: "body1",
            sx: { lineHeight: 1.2, mt: 0.25 },
          }}
          fontWeight={TypographyFontWeight.bold}
        />
        <Typography
          typographyProps={{
            children: caption,
            variant: "caption",
            sx: { color: colorStyles.listTitleTextColor, mt: 0, fontWeight: 500, fontSize: "0.55rem" },
          }}
        />
      </Stack>
    </Stack>
  );
}
"""

# Find the old ScoreMetric function and replace it
content = re.sub(r'function ScoreMetric\(.*?\}\)\s*\{\s*const accentColor.*?</Stack>\s*</Stack>\s*\);\s*\}', compact_metric, content, flags=re.DOTALL)

with open('src/components/Score/index.tsx', 'w') as f:
    f.write(content)
