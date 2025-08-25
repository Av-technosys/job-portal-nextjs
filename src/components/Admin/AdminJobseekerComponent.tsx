import { PAGIANTION_LIMIT } from "@/constants";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import {
  useGetSearchDetailsAsPerURLOrUserType,
  usePagination,
} from "@/services";
import { useGetFindStudentList } from "@/services/useGetFindStudent";
import { CommonObjectType, StudentListSortEnum } from "@/types";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import {
  AutoComplete,
  Button,
  Dropdown,
  InfinitePagination,
  Paper,
  Stack,
  Table,
  Tabs,
  Typography,
  When,
} from "@/components";
import { SearchIcon } from "@/assets";

function AdminJobseekerComponent() {
  const [selectedSort, setSelectedSort] = useState<StudentListSortEnum[]>([
    StudentListSortEnum.CREATED_DATE_ASC,
  ]);

  const findStudentAPIData = useGetFindStudentList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
    },
  });

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as StudentListSortEnum[]);
  };

  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: findStudentAPIData,
  });

  const { TITLE_COUNT, TITLE_HEADER, STUDENT_LISTING_SORT_DROPDOWN } =
    FIND_STUDENT_PAGE_CONFIG;

  const [searchString, setSearchString] = useState<string>("");

  const { searchProps } = useGetSearchDetailsAsPerURLOrUserType({
    searchString,
  });

  const newData =
    paginatedInfoData.length > 0
      ? paginatedInfoData.map((item: any) => {
          return { ...item, user: item.user };
        })
      : [];

  return (
    <>
      <When condition={true}>
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: "baseline",
            justifyContent: "space-between",
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

          <Stack
            stackProps={{
              direction: "row",
              gap: 4,
              alignItems: "center",
            }}
          >
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
              {...STUDENT_LISTING_SORT_DROPDOWN}
              onChange={handleSortChange}
              value={selectedSort?.[0]}
            />
          </Stack>
        </Stack>
      </When>

      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={findStudentAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={findStudentAPIData?.isFetchingNextPage}
      >
        <Table
          data={newData}
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
              field: "email",
              headerName: "Email",
            },
            {
              field: "date_of_birth",
              headerName: "DOB",
            },
            {
              field: "gender",
              headerName: "Gender",
            },
            {
              field: "experience",
              headerName: "Experience",
            },
          ]}
        />
      </InfinitePagination>
    </>
  );
}

export default AdminJobseekerComponent;
