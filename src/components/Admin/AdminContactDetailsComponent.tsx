import { InfinitePagination, Stack, Table } from "@/components";
import { useGetContactDetails } from "@/services/useGetContactDetailsInfo";

const AdminContactDetailsComponent = () => {
  const ContactDetails = useGetContactDetails();
  const allContactDetails = ContactDetails?.data?.data;

  return (
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
  );
};

export default AdminContactDetailsComponent;
