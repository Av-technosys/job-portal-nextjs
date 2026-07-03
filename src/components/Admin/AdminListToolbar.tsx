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
          sx: {
            flex: 1,
            "& .MuiFormControl-root": {
              margin: 0,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px !important",
              backgroundColor: "#ffffff !important",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05) !important",
              transition: "all 0.2s ease-in-out",
              fontSize: "0.925rem !important",
              height: "46px !important",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e2e8f0 !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#818cf8 !important",
              },
              "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.15) !important",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4f46e5 !important",
                  borderWidth: "1.5px !important",
                },
              },
            },
            "& .MuiSelect-select": {
              padding: "10px 38px 10px 16px !important",
              display: "flex",
              alignItems: "center",
              fontWeight: "600 !important",
              color: "#334155 !important",
              minHeight: "24px !important",
            },
            "& .MuiSelect-icon": {
              right: "12px !important",
              color: "#64748b !important",
            },
          },
        }}
      >
        <FormControl
          sx={{
            width: { xs: "100%", sm: "32ch" },
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
                <SearchIcon sx={{ color: "#64748b" }} />
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
