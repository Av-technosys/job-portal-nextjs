import { PAGIANTION_LIMIT } from "@/constants";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { useCommonDetails, useNotification, usePagination } from "@/services";
import { useGetAdminList } from "@/services/useAdminList";
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
import { useDeleteAdmin } from "@/services/useDeleteAdmin";
import { getErrorMessageFromAPI } from "@/helper";

function AdminComponent() {
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
      placeholder: "Search Admin name",
    },
  };

  const adminAPIData = useGetAdminList({
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
    paginatedAPIData: adminAPIData,
  });

  const { TITLE_COUNT, TITLE_HEADER, STUDENT_LISTING_SORT_DROPDOWN } =
    FIND_STUDENT_PAGE_CONFIG;

  const jobSeekerNewData =
    paginatedInfoData.length > 0
      ? paginatedInfoData.map((item: any) => {
          return { ...item, user: item.user };
        })
      : [];

  const deleteAdminMutation = useDeleteAdmin();
  const { showNotification } = useNotification();
  const { refetchCommonDetails } = useCommonDetails();

  const { SUCCESS } = FIND_STUDENT_PAGE_CONFIG;
  const adminDeleteHandler = (id: string) => {
    deleteAdminMutation.mutate(
      { user: id },
      {
        onSuccess: () => {
          showNotification({
            message: "Admin deleted successfully",
          });
          refetchCommonDetails();
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error("Admin delete error:", error);
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
                alignItems: "center",
              }}
            >
              <Typography {...TITLE_COUNT(totalLength)} />
              <Typography {...TITLE_HEADER(totalLength)} />
            </Stack>

            <Stack
              stackProps={{ direction: { xs: "column", sm: "row" }, gap: 1 }}
            >
              <FormControl
                sx={{ m: 1, width: { xs: "20ch", sm: "30ch" } }}
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
                {...STUDENT_LISTING_SORT_DROPDOWN}
                onChange={handleSortChange}
                value={selectedSort?.[0]}
              />
            </Stack>
          </Stack>
        </Stack>
      </When>

      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={adminAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={adminAPIData?.isFetchingNextPage}
      >
        <Table
          data={jobSeekerNewData}
          tableType="admin"
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
              field: "email",
              headerName: "Email",
            },
            {
              field: "phone_number",
              headerName: "Phone Number",
            },
            {
              field: "is_active",
              headerName: "Status",
            },
          ]}
          deleteHandler={adminDeleteHandler}
          isButtonDisabled={deleteAdminMutation.isPending}
        />
      </InfinitePagination>
    </>
  );
}

export default AdminComponent;
