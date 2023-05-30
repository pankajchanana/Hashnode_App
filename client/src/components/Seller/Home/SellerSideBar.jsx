import { Avatar, Box, styled, Button } from "@mui/material";
import React from "react";
import cust1 from "../../../../assets/cust1.png";
import PieChartIcon from "@mui/icons-material/PieChart";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import { account } from "../../../services/appwriteConfig";
import { useNavigate } from "react-router";

export default function SellerSideBar() {
    const navigate=useNavigate()

    const handleSellerLogout=()=>{

        const uid=sessionStorage.getItem("uid");
        // const promise=account.deleteSession(uid);
        // promise.then((res)=>{
        //     console.log(res,"account deleted")
        //   })
          sessionStorage.removeItem("uid")
          navigate("/")

    }
  const ButtonStyle = styled(Button)({
    width: "200px",
    marginTop: "20px",
    fontSize: "20px",
    color: "white",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "grey",
        height: "87vh",
        padding: 5,
        alignItems: "center",
        position:"fixed"
      }}
    >
      <Avatar sx={{ height: "100px", width: "100px" }} src={cust1} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ButtonStyle startIcon={<PieChartIcon />}>Dashboard</ButtonStyle>
        <ButtonStyle startIcon={<CategoryIcon />}>Products</ButtonStyle>
        <ButtonStyle startIcon={<GroupIcon />}>Customers</ButtonStyle>
        <ButtonStyle startIcon={<RateReviewIcon />}>Reviews</ButtonStyle>
        <ButtonStyle startIcon={<SettingsIcon />}>Settings</ButtonStyle>
      </Box>
      <ButtonStyle onClick={handleSellerLogout} sx={{position:"absolute",bottom:0}}>Logout</ButtonStyle>
    </Box>
  );
}
