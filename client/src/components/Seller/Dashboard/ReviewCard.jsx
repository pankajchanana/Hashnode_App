import { Box, Typography } from "@mui/material";
import React from "react";

export default function ReviewCard({ name, desc, img }) {
  return (
    <Box sx={{ display: "flex", height: "200px", width: "400px", padding:"20px 20px 40px"}}>
      <Box>
        <img style={{borderRadius:"10px"}} src={img} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" ,padding:2}}>
        <Typography sx={{fontStyle:"italic"}}>"{desc}"</Typography>
        <Typography sx={{mt:2,fontWeight:600}}>{name}</Typography>
      </Box>
    </Box>
  );
}
