import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { loginImage } from "../constants/constants";

export default function LeftWrapper({loginText}) {
  const LoginImage = styled("img")({
    position:"fixed",
    top:"420px",
    height:"20%",
    width: "110px",
    textAlign: "left",
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#2874f0",
        width: 300,
        height:"100vh"
      }}
    >
      <Box sx={{textAlign:"left",padding:"45px 10px 0 30px",position:"fixed",width:250}}>
        <Typography sx={{fontSize:28,fontWeight:600,color:"#ffffff"}}>{loginText.title}</Typography>
        <Typography sx={{fontSize:18,color:"#dbdbdb",lineHeight:"150%",marginTop:2}}>
          {loginText.subTitle}
        </Typography>
      </Box>
      <LoginImage src={loginImage} />
    </Box>
  );
}
