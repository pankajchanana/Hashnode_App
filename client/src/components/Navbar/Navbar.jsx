import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CustomButtons from "../User/Dashboard/CustomButtons";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../utilities/ContextStore";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

export default function NavBar() {
  const { setItemCount } = useContext(DataContext);
  const { cartItems } = useSelector((state) => state.products);
  useEffect(() => {
    if (cartItems) setItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <Box sx={{ margin: "-8px" }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <Typography sx={{ fontSize: 16, color: "white" }}>
                Online Market
              </Typography>
            </Link>
            <SearchBar />
            <CustomButtons />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
