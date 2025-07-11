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
        className: "border border-black p-4",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack>
        <Typography
          typographyProps={{ children: notification?.body as string }}
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
      >
        <InfinitePagination
          dataLength={paginatedInfoData?.length}
          next={notificationAPIData?.fetchNextPage}
          hasMore={hasMore}
          isFetchingMore={notificationAPIData?.isFetchingNextPage}
        >
          <>
            <When condition={paginatedInfoData?.length > 0}>
              <Stack>
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
