import { Box } from '@mui/material'
import React from 'react'
import { navData } from '../../constants/constants';
import Card from '../Card';


export default function SubHeader() {

  return (
    <Box sx={{marginTop:"10px",display:"flex",flexWrap:'wrap',justifyContent:"space-evenly"}}>
     { !!navData && navData.map((product)=>{
        return <Card img={product.url} title={product.text}/>
      })}
    </Box>
  )
}
