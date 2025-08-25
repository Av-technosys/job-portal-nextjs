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
import { MenuList, IconButton, Menuhiddendrop, Stack } from "../common";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { TableProps } from "@/types";
import AlertDialog from "./DialogAlert";

function Table({ columns, data }: TableProps) {
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

  return (
    <>
      <TableContainer component={Paper}>
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
              <AlertDialog user={selectedUser} open={open} setOpen={setOpen} />
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
                            handleIconButtonClick(event, row.user)
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
      <Menuhiddendrop
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
      </Menuhiddendrop>
    </>
  );
}

export default Table;
