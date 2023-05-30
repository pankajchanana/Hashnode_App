import { Navigate, Outlet, useLocation } from "react-router"


export default function RequireAuth(){
    const uid=sessionStorage.getItem("uid")
    const location=useLocation();
    return (
        uid ? <Outlet/> : <Navigate to ="/" state={{from:location}} replace/>
    )
}