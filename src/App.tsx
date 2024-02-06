import { CssBaseline } from "@mui/material";
import RouteList from "./routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoginStatus } from "./redux/api/authApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("lead_access_token") ? true : false;
    dispatch(setLoginStatus(isLoggedIn));
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <RouteList />
      <ToastContainer />
    </>
  );
}

export default App;
