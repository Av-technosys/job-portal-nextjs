import { FIND_RECRUITER_PAGE_CONFIG, PAGIANTION_LIMIT } from "@/constants";
import {
  useCommonDetails,
  useGetFindRecruiterList,
  useNotification,
  usePagination,
} from "@/services";
import { RecruiterListSortEnum } from "@/types";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  InfinitePagination,
  Stack,
  Table,
  Typography,
  When,
} from "@/components";
import { SearchIcon } from "@/assets";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { getErrorMessageFromAPI } from "@/helper";
import { useDeleteRecruiter } from "@/services/useDeleteRecruiter";

const AdminRecruiterComponent = () => {
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

  const [selectedSort, setSelectedSort] = useState<RecruiterListSortEnum[]>([
    RecruiterListSortEnum.CREATED_DATE_ASC,
  ]);

  const findRecruiterAPIData = useGetFindRecruiterList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
      search: searchString,
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

  const searchProps = {
    input: {
      placeholder: "Search recruiter name",
    },
  };

  const newRecruiterData =
    paginatedInfoData.length > 0
      ? paginatedInfoData.map((item: any) => {
          return { ...item };
        })
      : [];

  const deleteRecruiterMutation = useDeleteRecruiter();
  const { showNotification } = useNotification();
  const { refetchCommonDetails } = useCommonDetails();

  const { SUCCESS } = FIND_STUDENT_PAGE_CONFIG;
  const recruiterDeleteHandler = (id: string) => {
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
              width: "100%",
              direction: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 4 },
              alignItems: "start",
              justifyContent: "space-between",
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
            <FormControl
              sx={{ width: { xs: "20ch", sm: "30ch" } }}
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
          tableType="recruiter"
          columns={[
            {
              field: "id",
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
