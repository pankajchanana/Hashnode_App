import { Navigate, Outlet, useLocation } from "react-router"


export default function RedirectAuth(){
    const secret=sessionStorage.getItem("secret_key")
    const location=useLocation();
    return (
        secret ? <Navigate to ="/seller-home" state={{from:location}} replace/> : <Outlet/>
    )
}