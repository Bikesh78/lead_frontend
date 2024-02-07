import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const SIDEBAR_ARRAY = [
  { label: "Lead", url: "/" },
  // { label: "Lead", url: "/lead" },
  { label: "Overview", url: "/overview" },
];

const Sidebar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "220px",
        height: "100vh",
        overflow: "auto",
        flexShrink: "0",
        boxShadow: "-10px 20px 28px rgba(0,0,0,0.5)",
      }}
    >
      <Box
        sx={{
          padding: "20px",
          "& img": { width: "70px", height: "70px" },
        }}
      ></Box>
      <List
        sx={{
          "& .active": {
            "& .MuiButtonBase-root": {
              background: "#4559BD",
              "& .MuiListItemIcon-root": {
                color: "white",
              },
              "& .MuiListItemText-root": {
                color: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
          },
        }}
      >
        {SIDEBAR_ARRAY.map((list, index) => (
          <NavLink to={list?.url} key={list.label}>
            <ListItemButton>
              <ListItemIcon>{getIcon(list.label)}</ListItemIcon>
              <ListItemText primary={list?.label} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Box>
  );
};

function getIcon(label: string) {
  switch (label) {
    case "Home":
      return <HomeOutlinedIcon />;
    case "Lead":
    case "Overview":
      return <AssignmentOutlinedIcon />;
    case "Interaction":
      return <CallOutlinedIcon />;
    default:
      return "";
  }
}

export default Sidebar;
