import { Box } from '@mui/material'
import React from 'react'
import { customers } from '../constants/data'
import ReviewCard from './ReviewCard'

export default function CustomerReview() {
  return (
    <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
        {customers.map((cust)=>{
            return <ReviewCard img={cust.img} name={cust.name} desc={cust.desc} />
        })}
    </Box>
  )
}
