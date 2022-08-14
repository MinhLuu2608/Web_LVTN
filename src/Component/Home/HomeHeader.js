import React from 'react'
import { Box, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BreakCookie, GetCookie, cookie } from '../Cookie/CookieFunc';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link, useNavigate } from 'react-router-dom';
function HomeHeader(props) {

  const navigate = useNavigate();

  const Logout = () => {
    GetCookie(document.cookie)
    BreakCookie(cookie)
    window.location.reload();
  }


  return (
    <Box
      sx={
        {
          width: 200,
          height: 'auto',
          backgroundColor: 'var(--color3)',
          position: 'absolute',
          right: 5,
          borderRadius: 2,
          top: 54,
          display: "flex",
          flexDirection: 'column',
          color: 'white'
        }
      }
    >
    
    <Link to={"/home/privatestaff"} className="Private__Link">
    <Box sx={{
      display: 'flex', justifyContent: 'left', alignItems: 'center', paddingTop: 1, paddingLeft: 2, paddingBottom: 1,
      width: "100%", height: "100%",
      '&:hover': {
        color: 'var(--color3)',
        backgroundColor: 'var(--color1)',
        borderRadius: 2,
        cursor: 'pointer',
      },
    }}>
   
      <AccountCircleIcon
        sx={{ marginRight: 1 }}
      />

      <Typography >
        Thông tin cá nhân
      </Typography>
     
    </Box>
    </Link>
     
      <Box
        onClick={Logout}
        
        sx={{
          display: 'flex', justifyContent: 'left', alignItems: 'center', paddingTop: 1, paddingLeft: 2, paddingBottom: 1,
          width: "100%", height: "100%",
          '&:hover': {
            color: 'var(--color3)',
            backgroundColor: 'var(--color1)',
            borderRadius: 2,
            cursor: 'pointer',
          },
        }}>

        <PowerSettingsNewIcon
          sx={{ marginRight: 1 }}
        />

        <Typography
        
        >
          Thoát
        </Typography>

      </Box>


    </Box>
  )
}

export default HomeHeader