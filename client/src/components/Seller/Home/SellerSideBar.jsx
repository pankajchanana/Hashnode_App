import { Avatar, Box, styled, Button } from "@mui/material";
import React from "react";
import cust1 from "../../../../assets/cust1.png";
import PieChartIcon from "@mui/icons-material/PieChart";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function SellerSideBar() {
  const navigate = useNavigate();
  const route = window.location.pathname.split("/").slice(-2)[0];
  const uid=sessionStorage.getItem("secret_key")

  const handleSellerLogout = () => {
    sessionStorage.removeItem("secret_key");
    localStorage.removeItem("secret_key");
    navigate("/");
  };
  const ButtonStyle = styled(Button)(({ state, route }) => ({
    width: "200px",
    marginTop: "20px",
    fontSize: "20px",
    color: "white",
    backgroundColor: state === route && "#655f5f",
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "grey",
        height: "89vh",
        padding: 5,
        alignItems: "center",
        position: "fixed",
        margin: 0,
      }}
    >
      <Avatar sx={{ height: "100px", width: "100px" }} src={cust1} />
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
        <ButtonStyle route={route} state="customers" startIcon={<GroupIcon />}>
          Customers
        </ButtonStyle>
        <ButtonStyle
          route={route}
          state="reviews"
          startIcon={<RateReviewIcon />}
        >
          Reviews
        </ButtonStyle>
        <ButtonStyle
          route={route}
          state="settings"
          startIcon={<SettingsIcon />}
        >
          Settings
        </ButtonStyle>
      </Box>
      <ButtonStyle
        onClick={handleSellerLogout}
        sx={{ position: "absolute", bottom: 0 }}
      >
        Logout
      </ButtonStyle>
    </Box>
  );
}
