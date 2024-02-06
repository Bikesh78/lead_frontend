import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetLeadsQuery } from "../../redux/api/leadApi";
import useModal from "../../hooks/useModal";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  DataGridLoader,
  CustomDataGrid,
} from "../../components/CustomDataGrid";
import dayjs from "dayjs";
import { ActionButton } from "../../components/ActionButton";

export default function Lead() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading: queryLoading,
    isFetching: queryFetching,
  } = useGetLeadsQuery(page);

  const columns: GridColDef[] = [
    {
      flex: 1,
      field: "lead_name",
      headerName: "Lead Name",
      editable: false,
    },
    {
      flex: 1,
      field: "email",
      headerName: "Email",
      editable: false,
    },
    {
      flex: 1,
      field: "lead_status",
      headerName: "Lead Status",
      editable: false,
    },
    {
      flex: 1,
      field: "source",
      headerName: "Source",
      editable: false,
    },
    {
      flex: 1,
      field: "added_date",
      headerName: "Added Date",
      editable: false,
      renderCell: (params: any) => {
        return <>{dayjs(params?.added_date).format("DD MMM, YYYY")}</>;
      },
    },
    {
      // flex: 1,
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <ActionButton />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ marginLeft: "auto" }}
            variant="contained"
            // onClick={() => handleOpen("addForm")}
          >
            Add
          </Button>
        </Box>

        {queryLoading ? (
          <DataGridLoader columns={columns} />
        ) : (
          <CustomDataGrid
            rows={data?.data}
            columns={columns}
            rowCount={data?.totalPages}
            setPage={setPage}
            isFetching={queryFetching}
          />
        )}
      </Box>
    </>
  );
}
