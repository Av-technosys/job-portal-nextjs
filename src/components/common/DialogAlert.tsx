import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialogDelete({
  open,
  setOpen,
  deleteItemType,
  deleteHandler,
  isButtonDisabled,
}: any) {
  const handleClose = () => setOpen(false);

  const handleDeleteClick = () => {
    deleteHandler();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`Are You Sure For Delete ${deleteItemType}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deleting this {deleteItemType} is a permanent action and cannot be
          undone. All associated data will be removed from the system. Please
          confirm if you are sure you want to proceed with this deletion.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          className="text-red-500"
          onClick={handleDeleteClick}
          disabled={isButtonDisabled}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
