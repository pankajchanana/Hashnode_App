import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import CustomButtons from "../User/Dashboard/CustomButtons";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { logoURL, subURL } from "../User/constants/constants";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../utilities/ContextStore";
import { useDispatch, useSelector } from "react-redux";
// import { searchUserInputData } from "../../../../server/controller/searchEngine";
import { searchUserInputData } from "../../redux/actions/productsAction";
// const searchUserInputData=require('../../../../server/controller/searchEngine')

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  // marginRight: theme.spacing(2),
  // marginLeft: theme.spacing(20),
  width: "40%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  backgroundColor: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0.3)})`,
  },
  "&:focus": {
    color: "white",
  },
  width: "100%",
}));

export default function NavBar() {
  const { setItemCount } = useContext(DataContext);
  const [searchData, setSearchData] = React.useState("");
  const { cartItems, userSearchData } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (cartItems) setItemCount(cartItems.length);
  }, [cartItems]);

  const handleSearchData = (e) => {
    setSearchData(e.target.value);
    dispatch(searchUserInputData(e.target.value));
  };

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
            <Search>
              <StyledInputBase
                onChange={handleSearchData}
                placeholder="Search for products,brands and more"
                inputProps={{ "aria-label": "search" }}
              />
              {
                userSearchData.length!==0 && 
              <Autocomplete
              id="combo-box-demo"
                disablePortal
                options={userSearchData}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
}
            </Search>
            <CustomButtons />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
