import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  searchUserInputData,
} from "../../redux/actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material";
import { useNavigate } from "react-router";
const SearchBarWrapper = styled(Autocomplete)({
  width: "400px",

});

const SearchBar = ({ options, onSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = React.useState("");
  const { userSearchData, sellerProducts, searchedProduct } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchData = (e) => {
    setSearchValue(e.target.value);
    dispatch(searchUserInputData(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    let product = [];
    product = userSearchData.filter((p) => p.products === e.target.value);
    if (product.length != 0) {
      const id = product[0].product_id;
      if (id) navigate("/products/" + id);
      product = [];
    }
  };
  return (
    <SearchBarWrapper
      options={userSearchData.map((q) => q.products)}
      value={searchValue}
      renderInput={(params) => (
        <TextField
        sx={{backgroundColor:"white"}}
          onSelect={handleSearchSubmit}
          onChange={handleSearchData}
          {...params}
          label="Search"
          variant="outlined"
          size="small"
          fullWidth
        />
      )}
    />
  );
};

export default SearchBar;
