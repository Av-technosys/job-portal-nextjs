import { NotificationIcon } from "@/assets";
import { isLocalHost } from "@/helper";
import {
  getInfiniteChatMessageQueryOptions,
  getInfiniteNotificationQueryOptions,
  useFirebaseNotification,
  useNotification,
} from "@/services";
import { useEffect, useRef, useState } from "react";
import { Badge, IconButton } from "../common";
import NotificationPopover from "./NotificationPopver";
import { useQueryClient } from "@tanstack/react-query";

function ActionNotification() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [highlightIcon, setHighlightIcon] = useState(false);
  const open = Boolean(anchorEl);
  const { onMessage, requestPermission } = useFirebaseNotification();
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const messageRef = useRef({
    unSubscribe: () => {},
    // This is added bcz in localhost (!true => false), next js executes this 2 times & 2 API calls were requested.
    // In Prod, this will be !false => true
    isMounted: !isLocalHost(),
  } as {
    unSubscribe: () => void;
    isMounted: boolean;
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setHighlightIcon(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function refetchNotification() {
    queryClient.invalidateQueries({
      queryKey: getInfiniteNotificationQueryOptions().queryKey,
    });
  }

  function refetchMessage(applicationId: number) {
    queryClient.invalidateQueries({
      queryKey: getInfiniteChatMessageQueryOptions({ applicationId }).queryKey,
    });
  }

  useEffect(() => {
    if (messageRef?.current?.isMounted) {
      try {
        requestPermission().then(() => {
          messageRef.current.unSubscribe = onMessage(function (payload) {
            showNotification({
              message: payload?.notification?.body as string,
            });

            // When message is received from bell, refetch notification
            if (payload?.data?.topic?.includes("bell_")) {
              refetchNotification();
              setHighlightIcon(true);
            } else if (payload?.data?.topic?.includes("message_")) {
              // When message is received from message, refetch message
              const applicationId = payload?.data?.topic?.split("_")[1];
              if (applicationId) {
                refetchMessage(Number(applicationId));
              }
            }
          });
        });
      } catch (e) {
        console.error(e);
      }
    }
    messageRef.current.isMounted = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge color="primary" variant="dot" invisible={!highlightIcon}>
          <NotificationIcon />
        </Badge>
      </IconButton>
      <NotificationPopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
}

export default ActionNotification;
