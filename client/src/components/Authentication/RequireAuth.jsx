import { Navigate, Outlet, useLocation } from "react-router"


export default function RequireAuth(){
    const secret=sessionStorage.getItem("secret_key")
    const secretKey=localStorage.getItem("secret_key")
    const location=useLocation();
    return (
        secret || secretKey ? <Outlet/> : <Navigate to ="/" state={{from:location}} replace/>
    )
}