import { Box, Typography } from "@mui/material";
import React from "react";
import InfoCard from "./InfoCard";
import { info } from "../constants/data";

export default function SignupInfo() {
  return (
    <Box
      sx={{
        mt: 10,
        backgroundColor: "#EAF3FB",
      }}
    >
      <Typography sx={{ textAlign:"center", fontSize: "32px", color: "#3D464D" }}>
        Why sell on Online Market Place
      </Typography>
      <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
      {info.map((i) => {
        return <InfoCard img={i.img} name={i.name} desc={i.desc} />;
      })}
      </Box>
    </Box>
  );
}
