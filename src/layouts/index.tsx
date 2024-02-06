import { Box, Container } from "@mui/material";
import Navbar from "./navbar";
import useStyles from "./styles";
import { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";

type Props = {
  children: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: "1",
              width: "calc(100vw - 250px)",
              marginLeft: "250px",
            }}
          >
            <Navbar />
            <Container maxWidth="xl">
              <Box>{children}</Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
