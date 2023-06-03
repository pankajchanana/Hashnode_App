import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAuth } from "../../../redux/actions/authentication";
import SellerMain from "./SellerMain";
import SellerProducts from "./SellerProducts";
import SellerSideBar from "./SellerSideBar";

export default function Home() {
  const route = window.location.pathname.split("/").slice(-2)[0];
  console.log(route);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAuth());
  }, []);

  return (
    <Grid
      columnGap={18}
      container
      sx={{  width: "100vw", margin: "-8px" }}
    >
      <Grid item xs={2}>
        <SellerSideBar />
      </Grid>
      <Grid sx={{ borderRadius: 7 }} item xs={8}>
        {(route === "dashboard" || route === "") && <SellerMain />}
        {route === "products" && <SellerProducts />}
      </Grid>
    </Grid>
  );
}
