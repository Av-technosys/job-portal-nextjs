import { PAGIANTION_LIMIT } from "@/constants";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { useCommonDetails, useNotification, usePagination } from "@/services";
import { useGetFindStudentList } from "@/services/useGetFindStudent";
import { StudentListSortEnum } from "@/types";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Dropdown,
  InfinitePagination,
  Table,
  Typography,
  When,
} from "@/components";
import { useDeleteJobseeker } from "@/services/useDeleteJobseeker";
import { getErrorMessageFromAPI } from "@/helper";
import AdminListToolbar from "./AdminListToolbar";

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
        <AdminListToolbar
          countContent={<Typography {...TITLE_COUNT(totalLength)} />}
          titleContent={<Typography {...TITLE_HEADER(totalLength)} />}
          searchValue={searchValue}
          searchPlaceholder={searchProps.input.placeholder}
          onSearchChange={setSearchValue}
          actions={
            <Dropdown
              {...STUDENT_LISTING_SORT_DROPDOWN}
              onChange={handleSortChange}
              value={selectedSort?.[0]}
            />
          }
        />
      </When>

      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={findStudentAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={findStudentAPIData?.isFetchingNextPage}
      >
        <Table
          data={jobSeekerNewData}
          tableType="jobseeker"
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
