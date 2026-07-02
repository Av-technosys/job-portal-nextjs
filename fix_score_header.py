import re

with open('src/components/Score/index.tsx', 'r') as f:
    content = f.read()

header_regex = r'<Stack\s+stackProps=\{\{\s+direction: \{ xs: "column", md: "row" \},\s+justifyContent: "space-between",\s+alignItems: \{ xs: "flex-start", md: "center" \},\s+gap: 2,\s+sx: \{\s+background: `linear-gradient.*?\}\s+\}\}>\s+<div.*?</div>\s+<Stack stackProps=\{\{ gap: 1, zIndex: 1 \}\}>\s+<Typography\s+typographyProps=\{\{\s+children: "Your Performance Hub",\s+variant: "h4",\s+\}\}\s+fontWeight=\{TypographyFontWeight.bold\}\s+/>\s+<Typography\s+typographyProps=\{\{\s+children: "Track your latest and highest assessment scores across all subjects.",\s+variant: "body1",\s+sx: \{ opacity: 0\.9, maxWidth: 500 \},\s+\}\}\s+/>\s+</Stack>\s+<Chip\s+icon=\{<AssessmentOutlined sx=\{\{ color: `\$\{colorStyles\.blue\} !important` \}\} />\}\s+label=\{`\$\{scoreGroups\.length\} subject\$\{\s+scoreGroups\.length === 1 \? "" : "s"\s+\} recorded`\}\s+sx=\{\{\s+bgcolor: colorStyles\.white,\s+color: colorStyles\.blue,\s+borderRadius: "12px",\s+fontWeight: 800,\s+px: 1,\s+py: 2\.5,\s+zIndex: 1,\s+boxShadow: "0 4px 12px rgba\(0,0,0,0\.1\)",\s+\}\}\s+/>\s+</Stack>'

new_header = """<Stack
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
              variant: "h2",
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
            py: 2,
          }}
        />
      </Stack>"""

content = re.sub(header_regex, new_header, content, flags=re.DOTALL)

with open('src/components/Score/index.tsx', 'w') as f:
    f.write(content)
