import { formatDate } from "@/helper";
import {
  Stack,
  Typography,
  InfinitePagination,
  When,
  Popover,
} from "../common";
import { useGetNotification, usePagination } from "@/services";
import { CommonObjectType } from "@/types";

function NotificationCard({
  notification,
}: {
  notification: CommonObjectType;
}) {
  return (
    <Stack
      stackProps={{
        className: "border bg-white border-gray-200 py-2 px-4 rounded-lg",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack stackProps={{ gap: 2, width: "100%" }}>
        <Typography
          typographyProps={{ children: notification?.body as string }}
        />
        <Typography
          typographyProps={{
            style: { fontSize: "12px", textAlign: "right" },
            children: formatDate(
              notification?.created_date?.toString()
            ) as string,
          }}
        />
      </Stack>
    </Stack>
  );
}

function NotificationPopover({
  open,
  anchorEl,
  handleClose,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}) {
  const notificationAPIData = useGetNotification();

  const { paginatedInfoData, hasMore } = usePagination({
    paginatedAPIData: notificationAPIData,
  });

  // no-op here; InfinitePagination will handle scroll-based fetching when height is provided

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{ sx: { width: 360 } }}
      >
        <InfinitePagination
          dataLength={paginatedInfoData?.length}
          next={notificationAPIData?.fetchNextPage}
          hasMore={hasMore}
          isFetchingMore={notificationAPIData?.isFetchingNextPage}
          height={520}
        >
          <>
            <When condition={paginatedInfoData?.length > 0}>
              <Stack
                stackProps={{ bgcolor: "#f8f9f8", padding: 1.5, gap: 1.5 }}
              >
                {paginatedInfoData?.map((item) => {
                  return (
                    <NotificationCard
                      notification={item}
                      key={`notification-${item?.id}`}
                    />
                  );
                })}
              </Stack>
            </When>
            <When condition={paginatedInfoData?.length === 0}>
              <NotificationCard
                notification={{
                  body: "Nothing to show here !!!",
                }}
              />
            </When>
          </>
        </InfinitePagination>
      </Popover>
    </>
  );
}

export default NotificationPopover;
