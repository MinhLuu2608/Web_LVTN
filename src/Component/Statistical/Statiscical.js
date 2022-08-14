
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react'

import '../../CSS/statistical.css'
import CustomerStatistical from './CustomerStatistical';
import TurnoverStatistical from './TurnoverStatistical';



function Statiscical() {

    


  const [CustomeTurnover,setCustomeTurnover] = useState('1')
 
  
    return (
    <Box display={'flex'} flexDirection={'column'}>

        <Typography variant='h6' sx={{color : "var(--color2)" , fontSize : 25}}>THỐNG KÊ BÁO CÁO CHI TIẾT</Typography>
        
              <ToggleButtonGroup
              color="primary"
              value={CustomeTurnover}
              exclusive
              onChange={(e)=> {setCustomeTurnover(e.target.value)}}
              sx={{marginTop : 3}}
            >
              <ToggleButton value="1">Khách Hàng</ToggleButton>
              <ToggleButton value="2">Doanh Thu</ToggleButton>
        
            </ToggleButtonGroup>

            {CustomeTurnover === '1' ? <CustomerStatistical/> : <TurnoverStatistical/>}
           
    </Box>
  )
}

export default Statiscical