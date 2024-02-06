import { Box, Container, Typography } from "@mui/material";
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const pathArray = location.pathname.split("/").slice(1);

  function getHead() {
    if (pathArray.length === 1) {
      return pathArray[0]?.replace(/-/g, " ");
    } else if (pathArray.length === 3 && pathArray[1] === "album") {
      return "Gallery";
    }
    return pathArray[1]?.replace(/-/g, " ");
  }

  function getSubhead() {
    if (pathArray.length === 1) {
      return ["Home", pathArray[0]];
    }
    return pathArray;
  }

  return (
    <Container maxWidth="xl">
      <Box className={classes.root}>
        {pathArray[0] === "" ? (
          <PageHeader head="Dashboard" subHead={[]} />
        ) : (
          <PageHeader head={getHead()} subHead={getSubhead()} />
        )}

        {/* <Typography
          variant="h2"
          sx={{
            textTransform: "uppercase",
            color: "#121127",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Dashboard
        </Typography> */}
        <Profile />
      </Box>
    </Container>
  );
};

type PageHeaderProps = {
  head: string;
  subHead: string[];
};

function PageHeader({ head, subHead }: PageHeaderProps) {
  return (
    <Box sx={{ paddingBlock: "15px" }}>
      <Typography
        variant="h2"
        sx={{
          textTransform: "uppercase",
          color: "#121127",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        {head}
      </Typography>
      <Box
        sx={{
          marginTop: "5px",
          display: "flex",
          gap: "1px",
          "& a, & p": {
            color: "#4C4B63",
            textTransform: "uppercase",
            fontSize: "12px",
            textDecoration: "none",
          },
        }}
      >
        {subHead.map((item, index) => {
          return index === 0 ? (
            <Typography key={index}>{item.replace(/-/g, " ")} </Typography>
          ) : index === subHead.length - 1 ? (
            <Typography key={index}>
              {" / "} {item.replace(/-/g, " ")}
            </Typography>
          ) : (
            <Link key={index} to={`${subHead[0]}/${item}`}>
              {" / "}
              {item.replace(/-/g, " ")}
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}

export default Navbar;
