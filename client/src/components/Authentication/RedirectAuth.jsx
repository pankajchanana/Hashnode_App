import { Navigate, Outlet, useLocation } from "react-router";

export default function RedirectAuth() {
  const secret = sessionStorage.getItem("secret_key");
  const token = sessionStorage.getItem("token");
  const secretKey = localStorage.getItem("secret_key");
  const token1 = localStorage.getItem("token");
  const location = useLocation();
  return token || token1? (
    <Navigate
      to={"/seller-home/dashboard/" + token}
      state={{ from: location }}
      replace
    />
  ) : secret || secretKey ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
