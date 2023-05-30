import { Grid } from '@mui/material'
import React from 'react'
import SellerMain from './SellerMain'
import SellerSideBar from './SellerSideBar'

export default function Home() {
  return (
    <Grid container>
        <Grid item xs={2}>
            <SellerSideBar/>
        </Grid>
        <Grid item xs={10}>
            <SellerMain/>
        </Grid>
    </Grid>
  )
}
