import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import fallbackImage from "../assets/NoData.svg";
import { GridColDef } from "@mui/x-data-grid";
import { Skeleton } from "@mui/material";

type DataGridProps = {
  rows: any[];
  columns: GridColDef[];
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  rowCount?: 0;
  hidePagination?: boolean;
  apiRef?: any;
  isFetching?: boolean;
};

type LoaderProps = {
  columns: GridColDef[];
};

export const CustomDataGrid = ({
  rows = [],
  columns,
  setPage,
  rowCount = 0,
  isFetching,
  hidePagination,
  apiRef,
}: DataGridProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    if (setPage) {
      setPage(() => paginationModel.page + 1);
    }
  }, [paginationModel, setPage]);

  return (
    <Box
      sx={{
        marginBlock: "10px",
        "& .MuiDataGrid-overlayWrapper": {
          minHeight: isFetching ? "" : "450px",
        },
      }}
    >
      <DataGrid
        rows={rows || []}
        columns={columns}
        rowHeight={39}
        columnHeaderHeight={39}
        pageSizeOptions={[10]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={rowCount || 0}
        loading={isFetching}
        disableRowSelectionOnClick
        filterMode="server"
        slots={{
          // noRowsOverlay: EmptyTable,
          toolbar: GridToolbar,
          // loadingOverlay: LinearProgress,
        }}
        disableColumnMenu
        disableDensitySelector
        disableColumnFilter
        disableColumnSelector
        hideFooterPagination={hidePagination}
        apiRef={apiRef}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 10,
        //       page: 2,
        //     },
        //   },
        // }}
        // checkboxSelection
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
            // showQuickFilter: showQuickFilter,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        // disableColumnFilter
      />
    </Box>
  );
};

export const DataGridLoader = ({ columns }: LoaderProps) => {
  columns = columns.map((item) => {
    return { ...item, renderCell: () => <Skeleton width="70%" /> };
  });
  const rows = [...Array(10)].map((item, index) => ({ id: index }));

  return (
    <>
      <CustomDataGrid columns={columns} rows={rows} />
    </>
  );
};

/* function EmptyTable() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        paddingBlock: "15px",
      }}
    >
      <img src={fallbackImage} alt="Empty table" />
      <Box>Looks Empty</Box>
    </Box>
  );
} */
