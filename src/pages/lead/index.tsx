import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useGetLeadsQuery } from "../../redux/api/leadApi";
import useModal from "../../hooks/useModal";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  DataGridLoader,
  CustomDataGrid,
} from "../../components/CustomDataGrid";
import dayjs from "dayjs";
import { styled } from "@mui/styles";
import { MoreVert } from "@mui/icons-material";

export default function Lead() {
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data,
    isLoading: queryLoading,
    isFetching: queryFetching,
    error: queryError,
  } = useGetLeadsQuery(page);
  console.log("data", data);

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
            <IconButton
              className="card-menu-btn"
              aria-label="menu"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e: any) => {
                e.stopPropagation();
                handleClick(e);
              }}
              role="button"
            >
              <MoreVert />
            </IconButton>

            <StyledMenu
              // id={slug}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                e.stopPropagation()
              }
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </StyledMenu>
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1.3),
    // minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
  },
}));
