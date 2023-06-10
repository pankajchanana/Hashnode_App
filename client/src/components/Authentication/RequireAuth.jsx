import { Navigate, Outlet, useLocation } from "react-router"


export default function RequireAuth(){
    const secret=sessionStorage.getItem("secret_key")
    const token=sessionStorage.getItem("token")
  const token1 = localStorage.getItem("token");
    const secretKey=localStorage.getItem("secret_key")
    
    const location=useLocation();
    return (
        token || token1 ? <Outlet/> :
        (secret || secretKey ? <Outlet/> : <Navigate to ="/" state={{from:location}} replace/>)
    )
}