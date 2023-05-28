import {
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SignupInfo from "./SignupInfo";
import { DataContext } from "../../utilities/ContextStore";
import { account, databases } from "../../../services/appwriteConfig";
import {v4 as uuidv4} from "uuid"

export default function SellerSignup1() {
  const { sellerSignupStatus, setSellerSignupStatus,setSellerSignupData ,sellerSignupData} = useContext(DataContext);

  const handleSellerSignup1=(e)=>{
    e.preventDefault();
    sellerSignupData.seller_signup_status="2";
    console.log(sellerSignupData)
    const uid=uuidv4();
    sessionStorage.setItem("uid",uid);
    const promise=  databases.createDocument("646f96a60d5767f59620","646f978d35a7eccbb93b",uid ,sellerSignupData )
    promise.then((res)=>{
      console.log(res,"res")
      setSellerSignupStatus("2")
    }).then((e)=>{
      console.log(e)
    })
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ width: "600px", mt: 4 }}
          placeholder="Enter Mobile Number"
          onChange={(e)=>{
            setSellerSignupData({
              ...sellerSignupData,
              mobile_number:e.target.value
            })
          }}
        ></TextField>
        <TextField
          sx={{ width: "600px", mt: 4 }}
          placeholder="Email ID"
          onChange={(e)=>{
            setSellerSignupData({
              ...sellerSignupData,
              email:e.target.value
            })
          }}
        ></TextField>
        <TextField
          sx={{ width: "600px", mt: 4 }}
          placeholder="Enter GSTIN"
          onChange={(e)=>{
            setSellerSignupData({
              ...sellerSignupData,
              gst_in:e.target.value
            })
          }}
        ></TextField>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mt: 4, textAlign: "end" }}>
          GSTIN is required to sell products on Online Market place. You can
          also share it in the final step.
        </Typography>

        <Typography sx={{ mt: 4 }}>
          By continuing, I agree to Flipkart’s Terms of Use & Privacy Policy
        </Typography>

        <Button
          endIcon={<ArrowForwardIcon />}
          variant="contained"
          sx={{ mt: 2, width: "300px" }}
          onClick={handleSellerSignup1}
        >
          Register & Continue
        </Button>
      </Box>
      <SignupInfo />
    </Box>
  );
}
