import React from "react";
import Box from "@mui/material/Box";
import Navbar from "../../Navbar/Navbar";
import { Button, Grid, TextField, Typography } from "@mui/material";
import banner from "../../../../assets/banner_seller.png";
import styled from "@emotion/styled";
import CustomerReview from "./CustomerReview";

export default function SellerDashBoard() {
  const SellerImg = styled("img")({
    height: "300px",
    width: "100%",
  });

  return (
    <Box>
      <Navbar />
      <Box sx={{ marginTop: "8px" }}>
        <Grid container>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "300px",
              padding: 9,
              backgroundColor: "#01B5DB",
            }}
            item
            xs={5}
          >
            <Typography sx={{fontWeight:800, fontSize: "26px", color: "white" }}>
              Launch your business in 10 minutes
            </Typography>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: 3, mt: 3 }}
              id="outlined-basic"
              label="Enter 10 digit phone number here"
              variant="outlined"
            />
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
          </Grid>
          <Grid item xs={7} >
            <SellerImg src={banner} />
          </Grid>
        </Grid>
      </Box>
      <CustomerReview/>
    </Box>
  );
}
