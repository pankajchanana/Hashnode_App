import { Navigate, Outlet, useLocation } from "react-router"


export default function RequireAuth(){
    const secret=sessionStorage.getItem("secret_key")
    const location=useLocation();
    return (
        secret ? <Outlet/> : <Navigate to ="/" state={{from:location}} replace/>
    )
}