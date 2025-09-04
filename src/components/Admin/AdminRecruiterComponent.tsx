import { FIND_RECRUITER_PAGE_CONFIG, PAGIANTION_LIMIT } from "@/constants";
import {
  useCommonDetails,
  useGetFindRecruiterList,
  useGetSearchDetailsAsPerURLOrUserType,
  useNotification,
  usePagination,
} from "@/services";
import { CommonObjectType, RecruiterListSortEnum } from "@/types";
import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
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
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { getErrorMessageFromAPI } from "@/helper";
import { useDeleteRecruiter } from "@/services/useDeleteRecruiter";

const AdminRecruiterComponent = () => {
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

  const [searchString, setSearchString] = useState<string>("");

  const { searchProps } = useGetSearchDetailsAsPerURLOrUserType({
    searchString,
  });

  const newRecruiterData =
    paginatedInfoData.length > 0
      ? paginatedInfoData.map((item: any) => {
          return { ...item, user: item.user.recruiter_profile_id };
        })
      : [];

  console.log("newRecruiterData: ", newRecruiterData);

  const deleteRecruiterMutation = useDeleteRecruiter();
  const { showNotification } = useNotification();
  const { refetchCommonDetails } = useCommonDetails();

  const { SUCCESS } = FIND_STUDENT_PAGE_CONFIG;
  const recruiterDeleteHandler = (id: string) => {
    console.log(id);
    deleteRecruiterMutation.mutate(
      { user: id },
      {
        onSuccess: () => {
          showNotification(SUCCESS);
          refetchCommonDetails();
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      }
    );
  };

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
              {...RECRUITER_LISTING_SORT_DROPDOWN}
              onChange={handleSortChange}
              value={selectedSort?.[0]}
            />
          </Stack>
        </Stack>
      </When>

      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={findRecruiterAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={findRecruiterAPIData?.isFetchingNextPage}
      >
        <Table
          data={newRecruiterData}
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
          deleteHandler={recruiterDeleteHandler}
          isButtonDisabled={deleteRecruiterMutation.isPending}
        />
      </InfinitePagination>
    </>
  );
};

export default AdminRecruiterComponent;
