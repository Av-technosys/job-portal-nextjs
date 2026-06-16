import {
  Dropdown,
  InfinitePagination,
  Stack,
  Table,
  Typography,
} from "@/components";
import { useGetContactDetails } from "@/services/useGetContactDetailsInfo";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AdminListToolbar from "./AdminListToolbar";

enum AdminCreatedDateSortEnum {
  CREATED_DATE_ASC = "created_date",
  CREATED_DATE_DESC = "-created_date",
}

const CREATED_DATE_SORT_DROPDOWN = {
  selectProps: {
    name: "sortby",
  },
  formControlProps: {
    sx: {
      minWidth: 150,
    },
  },
  inputLabelProps: {
    children: "Sort By ",
    shrink: true,
  },
  options: [
    {
      label: "Created at (ASC)",
      key: "created_date",
      value: AdminCreatedDateSortEnum.CREATED_DATE_ASC,
    },
    {
      label: "Created at (DESC)",
      key: "-created_date",
      value: AdminCreatedDateSortEnum.CREATED_DATE_DESC,
    },
  ],
};

const getCreatedTime = (item: Record<string, unknown>) => {
  const dateValue =
    item.created_date || item.created_at || item.created || item.updated_date;
  const time = new Date(String(dateValue || "")).getTime();
  return Number.isFinite(time) ? time : 0;
};

const doesItemMatchSearch = (
  item: Record<string, unknown>,
  searchString: string
) => {
  if (!searchString) return true;

  const normalizedSearch = searchString.toLowerCase();
  return [
    item.first_name,
    item.last_name,
    item.email,
    item.phone_number,
    item.subject,
    item.message,
  ]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(normalizedSearch));
};

const AdminContactDetailsComponent = () => {
  const [searchString, setSearchString] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedSort, setSelectedSort] = useState<AdminCreatedDateSortEnum[]>([
    AdminCreatedDateSortEnum.CREATED_DATE_DESC,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchString(searchValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const ContactDetails = useGetContactDetails({
    queryFnParams: {
      search: searchString,
      sort: selectedSort,
    },
  });

  const allContactDetails = useMemo(() => {
    const contactDetailsData = ContactDetails?.data?.data;
    const contactDetails = Array.isArray(contactDetailsData)
      ? contactDetailsData
      : [];

    return contactDetails
      .filter((item) =>
        doesItemMatchSearch(item as Record<string, unknown>, searchString)
      )
      .sort((firstItem, secondItem) => {
        const firstTime = getCreatedTime(firstItem as Record<string, unknown>);
        const secondTime = getCreatedTime(secondItem as Record<string, unknown>);

        return selectedSort[0] === AdminCreatedDateSortEnum.CREATED_DATE_DESC
          ? secondTime - firstTime
          : firstTime - secondTime;
      });
  }, [ContactDetails?.data?.data, searchString, selectedSort]);

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as AdminCreatedDateSortEnum[]);
  };

  return (
    <>
      <AdminListToolbar
        countContent={
          <Typography
            typographyProps={{
              children: allContactDetails.length,
              variant: "h5",
            }}
          />
        }
        titleContent={
          <Typography
            typographyProps={{
              children: "Total Contact Details",
              variant: "body2",
            }}
          />
        }
        searchValue={searchValue}
        searchPlaceholder="Search contact details"
        onSearchChange={setSearchValue}
        actions={
          <Dropdown
            {...CREATED_DATE_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
          />
        }
      />

      <InfinitePagination dataLength={null}>
        <Stack>
        <Table
          data={allContactDetails}
          tableType="Contact-details"
          columns={[
            {
              field: "id",
              headerName: "Id",
            },
            {
              field: "first_name",
              headerName: "First name",
            },
            {
              field: "last_name",
              headerName: "Last name",
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
              field: "subject",
              headerName: "Subject",
            },
            {
              field: "message",
              headerName: "Message",
            },
          ]}
        />
        </Stack>
      </InfinitePagination>
    </>
  );
};

export default AdminContactDetailsComponent;
