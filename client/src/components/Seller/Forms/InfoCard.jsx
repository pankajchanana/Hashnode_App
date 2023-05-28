import { Box, Typography } from '@mui/material'
import React from 'react'

export default function InfoCard({name,desc,img}) {
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"start", width:"200px",padding:2,mt:2,ml:2}}>
        <img style={{height:"70px"}} src={img}/>
        <Typography sx={{mt:2,fontWeight:600}}>{name}</Typography>
        <Typography  sx={{mt:2}}>{desc}</Typography>
    </Box>
  )
}
