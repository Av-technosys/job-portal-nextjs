import { PAGIANTION_LIMIT } from "@/constants";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { useCommonDetails, useNotification, usePagination } from "@/services";
import { useGetFindStudentList } from "@/services/useGetFindStudent";
import { StudentListSortEnum } from "@/types";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Dropdown,
  InfinitePagination,
  Stack,
  Table,
  Typography,
  When,
} from "@/components";
import { SearchIcon } from "@/assets";
import { useDeleteJobseeker } from "@/services/useDeleteJobseeker";
import { getErrorMessageFromAPI } from "@/helper";

function AdminJobseekerComponent() {
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

  const [selectedSort, setSelectedSort] = useState<StudentListSortEnum[]>([
    StudentListSortEnum.CREATED_DATE_ASC,
  ]);

  const searchProps = {
    input: {
      placeholder: "Search job seeker name",
    },
  };

  const findStudentAPIData = useGetFindStudentList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
      search: searchString,
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

  const jobSeekerNewData =
    paginatedInfoData.length > 0
      ? paginatedInfoData.map((item: any) => {
          return { ...item, user: item.user };
        })
      : [];

  const deleteJobSeekerMutation = useDeleteJobseeker();
  const { showNotification } = useNotification();
  const { refetchCommonDetails } = useCommonDetails();

  const { SUCCESS } = FIND_STUDENT_PAGE_CONFIG;
  const jobSeekerDeleteHandler = (id: string) => {
    deleteJobSeekerMutation.mutate(
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
            <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
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
          data={jobSeekerNewData}
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
          deleteHandler={jobSeekerDeleteHandler}
          isButtonDisabled={deleteJobSeekerMutation.isPending}
        />
      </InfinitePagination>
    </>
  );
}

export default AdminJobseekerComponent;
