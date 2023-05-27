import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { DataContext } from "../../utilities/ContextStore";
import { useContext } from "react";

export default function SellerLogin() {
const {sellerLogin,setSellerLogin}=useContext(DataContext)

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 800,
          width: 500,
          maxHeight: 650,
          height: 200,
        },
      }}
      open={sellerLogin}
      onClose={sellerLogin}
    >
      <Box>
        <Box sx={{display:"flex",justifyContent:"space-between", borderBottom: "2px dotted black"}}>
          <Typography sx={{ padding: 1 }}>
            Log in
          </Typography>
          <CloseIcon onClick={()=>setSellerLogin(false)} sx={{cursor:"pointer"}}/>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 100,
            width: 500,
          }}
        >
          <TextField
            label="Username or 10 digit phone number or email"
            sx={{ width: 400 }}
          ></TextField>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button>Register for new account</Button>
          <Button variant="contained">Next</Button>
        </Box>
      </Box>
    </Dialog>
  );
}
