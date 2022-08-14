import React, { useState } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { LoginContext } from '../LoginContext/LoginContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import md5 from 'md5'
function HomePrivateEdit(props) {
    
    const globaltext = React.useContext(LoginContext);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
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
    
        return year + '-' + month + '-' + day;
    }
    const d = new Date(globaltext.infostaff[0].NgaySinh)

    const NgaySinhformated = getFormattedDate(d);

    
    function IsInvalidEmail(the_email) {
        var at = the_email.indexOf("@");
        var dot = the_email.lastIndexOf(".");
        var space = the_email.indexOf(" ");
        
       if ((at !== -1) && //có ký tự @
        (at !== 0) && //ký tự @ không nằm ở vị trí đầu
        (dot !== -1) && //có ký tự .
        (dot > at + 1) && (dot < the_email.length - 1) //phải có ký tự nằm giữa @ và . cuối cùng
        &&
        (space === -1)) //không có khoẳng trắng 
        {
        return true;
        } else {
          alert("Địa chỉ không hợp lệ : định dạng (<tên>@gmail.com)");
        return false;
        }
    }
    
    const [infostaff , setInfostaff] = useState({
        IDNhanVien : globaltext.infostaff[0].IDNhanVien,
        MaNhanVien : globaltext.infostaff[0].MaNhanVien,
        HoTen : globaltext.infostaff[0].HoTen,
        Email : globaltext.infostaff[0].Email,
        GioiTinh : globaltext.infostaff[0].GioiTinh,
        SoDienThoai : globaltext.infostaff[0].SoDienThoai,
        NgaySinh : NgaySinhformated,
        DiaChi : globaltext.infostaff[0].DiaChi,
        CCCD : globaltext.infostaff[0].CCCD,
        ProfilePicture : 'anonymous.png',
        TaiKhoan : globaltext.infostaff[0].TaiKhoan,
        MatKhau :   globaltext.infostaff[0].MatKhau,
    })

    const DATE = new Date();
    
    var Year = DATE.getFullYear() - 18
    var Month = DATE.getMonth()+1
    var Day = DATE.getDate()
   
    

    var CheckDATE
    if(Day < 10 && Month < 10 ){
        CheckDATE = Year+'-0'+Month+'-0'+ Day
    }
    if(Day>10 && Month < 10) {
        CheckDATE = Year+'-0'+Month+'-'+ Day
    }
    if(Day<10 && Month>10) {
        CheckDATE = Year+'-'+Month+'-0'+ Day
    }
    

    const CheckForm = () => {
        var HoTen = false;
        var Email = false; 
        var SoDienThoai = false;
        var DiaChi = false;
        var CCCD = false;
        var checkdate = false; 
        var matkhau = false;
        const checkdate2 = new Date(CheckDATE);
        const checkdate1 = new Date(infostaff.NgaySinh)
        if(infostaff.HoTen.length !== 0 && infostaff.HoTen.search(/[0-9]/) === -1 ){
            HoTen = true;   
           
        }else{
            alert('Họ tên không được có số hoặc rông')
        }
        if(IsInvalidEmail(infostaff.Email) !== false){
            Email = true;
           
        }else{
            alert('Email không được rỗng')
        }
        
        if(infostaff.SoDienThoai.length !== 0 && infostaff.SoDienThoai.length === 10){
            SoDienThoai = true
           
        }else{
            alert('Số điện thoại phải đủ 10 ký tự')
        }
        if(infostaff.DiaChi.length !==0) {
            DiaChi = true;
           
        }else{
            alert('Địa chỉ không được rỗng')
        }
        if(infostaff.CCCD.length !== 0 && infostaff.CCCD.length === 12){
            CCCD = true
           
        }else{
            alert('Căng cước phải đủ 12 số')
        }
        if(checkdate2 - checkdate1 >= 0) {
            checkdate = true;
            
        }else{
            alert('date')
        }
        if(infostaff.MatKhau.length !== 0 && infostaff.MatKhau.length >= 6) {
            matkhau = true
            
        }else{
            alert('Mật khẩu phải đủ từ 6 ký tự trở lên')
        }
        if(HoTen === true && Email === true && SoDienThoai === true &&  DiaChi === true && CCCD ===true && checkdate === true  && matkhau === true) {
            UpdateStaff();
        }
    }


    const UpdateStaff = () => {
        axios.put('http://localhost:5199/api/Login',infostaff)
            .then(res => res.data)
            .then(res => {
              
                if(res.severity === 'success') {
                    alert('Cập nhật thành công')
                    globaltext.updateInfoPrivateStaff()
                }
                if(res.severity === 'warning'){
                    alert('Cập nhật thất bại ')
                }

            })
    }

   
    
  return (
   
    <div>
    
        <Box sx={style}>
           
            <Box sx={Info__style}>
                <Typography variant="h4" style={{ width: 1200, paddingBottom: 10 , color:"var(--color2)"}}>
                    Cập nhật thông tin nhân viên
                </Typography>

                <Box width={"100%"} height={400} display='flex' justifyContent={'space-between'} marginBottom={3}>
                        <Box width={"47%"} height={"100%"}  display='flex' flexDirection={'column'} justifyContent={'space-around'}>
                                
                             <TextField  label="Họ tên" variant="outlined" defaultValue={infostaff.HoTen}
                             onChange={(e)=>{
                                setInfostaff({...infostaff, HoTen : e.target.value})
                                }}
                             />
                             <TextField  label="Địa chỉ" variant="outlined" defaultValue={infostaff.DiaChi}
                             onChange={(e)=>{
                                setInfostaff({...infostaff, Diachi : e.target.value})
                                }}
                             />
                             <TextField  label="CCCD" type="number" overwrite variant="outlined" defaultValue={infostaff.CCCD}
                             onChange={(e)=>{
                                setInfostaff({...infostaff, CCCD : e.target.value})
                                }}
                             />
                             <TextField  label="Mật khẩu" variant="outlined" type={'password'} defaultValue={infostaff.MatKhau}
                             onChange={(e)=>{
                                setInfostaff({...infostaff, MatKhau : md5(e.target.value)})
                                }}
                             />  

                        </Box>
                        <Box width={"47%"} height={"100%"}  display='flex' flexDirection={'column'} justifyContent={'space-around'}>
                                
                             <TextField id="outlined-basic" label="Email" variant="outlined" defaultValue={infostaff.Email}
                             onChange={(e)=>{
                                setInfostaff({...infostaff, Email : e.target.value})
                                }}
                             />
                             <TextField id="outlined-basic" label="Điện thoại" type="number" variant="outlined" defaultValue={infostaff.SoDienThoai}
                             onChange={(e)=>{
                                setInfostaff({...infostaff, SoDienThoai : e.target.value})
                                }}
                             />
                             <TextField id="outlined-basic" label="Ngày sinh" variant="outlined" type={'date'}  defaultValue={infostaff.NgaySinh}
                            
                             onChange={(e)=>{
                                setInfostaff({...infostaff, NgaySinh : e.target.value})
                                }}
                             />
                            
                             <FormControl fullWidth sx = {{display : "flex",justifyContent:'center',alignItems:'center'}}>
                             <FormLabel id="demo-row-radio-buttons-group-label">Giới tính</FormLabel>
                             <RadioGroup
                               row
                               aria-labelledby="demo-row-radio-buttons-group-label"
                               name="row-radio-buttons-group"
                               value={infostaff.GioiTinh}
                               onChange={(e)=>{
                                setInfostaff({...infostaff, GioiTinh : e.target.value})
                                }}
                             >
                               <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                               <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                             
                             </RadioGroup>
                           </FormControl>
                        </Box>
                </Box>


                       
            </Box>
            <Box width = "100%" display="flex" justifyContent={'flex-end'} paddingRight="25px">
            <Button variant="contained" color='success' sx ={{marginRight:3}}
                                onClick = {CheckForm}
            > Cập nhật  </Button>
            <Button variant="contained"  onClick = {()=> {props.clickoff(false)}}> Quay lại </Button>
            </Box>
            
        </Box>
    
       
    
    
    </div>
  )
}

export default HomePrivateEdit