import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WcIcon from '@mui/icons-material/Wc';
import BadgeIcon from '@mui/icons-material/Badge';
import { LoginContext } from '../LoginContext/LoginContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HomePrivateView from './HomePrivateView';
import HomePrivateEdit from './HomePrivateEdit';
function HomePrivateStaff() {
  
  const globaltext = useContext(LoginContext);
  
  
  function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '-' + month + '-' + year;
  } 
  
  const d = new Date(globaltext.infostaff[0].NgaySinh)
  const NgaySinh = getFormattedDate(d);
    
   const [openmount , setOpenmount] = useState(false)
   const [openmount1 , setOpenmount1] = useState(false)
  
  return (
    <Box display={"flex"} 
    sx = {{ width : "100%"  , height : "100%" , flexDirection:"column"}}
    >
      <Typography variant='h4' color={"var(--color3)"}>
          THÔNG TIN NHÂN VIÊN
      </Typography>

      <Divider sx = {{height : "2px" , backgroundColor : "var(--color11)"}} />
      <Box display={"flex"}
        sx = {{
            backgroundColor: "var(--color11)",
            width : "80%",
            height : 450,
            alignSelf : 'center',
            marginTop : 8,
            borderRadius : 5,
            color : 'var(--colortext11)',
            padding : 6,
            
        }}
      >
              <Box  
              display={"flex"}
              sx = {{
                width : "40%",
                height : "100%",
                
                flexDirection : 'column'
              }}>
              {/* Tên , chức vụ , ảnh */}
              <Typography variant='h4'>
                  {globaltext.infostaff[0].HoTen}
              </Typography>

            <Typography variant='h6' marginTop={1}  fontStyle= {'oblique'}>
              {   globaltext.quyen.map(element=> {
                return (
                  element.TenQuyen + ' - ' 
                )
             }) }
            </Typography>
             
            <Typography variant='p' marginTop={2} fontSize={18} fontStyle= {'oblique'} >
            {'MSNV :' + globaltext.infostaff[0].MaNhanVien}
            </Typography>
              </Box>
              
              <Box 
                sx = {{
                width : "60%",
                height : "100%",
                marginLeft : 3,
                flexDirection : "column",
                justifyContent : "space-around",
                marginTop : 3
                }}
                display = "flex"
                
              >
              
                  <Box width={"100%"} height="30%" display = "flex" sx = {{justifyContent:"space-between"}}>
                    <Box display={"flex"}  alignItem={"center"} width={"50%"} height={"70px"}>
                        <DateRangeIcon sx={{fontSize:30}} />
                        <Typography variant='p' marginLeft={2} fontSize={21}>
                        {NgaySinh}
                        
                        </Typography>
                    </Box>
                    <Box display={"flex"} marginLeft={2} alignItem={"center"} width={"50%"} height={"70px"}>
                        <LocalPhoneIcon sx={{fontSize:30}} />
                        <Typography variant='p' marginLeft={2} fontSize={21}>
                            {globaltext.infostaff[0].SoDienThoai}
                        
                        </Typography>
                    </Box>


                  </Box>  
                  <Box width={"100%"} height="30%" display = "flex" sx = {{justifyContent:"space-between"}}>
                  <Box display={"flex"}  alignItem={"center"} width={"50%"} height={"70px"}>
                      <EmailIcon sx={{fontSize:30}} />
                      <Typography variant='p' marginLeft={2} fontSize={21} fontStyle= {'oblique'}>
                      {globaltext.infostaff[0].Email}
                      
                      </Typography>
                  </Box>
                  <Box display={"flex"} marginLeft={2} alignItem={"center"} width={"50%"} height={"70px"}>
                      <WcIcon sx={{fontSize:30}} />
                      <Typography variant='p' marginLeft={2} fontSize={21}>
                      {globaltext.infostaff[0].GioiTinh}
                      
                      </Typography>
                  </Box>


                </Box>  
                <Box width={"100%"} height="30%" display = "flex" sx = {{justifyContent:"space-between"}}>
                <Box display={"flex"}  alignItem={"center"} width={"50%"} height={"70px"}>
                    <BadgeIcon sx={{fontSize:30}}
                    />
                    <Typography variant='p' marginLeft={2} fontSize={21}>
                    {globaltext.infostaff[0].CCCD}
                    
                    </Typography>
                </Box>
                <Box display={"flex"} marginLeft={2} alignItem={"center"} width={"50%"} height={"70px"}>
                    <AddLocationIcon sx={{fontSize:30}} />
                      <Typography variant='p'  marginLeft={2} fontSize={21}>
                      {globaltext.infostaff[0].DiaChi}

                      </Typography>
                </Box>


               

                  </Box>  
                      <Box
                       position={"relative"} 
                       width={"100%"} 
                       height={"60px"} 
                       paddingBottom = {2}
                       top={10} display="flex"
                       justifyContent={"flex-end"}
                       > 
                          <Button variant="outlined" color ='success'
                          sx ={{"&:hover": {
                            backgroundColor: 'var(--color10)'
                            
                          }}}
                          onClick={()=> {setOpenmount(!openmount)}}
                          >
                          <VisibilityIcon/> 	&#8194; Xem thông tin</Button>
                          <Button variant="outlined" color='warning' sx={{marginLeft:2,
                            "&:hover": {
                              backgroundColor: '#f7d7ad '
                            }
                          }}
                          onClick={()=> {setOpenmount1(!openmount1)}}
                          > <ModeEditIcon/>	&#8194; Sửa thông tin</Button>
                      </Box>
              </Box>
        
        </Box>

                         {openmount && <HomePrivateView
                            clickoff = {setOpenmount}
                          />}
                          {openmount1 && <HomePrivateEdit clickoff = {setOpenmount1}/>} 
    </Box>
  )
}

export default HomePrivateStaff