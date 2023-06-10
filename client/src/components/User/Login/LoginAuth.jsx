import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";


function LoginAuth({handleSignUp}) {
  const [payload, setPayload] = React.useState(null);
  const {signUpButton}=React.useContext(DataContext)
	const [requestOtp,setRequestOtp]=React.useState(false);

  return (
    <div>
     
	 {/* { requestOtp &&  <div id="mojoauth-passwordless-form"></div> } */}

    </div>
  );
}
export default LoginAuth;
