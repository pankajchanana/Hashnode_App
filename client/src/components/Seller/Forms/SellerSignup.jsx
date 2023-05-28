import { Box, Divider, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DataContext } from "../../utilities/ContextStore";
import SellerSignup1 from "./SellerSignup1";
import SellerSignup2 from "./SellerSignup2";
import SellerSignup3 from "./SellerSignup3";
import { useEffect } from "react";
import { account, databases } from "../../../services/appwriteConfig";
import Home from "../Home/Home";


export default function SellerSignup() {
  const {setSellerSignupStatus, sellerSignupStatus,sellerSignupData ,setSellerSignupData} = useContext(DataContext);
  const Process = styled(Box)({
    display: "flex",
});

useEffect(()=>{
    const promise = databases.listDocuments("646f96a60d5767f59620","646f978d35a7eccbb93b");
    const uid=sessionStorage.getItem('uid');
    promise.then((res)=>{
        console.log(res)
        const currentUser=res.documents.filter((q)=>q.$id===uid)
        console.log(currentUser,"current")
        if(uid)
            setSellerSignupStatus(currentUser[0]?.seller_signup_status)
        else
            setSellerSignupStatus("1")
        
        

    })
},[])

console.log(sellerSignupData,"ee")
  return (
    <>
    {sellerSignupStatus!=="4" &&
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Process>
        <CheckCircleOutlineIcon /> <Typography> EMAIL ID & GST</Typography>
      </Process>
      <Divider
        sx={{
          height: "3px",
          m: 1.1,
          width: "30px",
          backgroundColor: "rgb(193, 199, 208)",
        }}
      ></Divider>
      <Process>
        <CheckCircleOutlineIcon /> <Typography> PASSWORD CREATION</Typography>
      </Process>
      <Divider
        sx={{
          height: "3px",
          m: 1.1,
          width: "30px",
          backgroundColor: "rgb(193, 199, 208)",
        }}
      ></Divider>
      <Process>
        <CheckCircleOutlineIcon /> <Typography>ONBOARDING DASHBOARD</Typography>
      </Process>
    </Box>
}
    {
        sellerSignupStatus==="1" && <SellerSignup1/> 
    }
     {
        sellerSignupStatus==="2" && <SellerSignup2/> 
    }
     {
        sellerSignupStatus==="3" && <SellerSignup3/> 
    }
     {
        sellerSignupStatus==="4" && <Home/> 
    }
    </>
  );
}
