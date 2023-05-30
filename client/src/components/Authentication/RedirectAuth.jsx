import { Navigate, Outlet, useLocation } from "react-router"


export default function RedirectAuth(){
    const uid=sessionStorage.getItem("uid")
    const location=useLocation();
    return (
        uid ? <Navigate to ="/seller-home" state={{from:location}} replace/> : <Outlet/>
    )
}