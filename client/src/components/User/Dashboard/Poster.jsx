import { Grid, styled } from "@mui/material";
import React from "react";
import { posterData } from "../constants/constants";

function Poster() {
  const Img = styled("img")({
    padding: 6,
    width: "100%",
  });
  return (
    <Grid sx={{marginTop:"10px"}} container lg={12} sm={12} md={12} xs={12}>
      {posterData.map((item) => (
        <Grid item lg={4} sm={12} md={4} xs={12}>
          <Img src={item} alt="poster" />
        </Grid>
      ))}
    </Grid>
  );
}

export default Poster;
