import { Box, Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import { GridColDef } from "@mui/x-data-grid";
import {
  DataGridLoader,
  CustomDataGrid,
} from "../../components/CustomDataGrid";
import dayjs from "dayjs";
import { ActionButton } from "../../components/ActionButton";
import { CustomModal } from "../../components/CustomModal";
import { makeStyles } from "@mui/styles";
import { failureToast, infoToast } from "../../components/ui/Toast";
import { CustomSelect } from "../../components/ui/CustomSelect";
import { ConfirmationModal } from "../../components/CofirmationModal";
import { useSearchParams } from "react-router-dom";
import {
  useDeleteInteractionMutation,
  useGetLeadInteractionsQuery,
  usePostInteractionsMutation,
  useUpdateInteractionMutation,
} from "../../redux/api/interactionApi";

const defaultValues = {
  interaction_type: "",
  id: "",
};

const formValidator = yup.object({
  interaction_type: yup.string().required("This field is required"),
  id: yup.string(),
});

export default function Interaction() {
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
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("lead_id");

  const {
    data,
    isLoading: queryLoading,
    isFetching: queryFetching,
  } = useGetLeadInteractionsQuery({
    page,
    leadId: leadId,
  });
  const [postInteraction, { isLoading: postLoading }] =
    usePostInteractionsMutation();
  const [updateInteraction, { isLoading: updateLoading }] =
    useUpdateInteractionMutation();
  const [deleteInteraction, { isLoading: deleteLoading }] =
    useDeleteInteractionMutation();

  const closeModal = () => {
    handleClose("addForm");
    handleClose("editForm");
    handleClose("deleteModal");
    reset(defaultValues);
  };

  const handleEdit = (data: any): void => {
    reset({
      interaction_type: data?.interaction_type,
      id: data?.id,
    });
    handleOpen("editForm");
  };

  const handleDelete = (row: any) => {
    deleteInteraction(row?.id)
      .unwrap()
      .then(() => {
        infoToast("Deleted successfully");
        closeModal();
      })
      .catch((error) => {
        console.log("error", error);
        failureToast(error?.data?.error);
        closeModal();
      });
  };

  const submitHandler = (data: any) => {
    // console.log("data", data);
    const payload = {
      interaction_type: data?.interaction_type,
      lead_id: leadId,
    };

    if (modals.addForm) {
      postInteraction(payload)
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
      updateInteraction({ data: { ...payload, id: data?.id }, id: data?.id })
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

  const columns: GridColDef[] = [
    {
      flex: 1,
      field: "lead_name",
      headerName: "Lead Name",
      editable: false,
      renderCell: (params: any) => {
        return <>{params?.row?.lead?.lead_name}</>;
      },
    },
    {
      flex: 1,
      field: "interaction_type",
      headerName: "Interaction Type",
      editable: false,
    },
    {
      flex: 1,
      field: "interaction_date",
      headerName: "Interaction Date",
      editable: false,
      renderCell: (params: any) => {
        return <>{dayjs(params?.interaction_date).format("DD MMM, YYYY")}</>;
      },
    },
    {
      flex: 0.5,
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
        modalTitle={modals.addForm ? "Add Interaction" : "Edit Interaction"}
        width="350px"
      >
        <Box className={styles.formContainer}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <CustomSelect
              name="interaction_type"
              title="Interaction Type"
              placeholder="Interaction Type"
              data={[
                { value: "Email", label: "Email" },
                { value: "Call", label: "Call" },
                { value: "Meeting", label: "Meeting" },
              ]}
              control={control}
              error={errors?.interaction_type?.message}
              required
              hideLegend
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
