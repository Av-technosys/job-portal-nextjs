import { useEffect, useState } from "react";
import { BreadCrumb, Stack, Typography, When } from "../common";
import { colorStyles, dimensionStyle } from "@/styles";
import {
  BREADCRUMB_LINK_TITLE_CONFIG,
  HEADER_SEARCH_SECTION_CONFIG,
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
  pathname,
  showSearchedData,
}: {
  pathname: string;
  showSearchedData: any;
}) {
  const { userType } = useCommonDetails();

  if ([LANDING_URL].includes(pathname)) return null;

  const [searchString, setSearchString] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchString(searchValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const SearchData = useGetSearchDetailsAsPerURLOrUserType({
    searchString,
  });

  useEffect(() => {
    showSearchedData(SearchData);
  }, [SearchData]);

  const searchProps = {
    input: {
      placeholder: "Search name",
    },
  };

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
          // flexWrap: "wrap",
        }}
      >
        <div className="w-full md:w-1/4">
          <BreadcrumbLink pathname={pathname} />
        </div>
        <div className="w-full md:w-2/4 flex justify-center items-center">
          <When condition={userType !== -1}>
            <FormControl
              sx={{
                width: { xs: "20ch", sm: "30ch" },
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
