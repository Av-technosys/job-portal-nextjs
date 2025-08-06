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
import { MenuList, IconButton, Menuhiddendrop } from "../common";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { TableProps } from "@/types";
import AlertDialog from "./DialogAlert";

function Table({ columns, data }: TableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlemenuclick = () => {
    console.log("haan delete btn dba hai...");
    setOpen(true);
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
            {open && <AlertDialog open={open} setOpen={setOpen} />}

            {data.map((row, index) => (
              <TableRow key={`ja_TableRow${index}`}>
                {columns.map((column) => (
                  <TableCell key={`ja-TabelCellFeild${column.field}`}>
                    {row[column.field]}
                    {column.field == "first_name" && (
                      <IconButton onClick={handleIconButtonClick}>
                        <MoreVertIcon className="ml-3" />
                      </IconButton>
                    )}
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
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      </TableContainer>
    </>
  );
}

export default Table;
