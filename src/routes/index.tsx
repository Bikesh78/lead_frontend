import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/login";
import Lead from "../pages/lead";
import Interaction from "../pages/interaction";
import Overview from "../pages/overview";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Lead />} />
          <Route path="/interaction" element={<Interaction />} />
          <Route path="/overview" element={<Overview />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
