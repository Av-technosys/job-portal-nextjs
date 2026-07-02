import { SearchIcon } from "@/assets";
import { Stack } from "@/components";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { ReactNode } from "react";

type AdminListToolbarProps = {
  countContent?: ReactNode;
  titleContent?: ReactNode;
  searchValue: string;
  searchPlaceholder: string;
  onSearchChange: (value: string) => void;
  actions?: ReactNode;
};

function AdminListToolbar({
  countContent,
  titleContent,
  searchValue,
  searchPlaceholder,
  onSearchChange,
  actions,
}: AdminListToolbarProps) {
  return (
    <Stack
      stackProps={{
        width: "100%",
        direction: { xs: "column", md: "row" },
        gap: 2,
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        sx: { mb: 2 },
      }}
    >
      {(countContent || titleContent) && (
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: "center",
            sx: { minWidth: { md: 220 } },
          }}
        >
          {countContent}
          {titleContent}
        </Stack>
      )}

      <Stack
        stackProps={{
          direction: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "flex-end",
          sx: { flex: 1 },
        }}
      >
        <FormControl
          sx={{
            width: { xs: "100%", sm: "30ch" },
            flexShrink: 0,
          }}
          variant="outlined"
        >
          <OutlinedInput
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            inputProps={{
              "aria-label": "search",
            }}
          />
        </FormControl>
        {actions}
      </Stack>
    </Stack>
  );
}

export default AdminListToolbar;
