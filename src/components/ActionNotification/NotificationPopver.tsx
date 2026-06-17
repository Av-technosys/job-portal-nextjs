import { formatDate } from "@/helper";
import {
  Stack,
  Typography,
  InfinitePagination,
  When,
  Popover,
} from "../common";
import { useCommonDetails, useGetNotification, usePagination } from "@/services";
import { CommonObjectType } from "@/types";
import {
  CANDIATE_APPLICATIONS_PARTIAL_URL,
  DASHBOARD_URL,
  JOB_DETAILS_PARTIAL_URL,
} from "@/constants";
import { isLoggedInUserJobSeeker, isLoggedInUserRecruiter } from "@/helper";
import { useRouter } from "next/router";

function NotificationCard({
  notification,
  onClick,
}: {
  notification: CommonObjectType;
  onClick: () => void;
}) {
  return (
    <Stack
      stackProps={{
        className: "border bg-white border-gray-200 py-2 px-4 rounded-lg",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        onClick,
        role: "button",
        tabIndex: 0,
        sx: {
          cursor: "pointer",
          "&:hover": {
            borderColor: "#007AFF",
          },
        },
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
          }
        },
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
  const router = useRouter();
  const { userType } = useCommonDetails();

  const { paginatedInfoData, hasMore } = usePagination({
    paginatedAPIData: notificationAPIData,
  });

  function getNotificationMetaData(notification: CommonObjectType) {
    return typeof notification?.meta_data === "object" &&
      notification?.meta_data !== null
      ? (notification.meta_data as CommonObjectType)
      : {};
  }

  function handleNotificationClick(notification: CommonObjectType) {
    const metaData = getNotificationMetaData(notification);
    const jobId = Number(metaData?.job_id);

    handleClose();

    if (!Number.isNaN(jobId) && jobId > 0) {
      if (userType !== -1 && isLoggedInUserRecruiter({ userType })) {
        router.push(`${CANDIATE_APPLICATIONS_PARTIAL_URL}/${jobId}`);
        return;
      }

      if (userType !== -1 && isLoggedInUserJobSeeker({ userType })) {
        router.push(`${JOB_DETAILS_PARTIAL_URL}/${jobId}`);
        return;
      }
    }

    router.push(DASHBOARD_URL);
  }

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
                      onClick={() => handleNotificationClick(item)}
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
                onClick={handleClose}
              />
            </When>
          </>
        </InfinitePagination>
      </Popover>
    </>
  );
}

export default NotificationPopover;
