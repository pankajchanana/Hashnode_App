import { Box, Typography } from '@mui/material'
import React from 'react'


export default function Card({img,title}) {
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
        <img src={img} height="100px" width="100px"/>
        <Typography sx={{textAlign:"center",marginTop:"10px"}}>{title}</Typography>
    </Box>
  )
}
