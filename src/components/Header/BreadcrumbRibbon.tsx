import { useEffect, useState } from "react";
import { BreadCrumb, Stack, Typography, When } from "../common";
import { colorStyles, dimensionStyle } from "@/styles";
import {
  BREADCRUMB_LINK_TITLE_CONFIG,
  JOBS_URL,
  LANDING_URL,
  NAVIGATION_PATH_MAPPING_CONFIG,
} from "@/constants";
import {
  useCommonDetails,
  useGetSearchDetailsAsPerURLOrUserType,
} from "@/services";
import { SearchIcon } from "@/assets/icons";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";

function BreadcrumbLink({ pathname }: { pathname: string }) {
  return (
    <BreadCrumb>
      {NAVIGATION_PATH_MAPPING_CONFIG?.[pathname]?.breacrumbLinkTitle.map(
        (title) => (
          <Typography
            key={`breacrumbLinkTitle-${title}`}
            {...BREADCRUMB_LINK_TITLE_CONFIG({ title })}
          />
        )
      )}
    </BreadCrumb>
  );
}

function BreadcumbRibbon({
  isFilterOpen,
  pathname,
  onSearchChange,
  showSearchedData,
}: {
  isFilterOpen?: boolean;
  pathname: string;
  onSearchChange?: (searchValue: string) => void;
  showSearchedData?: any;
}) {
  const { userType } = useCommonDetails();

  const [searchString, setSearchString] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setSearchValue("");
  }, [isFilterOpen]);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      const nextSearchString = searchValue.trim();
      if (showSearchedData) setSearchString(nextSearchString);
      onSearchChange?.(nextSearchString);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [onSearchChange, searchValue, showSearchedData]);

  // const SearchData = useGetSearchDetailsAsPerURLOrUserType({
  //   searchString,
  // });

  // useEffect(() => {
  //   showSearchedData?.(SearchData);
  // }, [SearchData, showSearchedData]);

  const searchProps = {
    input: {
      placeholder: "Search name",
    },
  };

  if ([LANDING_URL].includes(pathname)) return null;

  return (
    <>
      <Stack
        stackProps={{
          bgcolor: colorStyles.topRibbonColor,
          minHeight: dimensionStyle.topRibbonHeight,
          className: "w-full mb-10  px-2 md:px-20 py-2 md:py-0 gap-2 md:gap-0",
          alignItems: "center",
          justifyContent: "space-between",
          direction: "row",
          flexWrap: "wrap",
        }}
      >
        <div className="w-full md:w-1/4">
          <BreadcrumbLink pathname={pathname} />
        </div>
        <div className="w-full md:w-2/4 flex justify-center items-center">
          <When condition={userType !== -1 || pathname === JOBS_URL}>
            <FormControl
              sx={{
                width: "30ch",
                backgroundColor: "white",
              }}
              variant="outlined"
            >
              <OutlinedInput
                id="outlined-adornment-search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchProps.input.placeholder}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                aria-describedby="outlined-search-helper-text"
                inputProps={{
                  "aria-label": "search",
                }}
              />
            </FormControl>
          </When>
        </div>
        <div className="w-full md:w-1/4" />
      </Stack>
    </>
  );
}

export default BreadcumbRibbon;
