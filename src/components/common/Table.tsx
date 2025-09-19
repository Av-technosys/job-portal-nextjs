"use client";
import React, { useState } from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import {
  MenuList,
  IconButton,
  Stack,
  MenuHiddenDrop,
  When,
  Loader,
} from "../common";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { TableProps } from "@/types";
import AlertDialogDelete from "./DialogAlert";
import AdminPannelSidebar from "./AdminPannelSidebar";
import { useActivateUser, userId } from "@/services/useActivateUser";
import { NOTIFICATION_CONFIG_USER } from "@/constants";
import { useNotification } from "@/services";
import { getErrorMessageFromAPI } from "@/helper";
import { useDeactivateUser } from "@/services/useDeactivateUser";
import { useQueryClient } from "@tanstack/react-query";

function Table({
  columns,
  data,
  tableType,
  deleteHandler,
  isButtonDisabled,
}: TableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [sideBarStatus, setSideBarStatus] = useState<boolean | any>(false);
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconButtonClick = (
    event: React.MouseEvent<HTMLElement>,
    userValue: any,
    userId: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userValue);
    setUserId(userId);
  };

  const ActivateUserMutate = useActivateUser({
    mutationConfig: {
      onSuccess: async () => {
        showNotification(NOTIFICATION_CONFIG_USER.ACTIVATE);
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["jobseeker_full_details"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["recruiter_full_details"],
          }),
        ]);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  const DeactivateUserMutate = useDeactivateUser({
    mutationConfig: {
      onSuccess: async () => {
        showNotification(NOTIFICATION_CONFIG_USER.DEACTIVATE_USER);
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["jobseeker_full_details"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["recruiter_full_details"],
          }),
        ]);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  const handlemenuclick = (key: string) => {
    if (key === "delete") {
      setOpen(true);
      setAnchorEl(null);
    } else if (key === "view") {
      setSideBarStatus(!sideBarStatus);
    } else if (key === "activate") {
      ActivateUserMutate.mutate({
        id: userId as userId,
      });
    } else {
      DeactivateUserMutate.mutate({
        id: userId as userId,
      });
    }
  };

  const handleOnDelete = () => {
    deleteHandler(selectedUser);
    setOpen(false);
  };

  return (
    <>
      {(ActivateUserMutate.isPending || DeactivateUserMutate.isPending) && (
        <Loader
          loaderProps={{
            open: true,
          }}
        />
      )}

      <Stack
        stackProps={{
          width: "100%",
          overflow: { xs: "scrollX", md: "hidden" },
        }}
      >
        <AdminPannelSidebar
          sideBarStatus={sideBarStatus}
          setSideBarStatus={setSideBarStatus}
          selectedUser={userId}
          UserType={tableType}
        />
        <TableContainer
          // sx={{ width: { xs: "140%", md: "100%" } }}
          sx={{ width: "100%" }}
          component={Paper}
        >
          <MUITable>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={`ja-TabelCellHeader${column.field}`}>
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {open && (
                <AlertDialogDelete
                  open={open}
                  setOpen={setOpen}
                  deleteItemType={"User"}
                  deleteHandler={handleOnDelete}
                  isButtonDisabled={isButtonDisabled}
                />
              )}

              {data?.map((row, index) => (
                <TableRow key={`ja_TableRow${index}`}>
                  {columns.map((column) => (
                    <TableCell key={`ja-TabelCellFeild${column.field}`}>
                      {row[column.field] &&
                      tableType != "Contact-details" &&
                      column.field == "first_name" ? (
                        <Stack
                          stackProps={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {row[column.field]}
                          <IconButton
                            onClick={(event) =>
                              handleIconButtonClick(event, row.id, row.user)
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Stack>
                      ) : column.field == "gender" ? (
                        <Stack
                          stackProps={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <When condition={row[column.field] === 0}>Male</When>
                          <When condition={row[column.field] === 1}>
                            Female
                          </When>
                          <When condition={row[column.field] === 2}>Other</When>
                        </Stack>
                      ) : (
                        row[column.field]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </MUITable>
        </TableContainer>
      </Stack>
      <MenuHiddenDrop
        handleClose={handleClose}
        anchorEl={anchorEl}
        styles={{
          paperStyles: {
            width: "150px",
          },
        }}
      >
        <MenuList
          onClick={handlemenuclick}
          menuItems={[
            {
              label: "View",
              key: "view",
            },
            {
              label: "Activate",
              key: "activate",
            },
            {
              label: "Deactive",
              key: "deactive",
            },
            {
              label: "Delete",
              key: "delete",
            },
          ]}
        />
      </MenuHiddenDrop>
    </>
  );
}

export default Table;
