import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layouts/index";
import { isLoggedIn } from "../utils/helperFunction";

export default function ProtectedRoutes() {
  return isLoggedIn() ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" />
  );
}
