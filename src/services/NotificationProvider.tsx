import { Notification } from "@/components";
import { ShowNotificationProps } from "@/types";
import { createContext, useCallback, useState } from "react";

export const NotificationContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showNotification: ({ message: string }: ShowNotificationProps) => {},
  hideNotification: () => {},
});

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  const hideNotification = useCallback(() => {
    setNotification({ ...notification, open: false });
  }, [notification]);

  const showNotification = useCallback(
    ({ message, duration = 3000 }: ShowNotificationProps) => {
      setNotification({ open: true, message });
      setTimeout(() => {
        hideNotification();
      }, duration);
    },
    [hideNotification]
  );

  return (
    <NotificationContext.Provider
      value={{ hideNotification, showNotification }}
    >
      <Notification
        {...notification}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
