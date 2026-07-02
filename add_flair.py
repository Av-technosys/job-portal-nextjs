import re

with open('src/components/Score/index.tsx', 'r') as f:
    content = f.read()

# Add a cool keyframe animation to the Best Score icon and update the ScoreCard hover
flair_metric = """
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
        gap: 1.25,
        alignItems: "center",
        sx: {
          bgcolor: backgroundColor,
          borderRadius: "6px",
          p: 1,
          border: `1px solid ${isBestScore ? '#f5df7a' : '#cce0ff'}`,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: isBestScore ? "#fff8d6" : "#e0f0ff",
          }
        },
      }}
    >
      <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.05, transform: "scale(1.2)", pointerEvents: "none" }}>
        {icon}
      </div>
      <Stack stackProps={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={32}
          thickness={4.5}
          sx={{ color: 'rgba(0,0,0,0.05)', position: "absolute" }}
        />
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={32}
          thickness={4.5}
          sx={{ 
            color: accentColor,
            ...(isBestScore && { filter: "drop-shadow(0 0 4px rgba(196, 174, 49, 0.4))" })
          }}
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
              sx: { fontWeight: 800, color: accentColor, fontSize: '0.5rem' },
            }}
          />
        </Stack>
      </Stack>
      <Stack stackProps={{ gap: 0, minWidth: 0, zIndex: 1 }}>
        <Stack stackProps={{ direction: "row", gap: 0.5, alignItems: "center" }}>
          {React.cloneElement(icon as React.ReactElement, { 
            sx: { 
              fontSize: 12, 
              color: accentColor,
              ...(isBestScore && { 
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.15)" },
                  "100%": { transform: "scale(1)" }
                }
              })
            } 
          })}
          <Typography
            typographyProps={{
              children: label,
              variant: "caption",
              sx: { color: colorStyles.listTitleTextColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", fontSize: "0.55rem", lineHeight: 1 },
            }}
          />
        </Stack>
        <Typography
          typographyProps={{
            children: value,
            variant: "subtitle2",
            sx: { lineHeight: 1.1, mt: 0.25, fontSize: "0.8rem" },
          }}
          fontWeight={TypographyFontWeight.bold}
        />
        <Typography
          typographyProps={{
            children: caption,
            variant: "caption",
            sx: { color: colorStyles.listTitleTextColor, mt: 0, fontWeight: 500, fontSize: "0.55rem", lineHeight: 1 },
          }}
        />
      </Stack>
    </Stack>
  );
}
"""

content = re.sub(r'function ScoreMetric\(.*?\}\)\s*\{\s*const accentColor.*?</Stack>\s*</Stack>\s*\);\s*\}', flair_metric, content, flags=re.DOTALL)

with open('src/components/Score/index.tsx', 'w') as f:
    f.write(content)
