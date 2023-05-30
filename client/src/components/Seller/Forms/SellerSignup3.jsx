
import { Box, Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DataContext } from '../../utilities/ContextStore';
import { account, databases } from '../../../services/appwriteConfig';
import { Link, useNavigate } from 'react-router-dom';
import { Query } from 'appwrite';


export default function SellerSignup3() {

  const {
    setSellerSignupStatus,
    sellerSignupData,
  } = useContext(DataContext);
  const navigate=useNavigate()

    const handleSellerSignup3=(e)=>{
        e.preventDefault();
        const uid=sessionStorage.getItem('uid');
        const promises = databases.listDocuments("646f96a60d5767f59620","646f978d35a7eccbb93b",
      [Query.limit(100), Query.offset(0)]
      );
        promises.then((res)=>{
            const currentUser=res.documents.filter((q)=>q.$id===uid)
            console.log(currentUser,"user")
        }).catch((e)=>{
          console.log(e,"error in signup3")
        })
    
        console.log(sellerSignupData,"sellerSignupData in sign3")
        const user=account.create(
            uid,
            sellerSignupData.email,
            sellerSignupData.password,
            sellerSignupData.full_name
        )
        user.then((res)=>{
            sellerSignupData.seller_signup_status="4";
            const promise = databases.updateDocument("646f96a60d5767f59620","646f978d35a7eccbb93b",uid,sellerSignupData);
            promise.then((res)=>{
                setSellerSignupStatus("4")
                navigate("/seller-home")
            })
            console.log(res,"account created")
        }).catch((e)=>{
          console.log("not created")
            setSellerSignupStatus("3")
        })
    }
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",mt:30}}>
        <Typography> Your all set Cherit , let's jump to the Dashboard </Typography>
       <Button onClick={handleSellerSignup3} variant='contained' sx={{mt:3}} endIcon={<ArrowForwardIcon />}>Let's get Started </Button>
    </Box>
  )
}
