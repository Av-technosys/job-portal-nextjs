import { Snackbar, SnackbarProps } from "@mui/material";

function Notification(notificationProps: SnackbarProps) {
  return (
    <>
      <Snackbar {...notificationProps} />
    </>
  );
}

export default Notification;
