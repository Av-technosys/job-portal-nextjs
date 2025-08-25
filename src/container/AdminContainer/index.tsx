import {
  AccountBalanceIcon,
  BusinessIcon,
  PeopleIcon,
  PersonIcon,
  SchoolIcon,
  SearchIcon,
} from "@/assets";
import {
  AutoComplete,
  Dropdown,
  InfinitePagination,
  Paper,
  Stack,
  Table,
  Tabs,
  Typography,
  When,
} from "@/components";
import {
  ADMIN_PAGE_BODY_CONFIG,
  FIND_RECRUITER_PAGE_CONFIG,
  PAGIANTION_LIMIT,
} from "@/constants";
import {
  useCommonDetails,
  useGetFindRecruiterList,
  useGetSearchDetailsAsPerURLOrUserType,
  usePagination,
} from "@/services";
import { CommonObjectType, RecruiterListSortEnum } from "@/types";
import { SelectChangeEvent } from "@mui/material";
import React, { useMemo, useState } from "react";

function AdminContainer() {
  const { userType } = useCommonDetails();

  const { WELCOME_MESSAGE, TAB_TITLE } = ADMIN_PAGE_BODY_CONFIG;

  const statsData = [
    {
      icon: <PeopleIcon fontSize="large" />,
      count: "1K",
      label: "Total Users",
      bgColor: "#FFE2E5",
    },
    {
      icon: <BusinessIcon fontSize="large" />,
      count: "1K",
      label: "Recruiter count",
      bgColor: "#DCFCE7",
    },
    {
      icon: <PersonIcon fontSize="large" />,
      count: "1K",
      label: "Student Count",
      bgColor: "#DCFCE7",
    },
    {
      icon: <SchoolIcon fontSize="large" />,
      count: "1K",
      label: "Student Count",
      bgColor: "#FFC1B2",
    },
    {
      icon: <AccountBalanceIcon fontSize="large" />,
      count: "1K",
      label: "Student Count",
      bgColor: "#DCFCE7",
    },
  ];

  const tabItems = useMemo(() => {
    return [
      {
        label: "Recruiter",
        value: "generalInformation",
        key: "generalInformation",
        children: <Personal />,
      },
      {
        label: "Students",
        value: "profile",
        key: "job-seeker-profile",
        children: <StudentProfile />,
      },
      {
        label: "Assessments",
        value: "additionalInformation",
        key: "additionalInformation",
        children: <AdditonalInformation />,
      },
    ];
  }, []);

  if (userType === -1) return null;
  return (
    <>
      {/* <When condition={isLoggedInUserAdmin({ userType })}> */}
      <When condition={true}>
        <Stack
          stackProps={{
            className: "mt-8",
            direction: "column",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
            gap: 4,
          }}
        >
          <Typography {...WELCOME_MESSAGE("Admin")} />

          <Stack stackProps={{ direction: "row", gap: 6, flexWrap: "wrap" }}>
            {statsData.map((item, index) => {
              return (
                <Paper
                  key={index}
                  paperProps={{
                    sx: {
                      padding: 4,
                      background: item.bgColor,
                      width: "fit-content",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <Stack
                    stackProps={{
                      direction: "column",
                      gap: 1,
                      minWidth: { xs: "100%", md: "100px" },
                    }}
                  >
                    {item.icon}
                    <Typography
                      typographyProps={{
                        children: item.count,
                      }}
                    />
                    <Typography
                      typographyProps={{
                        children: item.label,
                      }}
                    />
                  </Stack>
                </Paper>
              );
            })}
          </Stack>

          <Typography {...TAB_TITLE} />

          <Tabs
            items={tabItems}
            tabsProps={{
              defaultValue: tabItems?.[0].key,
              sx: {
                borderBottom: 1,
                borderColor: "divider",
                marginBottom: 2,
              },
            }}
          />
        </Stack>
      </When>
    </>
  );
}

export default AdminContainer;

function Personal() {
  const [selectedSort, setSelectedSort] = useState<RecruiterListSortEnum[]>([
    RecruiterListSortEnum.CREATED_DATE_ASC,
  ]);

  const findRecruiterAPIData = useGetFindRecruiterList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
    },
  });

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as RecruiterListSortEnum[]);
  };

  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: findRecruiterAPIData,
  });

  const { TITLE_COUNT, TITLE_HEADER, RECRUITER_LISTING_SORT_DROPDOWN } =
    FIND_RECRUITER_PAGE_CONFIG;

  const [searchString] = useState<string>("");

  const { searchProps } = useGetSearchDetailsAsPerURLOrUserType({
    searchString,
  });

  return (
    <>
      <When condition={totalLength !== 0}>
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: "baseline",
            justifyContent: "space-between", // Ensures space between text and dropdown
            width: "100%",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              gap: 1,
              alignItems: "baseline",
            }}
          >
            <Typography {...TITLE_COUNT(totalLength)} />
            <Typography {...TITLE_HEADER(totalLength)} />
          </Stack>

          <AutoComplete
            // {...(searchProps.autoComplete as CommonObjectType)}
            // searchOptions={searchString?.length > 2 ? searchOptions : undefined}
            // handleDebouncedInputChange={(debouncedSearchValue: string = "") => {
            //   setSearchString(debouncedSearchValue);
            // }}
            // getOptionLabel={(option: AutoCompleteListItem) => {
            //   return option.title as string;
            // }}
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
                minWidth: "252px",
                "& .MuiOutlinedInput-root": {
                  height: "50px",
                  // "& fieldset": {
                  //   borderColor: "transparent",
                  // },
                  // "&:hover fieldset": {
                  //   borderColor: "transparent",
                  // },
                  // "&.Mui-focused:not(.Mui-error) fieldset": {
                  //   borderColor: "transparent",
                  // },
                },
              },
            }}
            // isLoading={apiData?.isLoading || apiData?.isFetchingNextPage}
          />

          <Dropdown
            {...RECRUITER_LISTING_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
          />
        </Stack>
      </When>

      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={findRecruiterAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={findRecruiterAPIData?.isFetchingNextPage}
      >
        <Table
          data={paginatedInfoData}
          // }
          columns={[
            {
              field: "user",
              headerName: "Id",
            },
            {
              field: "first_name",
              headerName: "Name",
            },
            {
              field: "industry_type",
              headerName: "Industry Type",
            },
            {
              field: "city",
              headerName: "City",
            },
            {
              field: "state",
              headerName: "State",
            },
          ]}
        />
      </InfinitePagination>
    </>
  );
}
function StudentProfile() {
  return <>StudentProfile</>;
}
function AdditonalInformation() {
  return <>AdditonalInformation</>;
}
