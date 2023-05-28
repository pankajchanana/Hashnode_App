
import { Box, Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DataContext } from '../../utilities/ContextStore';
import { databases } from '../../../services/appwriteConfig';


export default function SellerSignup3() {

  const {
    setSellerSignupStatus,
    sellerSignupData,
  } = useContext(DataContext);

    const handleSellerSignup3=(e)=>{
        e.preventDefault();
        const uid=sessionStorage.getItem('uid');
        sellerSignupData.seller_signup_status="4";
        const promise = databases.updateDocument("646f96a60d5767f59620","646f978d35a7eccbb93b",uid,sellerSignupData);
        promise.then((res)=>{
            setSellerSignupStatus("4")
        })
    }
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",mt:30}}>
        <Typography> Your all set Cherit , let's jump to the Dashboard </Typography>
        <Button onClick={handleSellerSignup3} variant='contained' sx={{mt:3}} endIcon={<ArrowForwardIcon />}>Let's get Started </Button>
    </Box>
  )
}
