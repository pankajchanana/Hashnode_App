import { Box, Divider, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DataContext } from "../../utilities/ContextStore";
import SellerSignup1 from "./SellerSignup1";
import SellerSignup2 from "./SellerSignup2";
import SellerSignup3 from "./SellerSignup3";
import {Query} from 'appwrite';
import { useEffect } from "react";
import {  databases } from "../../../services/appwriteConfig";


export default function SellerSignup() {
    
  const {
    setSellerSignupStatus,
    sellerSignupStatus,
  } = useContext(DataContext);
  const Process = styled(Box)({
    display: "flex",
  });

  const Icons1=styled(CheckCircleOutlineIcon)(({ status }) => ({
    backgroundColor:(status==="2" || status==="3") && "lightgreen",
    borderRadius:10
  }));

  const Icons2=styled(CheckCircleOutlineIcon)(({ status }) => ({
    backgroundColor:status==="3" && "lightgreen"
  }));




  useEffect(() => {
    const promise = databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USERS_TABLE_ID,
      [
        Query.limit(100),
        Query.offset(0)
    ]
    );
    const uid = sessionStorage.getItem("uid");
    promise.then((res) => {
      const currentUser = res?.documents.filter((q) => q.$id === uid);
      console.log(res.documents,currentUser,uid)
      if (uid) setSellerSignupStatus(currentUser[0]?.seller_signup_status);
      else setSellerSignupStatus("1");
    }).catch((e)=>{
      console.log(e)
    })
  }, []);
  return (
    <>
      {sellerSignupStatus !== "4" && (
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Process>
            <Icons1 status={sellerSignupStatus} /> <Typography> EMAIL ID & GST</Typography>
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
            <Icons2  status={sellerSignupStatus}/>{" "}
            <Typography> PASSWORD CREATION</Typography>
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
            <CheckCircleOutlineIcon />{" "}
            <Typography>ONBOARDING DASHBOARD</Typography>
          </Process>
        </Box>
      )}
      {sellerSignupStatus === "1"  && <SellerSignup1 />}
      {sellerSignupStatus === "2" && <SellerSignup2 />}
      {sellerSignupStatus === "3" && <SellerSignup3 />}
    </>
  );
}
