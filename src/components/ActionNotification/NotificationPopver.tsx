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
import { useRouter } from "next/router";
import {
  CANDIATE_APPLICATIONS_PARTIAL_URL,
  DASHBOARD_URL,
  MY_APPLIED_JOBS_URL,
} from "@/constants";

// Notification type IDs from Django constants
const NOTIFICATION_TYPE = {
  NEW_JOB_APPLICATION: 0,        // recruiter receives this when someone applies
  JOB_APPLICATION_COMMUNICATION: 1, // job seeker receives updates on their application
} as const;

function getRedirectUrl(notification: CommonObjectType): string {
  const type = notification?.type;
  const metaData = notification?.meta_data as { job_id?: number } | null;

  if (type === NOTIFICATION_TYPE.NEW_JOB_APPLICATION && metaData?.job_id) {
    // Recruiter: go to the specific candidate-applications page for that job
    return `${CANDIATE_APPLICATIONS_PARTIAL_URL}/${metaData.job_id}`;
  }

  if (type === NOTIFICATION_TYPE.JOB_APPLICATION_COMMUNICATION) {
    // Job seeker: go to their applied jobs list
    return MY_APPLIED_JOBS_URL;
  }

  // Fallback: dashboard home
  return DASHBOARD_URL;
}

function NotificationCard({
  notification,
  onClick,
}: {
  notification: CommonObjectType;
  onClick?: () => void;
}) {
  const isClickable = notification?.id !== undefined;

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`border bg-white border-gray-200 rounded-lg px-4 py-3 transition-all duration-150 ${
        isClickable
          ? "cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-sm active:scale-[0.99]"
          : ""
      }`}
    >
      <Stack stackProps={{ gap: 0.5, width: "100%" }}>
        {/* Read status dot + body */}
        <div className="flex items-start gap-2">
          {isClickable && !notification?.read_status && (
            <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
          )}
          <Typography
            typographyProps={{
              children: notification?.body as string,
              sx: {
                fontSize: "0.875rem",
                color: "#334155",
                fontWeight: notification?.read_status ? 400 : 600,
                lineHeight: 1.5,
              },
            }}
          />
        </div>
        {/* Timestamp + chevron */}
        {notification?.created_date && (
          <div className="flex items-center justify-between mt-1">
            <Typography
              typographyProps={{
                sx: { fontSize: "0.75rem", color: "#94a3b8" },
                children: formatDate(
                  notification?.created_date?.toString()
                ) as string,
              }}
            />
            {isClickable && (
              <span className="text-indigo-400 text-xs font-medium flex items-center gap-0.5">
                View
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            )}
          </div>
        )}
      </Stack>
    </div>
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

  const { paginatedInfoData, hasMore } = usePagination({
    paginatedAPIData: notificationAPIData,
  });

  function handleNotificationClick(notification: CommonObjectType) {
    const url = getRedirectUrl(notification);
    handleClose();
    router.push(url);
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
        PaperProps={{
          sx: {
            width: 360,
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
            overflow: "hidden",
          },
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
          <span className="text-sm font-semibold text-slate-800">Notifications</span>
          {paginatedInfoData?.length > 0 && (
            <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
              {paginatedInfoData.filter((n) => !n?.read_status).length} new
            </span>
          )}
        </div>

        <InfinitePagination
          dataLength={paginatedInfoData?.length}
          next={notificationAPIData?.fetchNextPage}
          hasMore={hasMore}
          isFetchingMore={notificationAPIData?.isFetchingNextPage}
          height={480}
        >
          <>
            <When condition={paginatedInfoData?.length > 0}>
              <Stack
                stackProps={{ bgcolor: "#f8fafc", padding: 1.5, gap: 1 }}
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
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <p className="text-sm text-slate-400 font-medium">No notifications yet</p>
                <p className="text-xs text-slate-300 mt-1">You&apos;re all caught up!</p>
              </div>
            </When>
          </>
        </InfinitePagination>
      </Popover>
    </>
  );
}

export default NotificationPopover;
