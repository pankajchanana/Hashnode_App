import React, { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
import { AppBar, Toolbar, Box, Typography, TextField, Button, Menu } from "@mui/material";

import { myaccountMenu } from "../User/constants/constants";


const DropdownMenu = (items) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                onMouseOver={handleClick}
            >
                My Account
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
            >
                {items.map((item) => {
                    return (
                        <>
                            <MenuItem onClick={() => {
                                handleClose;
                                window.location.pathname = item.link;
                            }}>
                                {item.title}
                            </MenuItem>
                        </>)
                })}
            </Menu>
        </div>
    );
}
const SearchBar = ({ setSearchInput }) => (
    <form style={{
        backgroundColor: "white",
        width: "40%",
    }}>
        <TextField
            fullWidth
            onInput={(e) => {
                setSearchInput(e.target.value);
            }}
            placeholder="Search for products, brands and more"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon style={{ fill: "#2874f0" }} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    </form>
);

const UserNavbar = () => {
    const [searchInput, setSearchInput] = useState("");
    return (
        <Box>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        backgroundColor: "#2874f0",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Link to="/seller" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: "25px",
                                fontWeight: 600,
                                color: "white",
                                textAlign: "right",
                            }}
                        >
                            Hashoppe
                        </Typography>
                    </Link>
                    <SearchBar
                        searchQuery={searchInput}
                        setSearchQuery={setSearchInput}
                    />
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: "15px",
                                fontWeight: 600,
                                color: "white",
                                textAlign: "center",
                            }}
                        >
                            My Account
                        </Typography>
                    </Link>
                    <Link to="/seller" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: "15px",
                                fontWeight: 600,
                                color: "white",
                                textAlign: "center",
                            }}
                        >
                            Become a seller
                        </Typography>
                    </Link>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: "15px",
                                fontWeight: 600,
                                color: "white",
                                textAlign: "center",
                            }}
                        >
                            More
                        </Typography>
                    </Link>
                    <DropdownMenu items={myaccountMenu} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default UserNavbar;
