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

function Table({ columns, data, deleteHandler, isButtonDisabled }: TableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconButtonClick = (
    event: React.MouseEvent<HTMLElement>,
    userValue: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userValue);
  };

  const handlemenuclick = (key: string) => {
    if (key === "delete") {
      setOpen(true);
      setAnchorEl(null);
    }
  };

  const handleOnDelete = () => {
    console.log("selectedUser: ", selectedUser);
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
                              handleIconButtonClick(event, row.id)
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
