import { FIND_RECRUITER_PAGE_CONFIG, PAGIANTION_LIMIT } from "@/constants";
import {
  useCommonDetails,
  useGetFindRecruiterList,
  useNotification,
  usePagination,
} from "@/services";
import { RecruiterListSortEnum } from "@/types";
import { SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  InfinitePagination,
  Table,
  Typography,
  When,
} from "@/components";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { getErrorMessageFromAPI } from "@/helper";
import { useDeleteRecruiter } from "@/services/useDeleteRecruiter";
import AdminListToolbar from "./AdminListToolbar";

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
        <AdminListToolbar
          countContent={<Typography {...TITLE_COUNT(totalLength)} />}
          titleContent={<Typography {...TITLE_HEADER(totalLength)} />}
          searchValue={searchValue}
          searchPlaceholder={searchProps.input.placeholder}
          onSearchChange={setSearchValue}
          actions={
            <Dropdown
              {...RECRUITER_LISTING_SORT_DROPDOWN}
              onChange={handleSortChange}
              value={selectedSort?.[0]}
            />
          }
        />
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
              field: "email",
              headerName: "Email",
            },
            {
              field: "status",
              headerName: "Status",
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
