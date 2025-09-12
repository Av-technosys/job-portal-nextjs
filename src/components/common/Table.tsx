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
import { MenuList, IconButton, Stack, MenuHiddenDrop } from "../common";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { TableProps } from "@/types";
import AlertDialogDelete from "./DialogAlert";
import AdminPannelSidebar from "./AdminPannelSidebar";

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

  const handlemenuclick = (key: string) => {
    if (key === "delete") {
      setOpen(true);
      setAnchorEl(null);
    } else {
      setSideBarStatus(!sideBarStatus);
    }
  };

  const handleOnDelete = () => {
    deleteHandler(selectedUser);
    setOpen(false);
  };

  return (
    <>
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
          sx={{ width: { xs: "140%", md: "100%" } }}
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

              {data.map((row, index) => (
                <TableRow key={`ja_TableRow${index}`}>
                  {columns.map((column) => (
                    <TableCell key={`ja-TabelCellFeild${column.field}`}>
                      {row[column.field] && column.field == "first_name" ? (
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
