import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useCommonDetails, useNotification } from "@/services";
import { getErrorMessageFromAPI } from "@/helper";
import { FIND_STUDENT_PAGE_CONFIG } from "@/constants/findstudent";
import { useDeleteRecruiterOrJobseeker } from "@/services/useDeleteRecruiterOrJobseeker";
import { useDeleteSubject } from "@/services/useDeleteSubject";

export default function AlertDialog({ open, setOpen, user, subject }: any) {
  const deleteUserMutation = useDeleteRecruiterOrJobseeker();
  const deleteSubjectMutation = useDeleteSubject();

  const { showNotification } = useNotification();
  const { refetchCommonDetails } = useCommonDetails();

  const handleClose = () => setOpen(false);

  const { SUCCESS, SUCCESS_SUBJECT } = FIND_STUDENT_PAGE_CONFIG;

  const deleteHandler = () => {
    if (!subject) {
      deleteUserMutation.mutate(
        { user },
        {
          onSuccess: () => {
            showNotification(SUCCESS);
            setOpen(false);
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
    } else {
      deleteSubjectMutation.mutate(
        { user },
        {
          onSuccess: () => {
            showNotification(SUCCESS_SUBJECT);
            setOpen(false);
          },
          onError: (error) => {
            showNotification({
              ...getErrorMessageFromAPI(error),
            });
            console.error(error, "error");
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {`Are You Sure For Delete ${subject ? "Subject" : "User"}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deleting this {subject ? "Subject" : "User"} is a permanent action and
          cannot be undone. All associated data will be removed from the system.
          Please confirm if you are sure you want to proceed with this deletion.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          className="text-red-500"
          onClick={deleteHandler}
          disabled={
            deleteUserMutation.isPending || deleteSubjectMutation.isPending
          }
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
