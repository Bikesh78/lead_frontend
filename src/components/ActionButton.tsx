import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";

type Props = {
  handleEdit: (data: any) => void;
};

export const ActionButton = ({ handleEdit }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        // disabled={disabled}
      >
        <MoreVert />
      </IconButton>

      <Menu
        // id={slug}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClick={(e: any) => e.stopPropagation()}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        elevation={0}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "4px",
            marginTop: "1px",
            color: "rgb(55, 65, 81)",
            boxShadow:
              "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
              padding: "4px 0",
            },
          },
        }}
      >
        <MenuItem
          // onClick={() => {
          //   handleEdit(params);
          //   handleClose();
          // }}
          onClick={handleEdit}
        >
          Edit
        </MenuItem>
        <MenuItem
        // onClick={() => {
        //   handleDelete(params);
        //   handleClose();
        // }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
