import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import { Button } from '@mui/material';
import { LoginContext } from '../LoginContext/LoginContext';
function HomePrivateView(props) {
    const globaltext = React.useContext(LoginContext);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };
    const Info__style = {
        display: 'flex',
        width: 1000,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10
    };
    function getFormattedDate(date) {
        var year = date.getFullYear();
    
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
    
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
    
        return day + '/' + month + '/' + year;
    }
    const d = new Date(globaltext.infostaff[0].NgaySinh)
  const NgaySinh = getFormattedDate(d);
    

  return (
   
    <div>
    
        <Box sx={style}>
           
            <Box sx={Info__style}>
                <Typography variant="h4" style={{ width: 1200, paddingBottom: 40}}>
                    Chi Tiết Nhân Viên
                </Typography>
                <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                    Họ Tên: <Typography variant="inherit">{globaltext.infostaff[0].HoTen}</Typography>
                </Typography>
                <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                    Mã Số Nhân Viên: <Typography variant="inherit">{globaltext.infostaff[0].MaNhanVien}</Typography>
                </Typography>
                <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                    Chức Vụ: <Typography variant="inherit">{   globaltext.quyen.map(element=> {
                        return (
                          element.TenQuyen + ' - ' 
                        )
                     }) }</Typography>
                </Typography>
                <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                    Giới Tính: <Typography variant="inherit">{globaltext.infostaff[0].GioiTinh}</Typography>
                </Typography>
                <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                    Ngày Sinh: <Typography variant="inherit"> {NgaySinh}</Typography>
                </Typography>
                <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                    Số Điện Thoại: <Typography variant="inherit">{globaltext.infostaff[0].SoDienThoai}</Typography>
                </Typography>
                <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                    Số CCCD: <Typography variant="inherit">{globaltext.infostaff[0].CCCD}</Typography>
                </Typography>
                <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                    Email: <Typography variant="inherit">{globaltext.infostaff[0].Email}</Typography>
                </Typography> 
                <Typography variant="h6" style={{ width: 500, paddingBottom: 40, paddingRight: 40 }}>
                    Địa Chỉ: <Typography variant="inherit">{globaltext.infostaff[0].DiaChi}</Typography>
                </Typography>  
                <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                    Tài Khoản: <Typography variant="inherit">{globaltext.infostaff[0].TaiKhoan}</Typography>
                </Typography>        
            </Box>
            <Box width = "100%" display="flex" justifyContent={'flex-end'} paddingRight="25px">
            
            <Button variant='contained'  onClick = {()=> {props.clickoff(false)}}> Quay lại </Button>
            </Box>
            
        </Box>
    
       
    
    
    </div>
  )
}

export default HomePrivateView