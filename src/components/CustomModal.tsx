import { Clear } from "@mui/icons-material";
import {
  Box,
  Fade,
  Modal,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import React, { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  open: boolean;
  handleClose: any;
  modalTitle: string;
  width?: string;
};

export const CustomModal: React.FC<ModalProps> = ({
  children,
  open,
  handleClose,
  modalTitle,
  width = "500px",
}) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
    >
      <Fade in={open}>
        <div
          className={classes.paper}
          style={{
            top: `50%`,
            left: `50%`,
            transform: "translate(-50%, -50%)",
            width: width || "500px",
          }}
        >
          {modalTitle && (
            <Box
              sx={{
                padding: "5px 20px",
                background: (theme) => theme.palette.primary.main,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{ color: "white", fontSize: "16px" }}
              >
                {modalTitle}
              </Typography>

              <Tooltip title="Close">
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    borderRadius: "3px",
    overflow: "hidden",
    // boxShadow: theme.shadows[5],
    "&:focus-visible": {
      outline: "none",
    },
  },
  modalHeader: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "white",
    padding: "1rem 2rem",
    color: "#F9FAFD",
    display: "flex",
    justifyContent: "space-between",
    "&:nth-child(1)": {
      cursor: "pointer",
    },
  },
}));
