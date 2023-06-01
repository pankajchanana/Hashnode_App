import { Navigate, Outlet, useLocation } from "react-router"


export default function RedirectAuth(){
    const secret=sessionStorage.getItem("secret_key")
    const secretKey=localStorage.getItem("secret_key")
    const location=useLocation();
    return (
        secret || secretKey ? <Navigate to ="/seller-home/dashboard" state={{from:location}} replace/> : <Outlet/>
    )
}