import React from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import { TableProps } from "@/types";

function Table({ columns, data }: TableProps) {
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
            {data.map((row, index) => (
              <TableRow key={`ja_TableRow${index}`}>
                {columns.map((column) => (
                  <TableCell key={`ja-TabelCellFeild${column.field}`}>
                    {row[column.field]}
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
