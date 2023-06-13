import { Avatar, Box, styled, Button } from "@mui/material";
import React from "react";
import cust1 from "../../../../assets/cust1.png";
import PieChartIcon from "@mui/icons-material/PieChart";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function SellerSideBar() {
  const navigate = useNavigate();
  const route = window.location.pathname.split("/").slice(-2)[0];
  const uid = sessionStorage.getItem("token");

  const handleSellerLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    navigate("/seller");
  };
  const ButtonStyle = styled(Button)(({ state, route }) => ({
    width: "200px",
    marginTop: "20px",
    fontSize: "20px",
    color: state === route ? "white" : "black",
    backgroundColor: state === route && "#655f5f",
    "&.MuiButtonBase-root:hover": {
      backgroundColor:  "#655f5f",
      color:"white"
    }
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F1F4F5",
        height: "89vh",
        padding: 5,
        alignItems: "center",
        position: "fixed",
        margin: 0,
      }}
    >
      <Avatar sx={{ height: "100px", width: "100px" }} src={"https://media.licdn.com/dms/image/C4D03AQHpNwp_7RQwVQ/profile-displayphoto-shrink_800_800/0/1646704026605?e=2147483647&v=beta&t=ew3CNSf5jcGmzIxS-NJfnLWR9wqD7mAZF0BGTfFJ-Gk"} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link to={`/seller-home/dashboard/${uid}`}>
          {" "}
          <ButtonStyle
            route={route}
            state="dashboard"
            startIcon={<PieChartIcon />}
          >
            Dashboard
          </ButtonStyle>
        </Link>
        <Link to={`/seller-home/products/${uid}`}>
          {" "}
          <ButtonStyle
            route={route}
            state="products"
            startIcon={<CategoryIcon />}
          >
            Products
          </ButtonStyle>
        </Link>
      </Box>
      <ButtonStyle
      startIcon={<LogoutIcon/>}
        state="logout"
        onClick={handleSellerLogout}
        sx={{ position: "absolute", bottom: 0 }}
      >
        Logout
      </ButtonStyle>
    </Box>
  );
}
