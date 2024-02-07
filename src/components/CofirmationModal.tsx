import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { CustomModal } from "./CustomModal";
import React from "react";

type Props = {
  open: boolean;
  handleClose: any;
  title: string;
  isLoading?: boolean;
  handleAction?: any;
};

export const ConfirmationModal: React.FC<Props> = ({
  open,
  handleClose,
  title,
  handleAction,
  isLoading = false,
}) => {
  return (
    <CustomModal
      handleClose={handleClose}
      open={open}
      width="350px"
      modalTitle=""
    >
      <Box sx={{ padding: "20px" }}>
        <Typography>{title}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <Button variant="contained" color={"error"} onClick={handleAction}>
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Delete"
            )}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
