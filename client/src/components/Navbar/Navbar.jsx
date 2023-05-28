import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SellerLogin from "../Seller/Forms/SellerLogin";
import { useContext } from "react";
import { DataContext } from "../utilities/ContextStore";
import SellerSignup from "../Seller/Forms/SellerSignup";
import {Link} from 'react-router-dom'

export default function Navbar() {
const {sellerLogin,setSellerLogin,setSellerSignup,sellerSignup}=useContext(DataContext)

  return (
    <Box sx={{ flexGrow: 1, margin: "-8px" }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{fontSize:"25px",fontWeight:600, color: "#0066CC", textAlign: "left" }}>
            Become a Seller
          </Typography>
          <Box>
          <Link to="/sellerSignup">
            <Button
              sx={{
                width: "150px",
                color: "black",
                fontWeight: 600,
                backgroundColor: "yellow",
              }}
              variant="contained"
              onClick={()=>setSellerSignup(true)}
            >
              Start Selling
            </Button>
            </Link>
        
            <Button
              sx={{
                ml: 3,
                width: "150px",
                color: "white",
                fontWeight: 600,
                backgroundColor: "#0066CC",
              }}
              onClick={()=>setSellerLogin(true)}
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {sellerLogin && <SellerLogin/>}
    </Box>
  );
}
