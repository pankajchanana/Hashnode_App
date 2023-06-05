import React from "react";
import UserNavbar from "../../Navbar/UserNavbar";
import { Box, Grid } from "@mui/material";


const UserDashboard = () => {
  return (
    <Box sx={{
        margin: "-8px",
    }}>
        <UserNavbar />
        <Grid container>
            <Grid item>
                Hello World
            </Grid>
        </Grid>
    </Box>
    
  );
};

export default UserDashboard;
