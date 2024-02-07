import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/login";
import Lead from "../pages/lead";
import Interaction from "../pages/interaction";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/lead" element={<Lead />} />
          <Route path="/interaction" element={<Interaction />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteList;
