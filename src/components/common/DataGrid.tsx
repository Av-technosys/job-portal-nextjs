import React from "react";

import { DataGridPro as MUIDataGrid } from "@mui/x-data-grid-pro";

import { TableProps } from "@/types";

function DataGridPro({ columns, data }: TableProps) {
  return (
    <>
      {/* <MUIDataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      /> */}
    </>
  );
}

export default DataGridPro;
