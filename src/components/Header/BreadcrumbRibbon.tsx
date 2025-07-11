import { useState } from "react";
import {
  AutoComplete,
  BreadCrumb,
  Divider,
  Dropdown,
  IconButton,
  NextImage,
  Stack,
  Typography,
  When,
} from "../common";
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
import { INDIA_FLAG, SearchIcon } from "@/assets/icons";
import { AutoCompleteListItem, CommonObjectType } from "@/types";

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

function SearchInput() {
  const [searchString, setSearchString] = useState<string>("");
  const { apiData, searchProps, searchOptions } =
    useGetSearchDetailsAsPerURLOrUserType({
      searchString,
    });
  const { SEARCH_FIELD_HEIGHT, COUNTRY_FIELD, FIELD_DIVIDER } =
    HEADER_SEARCH_SECTION_CONFIG;

  return (
    <div
      style={{
        backgroundColor: colorStyles.white,
        color: colorStyles.topRibbonColor,
        borderRadius: "5px",
      }}
    >
      <Stack
        stackProps={{
          direction: "row",
          spacing: 1,
          height: SEARCH_FIELD_HEIGHT,
          sx: {
            "& > *:first-child": {
              width: "170px",
            },
          },
        }}
      >
        <Dropdown
          {...COUNTRY_FIELD}
          options={[
            {
              label: "India",
              value: "india",
              key: "india",
              icon: (
                <IconButton disableRipple>
                  <NextImage
                    props={{
                      width: 24,
                      alt: "india_flag",
                      src: INDIA_FLAG,
                      height: 16,
                    }}
                  />
                </IconButton>
              ),
            },
          ]}
        />
        <Divider {...FIELD_DIVIDER} />
        <AutoComplete
          {...(searchProps.autoComplete as CommonObjectType)}
          searchOptions={searchString?.length > 2 ? searchOptions : undefined}
          handleDebouncedInputChange={(debouncedSearchValue: string = "") => {
            setSearchString(debouncedSearchValue);
          }}
          getOptionLabel={(option: AutoCompleteListItem) => {
            return option.title as string;
          }}
          textfieldProps={{
            ...(searchProps.input as CommonObjectType),
            slotProps: {
              input: {
                startAdornment: <SearchIcon color={"primary"} />,
              },
            },
          }}
          styles={{
            autocompleteStyles: {
              width: "100%",
              "& .MuiOutlinedInput-root": {
                height: SEARCH_FIELD_HEIGHT,
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused:not(.Mui-error) fieldset": {
                  borderColor: "transparent",
                },
              },
            },
          }}
          isLoading={apiData?.isLoading || apiData?.isFetchingNextPage}
        />
      </Stack>
    </div>
  );
}

function BreadcumbRibbon({ pathname }: { pathname: string }) {
  const { userType } = useCommonDetails();

  if ([LANDING_URL].includes(pathname)) return null;

  return (
    <>
      <Stack
        stackProps={{
          bgcolor: colorStyles.topRibbonColor,
          minHeight: dimensionStyle.topRibbonHeight,
          className: "w-full px-2 md:px-20 py-2 md:py-0 gap-2 md:gap-0",
          alignItems: "center",
          justifyContent: "space-between",
          direction: "row",
          flexWrap: "wrap",
        }}
      >
        <div className="w-full md:w-1/4">
          <BreadcrumbLink pathname={pathname} />
        </div>
        <div className="w-full md:w-2/4">
          <When condition={userType !== -1}>
            <SearchInput />
          </When>
        </div>
        <div className="w-full md:w-1/4" />
      </Stack>
    </>
  );
}

export default BreadcumbRibbon;
