import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { account } from "../../../services/appwriteConfig";
import SellerMain from "./SellerMain";
import SellerSideBar from "./SellerSideBar";

export default function Home() {
  useEffect(() => {
    if (!!!sessionStorage.getItem("secret_key")) {
      let urlSearchParams = new URLSearchParams(window.location.search);
      console.log(window.location.pathname, "pathname");
      console.log(urlSearchParams, "urlSearchParams");
      let secret = urlSearchParams.get("secret");
      let userId = urlSearchParams.get("userId");
      sessionStorage.setItem("secret_key", secret);
      account
        .updateVerification(userId, secret)
        .then((res) => {
          console.log("complete email verification");
          navigate("/seller-home");
        })
        .catch((er) => {
          console.log("login failed");
        });
    }
  }, []);

  return (
    <Grid columnGap={18} container sx={{width:"100vw" ,margin:"-8px"}}>
      <Grid item xs={2} >
        <SellerSideBar />
      </Grid>
      <Grid item xs={8}>
        <SellerMain />
      </Grid>
    </Grid>
  );
}
