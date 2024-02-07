import { Box, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  useDeleteLeadMutation,
  useGetLeadsQuery,
  usePostLeadsMutation,
  useUpdateLeadMutation,
} from "../../redux/api/leadApi";
import useModal from "../../hooks/useModal";
import { GridColDef } from "@mui/x-data-grid";
import {
  DataGridLoader,
  CustomDataGrid,
} from "../../components/CustomDataGrid";
import dayjs from "dayjs";
import { ActionButton } from "../../components/ActionButton";
import { CustomModal } from "../../components/CustomModal";
import { CustomInput } from "../../components/ui/CustomInput";
import { makeStyles } from "@mui/styles";
import { failureToast, infoToast } from "../../components/ui/Toast";
import { CustomSelect } from "../../components/ui/CustomSelect";
import { ConfirmationModal } from "../../components/CofirmationModal";

type LeadType = {
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  source: "Web" | "Referral" | "Partner";
};

const defaultValues = {
  name: "",
  email: "",
  status: "",
  source: "",
  id: "",
};

const formValidator = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  status: yup.string().required("Status is required"),
  source: yup.string().required("Source is required"),
  id: yup.string(),
});

export default function Lead() {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(formValidator),
  });
  const { modals, handleOpen, handleClose, row } = useModal();
  const [page, setPage] = useState(1);
  const styles = useStyles();

  const {
    data,
    isLoading: queryLoading,
    isFetching: queryFetching,
  } = useGetLeadsQuery(page);
  const [postLead, { isLoading: postLoading }] = usePostLeadsMutation();
  const [updateLead, { isLoading: updateLoading }] = useUpdateLeadMutation();
  const [deleteLead, { isLoading: deleteLoading }] = useDeleteLeadMutation();

  const closeModal = () => {
    handleClose("addForm");
    handleClose("editForm");
    handleClose("deleteModal");
    reset(defaultValues);
  };

  const handleEdit = (data: any): void => {
    reset({
      name: data?.lead_name,
      email: data?.email,
      status: data?.lead_status,
      source: data?.source,
      id: data?.id,
    });
    handleOpen("editForm");
  };

  const handleDelete = (row: any) => {
    deleteLead(row?.id)
      .unwrap()
      .then(() => {
        infoToast("Deleted successfully");
        closeModal();
      })
      .catch((error) => {
        console.log("error", error);
        failureToast(error?.data?.error);
      });
  };

  const submitHandler = (data: any) => {
    // console.log("data", data);
    const payload = {
      name: data?.name,
      email: data?.email,
      status: data?.status,
      source: data?.source,
    };

    if (modals.addForm) {
      postLead(payload)
        .unwrap()
        .then((res) => {
          console.log("res", res);
          infoToast(res?.message);
          closeModal();
        })
        .catch((error) => {
          console.log("error", error);
          failureToast(error?.data?.error);
        });
    } else if (modals.editForm) {
      // payload.id = data?.id;
      updateLead({ data: { ...payload, id: data?.id }, id: data?.id })
        .unwrap()
        .then((res) => {
          console.log("res", res);
          infoToast(res?.message);
          closeModal();
        })
        .catch((error) => {
          console.log("error", error);
          failureToast(error?.data?.error);
        });
    }
  };
  // console.log("modals", modals);

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
            <ActionButton
              handleEdit={() => handleEdit(params?.row)}
              handleDelete={() => handleOpen("deleteModal", params?.row)}
              data={params?.row}
            />
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
            onClick={() => handleOpen("addForm")}
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

      <CustomModal
        open={Boolean(modals.addForm) || Boolean(modals.editForm)}
        handleClose={closeModal}
        modalTitle={modals.addForm ? "Add Position" : "Edit Position"}
      >
        <Box className={styles.formContainer}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <CustomInput
              name="name"
              title="Name"
              placeholder="Lead Name"
              control={control}
              error={errors?.name?.message}
              required
            />

            <CustomInput
              name="email"
              title="Email"
              placeholder="Email"
              control={control}
              error={errors?.email?.message}
              required
            />
            <CustomSelect
              name="status"
              title="Status"
              placeholder="Status"
              data={[
                { value: "New", label: "New" },
                { value: "Contacted", label: "Contacted" },
                { value: "Qualified", label: "Qualified" },
                { value: "Lost", label: "Lost" },
              ]}
              control={control}
              error={errors?.status?.message}
              hideLegend
              required
            />
            <CustomSelect
              name="source"
              title="Source"
              placeholder="Source"
              data={[
                { value: "Web", label: "Web" },
                { value: "Referral", label: "Referral" },
                { value: "Partner", label: "Partner" },
              ]}
              control={control}
              error={errors?.source?.message}
              hideLegend
              required
            />

            <Box sx={{ marginTop: "25px" }}>
              <Button variant="contained" type="submit">
                {postLoading || updateLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>

      <ConfirmationModal
        open={Boolean(modals.deleteModal)}
        handleClose={closeModal}
        handleAction={() => handleDelete(row)}
        title="Are you sure you want to delete?"
        isLoading={deleteLoading}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: "10px 20px",
    display: "flex",
    columnGap: "10px",
    alignItems: "flex-start",
    "& form": {
      width: "100%",
    },
    "& .custom-input, & .custom-select": {
      marginBlock: "15px",
    },
    "& button": {
      width: "100%",
      padding: "10px",
      fontSize: "12px",
    },
  },
}));
