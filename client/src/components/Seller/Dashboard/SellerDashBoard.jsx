import React, { useContext } from "react";
import Navbar from "../../Navbar/Navbar";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import banner from "../../../../assets/banner_seller.png";
import styled from "@emotion/styled";
import CustomerReview from "./CustomerReview";
import { useForm } from "react-hook-form";
import { DataContext } from "../../utilities/ContextStore";
import { Link } from "react-router-dom";
import SellerNavbar from "../../Navbar/SellerNavbar";
import { useEffect } from "react";
import { sellerLastOrderProductsList } from "../../../redux/actions/productsAction";
import { useDispatch } from "react-redux";

export default function SellerDashBoard() {
  const SellerImg = styled("img")({
    height: "300px",
    width: "100%",
  });
  const {
    register,
    formState: { errors },
  } = useForm();
  const { sellerSignupData, setSellerSignupData } = useContext(DataContext);

  return (
    <Box>
      <SellerNavbar />
      <Box sx={{ marginTop: "8px" }}>
        <Grid container>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "300px",
              padding: 5,
              backgroundColor: "#01B5DB",
            }}
            item
            xs={5}
          >
            <Typography
              sx={{ fontWeight: 800, fontSize: "26px", color: "white" }}
            >
              Launch your business in 10 minutes
            </Typography>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: 3, mt: 6 }}
              id="outlined-basic"
              label="Enter 10 digit phone number here"
              variant="outlined"
              name="mobile_number"
              {...register("mobile_number", {
                required: {
                  value: true,
                  message: "Mobile number is required",
                },
                minLength: {
                  value: 10,
                  message: "Mobile number should be 10 digits",
                },
              })}
              error={Boolean(errors.mobile_number)}
              onChange={(e) => {
                setSellerSignupData({
                  ...sellerSignupData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <Link to="/seller-signup">
              <Button
                sx={{
                  mt: 2,
                  width: "200px",
                  color: "black",
                  fontWeight: 600,
                  backgroundColor: "yellow",
                }}
                variant="contained"
                color="primary"
              >
                Start Selling
              </Button>
            </Link>
          </Grid>
          <Grid item xs={7}>
            <SellerImg src={banner} />
          </Grid>
        </Grid>
      </Box>
      <CustomerReview />
    </Box>
  );
}
