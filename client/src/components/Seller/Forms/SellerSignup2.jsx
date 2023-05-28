import {
  Box,
  Button,
  Divider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useContext } from "react";
import { DataContext } from "../../utilities/ContextStore";
import { v4 as uuidv4 } from "uuid";
import { account, databases } from "../../../services/appwriteConfig";

export default function SellerSignup2() {
  const Process = styled(Box)({
    display: "flex",
  });

  const {
    sellerSignupStatus,
    setSellerSignupStatus,
    sellerSignupData,
    setSellerSignupData,
  } = useContext(DataContext);

  const handleSellerSignup2 = (e) => {
    e.preventDefault();
    const uid=sessionStorage.getItem('uid')
    sellerSignupData.seller_signup_status="3";
    const promise = databases.updateDocument("646f96a60d5767f59620","646f978d35a7eccbb93b",uid,sellerSignupData);
    promise.then((res)=>{
        setSellerSignupStatus("3")
    })
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography sx={{ color: "#3D464D" }}>
          We’ve sent a verification link to your email
        </Typography>
        <Typography>Almost there...</Typography>
        <Typography sx={{ color: "#3D464D" }}>
          We need these details to set up your account. You can also choose to
          fill them in the next step.
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TextField
          sx={{ width: "600px", mt: 4 }}
          placeholder="Create Password"
          onChange={(e) => {
            setSellerSignupData({
              ...sellerSignupData,
              password: e.target.value,
            });
          }}
        ></TextField>
        <TextField
          sx={{ width: "600px", mt: 4 }}
          placeholder="Enter Your Full Name"
          onChange={(e) => {
            setSellerSignupData({
              ...sellerSignupData,
              full_name: e.target.value,
            });
          }}
        ></TextField>
        <TextField
          sx={{ width: "600px", mt: 4 }}
          placeholder="Enter Display Name"
          onChange={(e) => {
            setSellerSignupData({
              ...sellerSignupData,
              display_name: e.target.value,
            });
          }}
        ></TextField>

        <Button
          endIcon={<ArrowForwardIcon />}
          variant="contained"
          onClick={handleSellerSignup2}
          sx={{ mt: 2, width: "300px" }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
