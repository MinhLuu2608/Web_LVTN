import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, TextField, FormControlLabel, FormGroup, FormLabel, ButtonGroup } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import { wait } from '@testing-library/user-event/dist/utils';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4
};

export default function EmployeeFormAdd({employees, handleResetPage}) {
    //Add Employee Form
    const [email, setEmail] = React.useState('');
    const [tennhanvien, setTenNhanVien] = React.useState('');
    const [sdt, setSdt] = React.useState('');
    const [diachi, setDiaChi] = React.useState('');
    const [cccd, setCCCD] = React.useState('');
    const [gioiTinh, setGioiTinh] = React.useState('Nam');
    var [ngaysinh, setNgaySinh] = React.useState(null);

    const [lastEmpID, setLastEmpID] = React.useState('');
    const [addEmpRoles, setAddEmpRoles] = React.useState([]);
    

    var md5 = require('md5');
    //Add Employee Form Handle Error
    const [emailError, setEmailError] = React.useState(false);
    const [tennhanvienError, setTenNhanVienError] = React.useState(false);
    const [sdtError, setSdtError] = React.useState(false);
    const [diachiError, setDiaChiError] = React.useState(false);
    const [cccdError, setCCCDError] = React.useState(false);

    async function postData(url = '', data = {}) {
        /*
        fetch('http://localhost:5199/api/nhanvien',{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                MaNhanVien: newMaNhanVien,
                HoTen: addEmp.tennhanvien,
                Email: addEmp.email,
                GioiTinh: addEmp.gioiTinh,
                SoDienThoai: addEmp.sdt,
                NgaySinh: addEmp.ngaysinh,
                DiaChi: addEmp.diachi,
                CCCD: addEmp.cccd,
                ProfilePicture: profilePicture,
                TaiKhoan: taikhoan,
                MatKhau: matkhau
            })
        })
        */
        const response = await fetch(url, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(data)
        })
        return response.json();
    }

    const getValue = (e) =>{
        let data = addEmpRoles;
        
        if(addEmpRoles.includes(e.target.value)){
            addEmpRoles.splice(addEmpRoles.indexOf(e.target.value), 1);
        }else{
            data.push(e.target.value);
            setAddEmpRoles(data);
        }

        fetch('http://localhost:5199/api/nhanvien/getlastempid')
            .then(res => res.json())
            .then(data => setLastEmpID(data[0].IDNhanVien))
            .then(console.log(lastEmpID))
        /*
        if(!addEmpRoles.includes(e.target.value)){
            data.push(e.target.value);
            setAddEmpRoles(data);
        }else{
            data.pop(e.target.value);
            setAddEmpRoles(data);
        }
        */
        /*
        console.log(addEmpRoles.includes(e.target.value))
        console.log(addEmpRoles);
        */
        /*
        for(var i=0; i < addEmpRoles.length; i++){
            console.log(addEmpRoles[i]);

            console.log(
                JSON.stringify({
                    IDNhanVien: addEmp.idnhanvien,
                    IDQuyen: addEmpRoles[i]
                })
            );
        }*/
        //console.log(addEmp.idnhanvien);
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setEmailError(false);
        setTenNhanVienError(false);
        setSdtError(false);
        setDiaChiError(false);
        setCCCDError(false);
        setNgaySinh(null);
        setOpen(true);

    }

    const handleClose = () => setOpen(false);

    function validateEmail(email){
        var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return EMAIL_REGEX.test(email);
    }

    function isDuplicateCCCD(cccd){
        var result = false;
        for(var i=0; i < employees.length; i++){
            if(employees[i].CCCD === cccd) {
                result = true;
                break;
            }
        }
        return result;
    }

    function isDuplicateSDT(sdt){
        var result = false;
        for(var i=0; i < employees.length; i++){
            if(employees[i].SoDienThoai === sdt) {
                result = true;
                break;
            }
        }
        return result;
    }

    function isDuplicateEmail(email){
        var result = false;
        for(var i=0; i < employees.length; i++){
            if(employees[i].Email === email) {
                result = true;
                break;
            }
        }
        return result;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError(false);
        setTenNhanVienError(false);
        setSdtError(false);
        setDiaChiError(false);
        setCCCDError(false);
        

        let validHoTen = false;
        let validCCCD = false;
        let validDiaChi = false;
        let validSDT = false;
        let validEmail = false;
        let validNgaySinh = false;

        if(email === '' || !validateEmail(email) || isDuplicateEmail(email)) {
            setEmailError(true);
        }else validEmail = true

        if(tennhanvien === '') {
            setTenNhanVienError(true);
        }else validHoTen = true

        if((sdt === '' || isNaN(+sdt) || sdt.length !== 10 || isDuplicateSDT(sdt)) ) {
            setSdtError(true);
        }else validSDT= true

        if(diachi === '') {
            setDiaChiError(true);
        }else validDiaChi = true

        if(cccd === '' || cccd.length !== 12 || isNaN(+(cccd)) || isDuplicateCCCD(cccd)) {
            setCCCDError(true);
        }else validCCCD = true

        const today = new Date().getFullYear();
        //console.log(today - addEmp.ngaysinh.getFullYear());
        if(ngaysinh == null) {
            setNgaySinh('');
        }

        if(ngaysinh){
            //console.log(today - ngaysinh.getFullYear());
            if(ngaysinh!=null && (today - ngaysinh.getFullYear() < 18)){
                setNgaySinh('');
            }else validNgaySinh = true;
        }

        //console.log(validCCCD && validDiaChi && validEmail && validHoTen && validNgaySinh && validSDT)
        if(validCCCD && validDiaChi && validEmail && validHoTen && validNgaySinh && validSDT) {
            setOpen(false);
            ngaysinh = ngaysinh.toLocaleDateString();
            //create new MaNhanVien
            var lastMaNhanVien = employees[employees.length-1].MaNhanVien;
            var newMaNhanVien = parseInt(lastMaNhanVien.substring(2));
            newMaNhanVien = newMaNhanVien+1;
            newMaNhanVien = newMaNhanVien.toString().padStart(4, '0');
            var taikhoan = email.substring(0, email.lastIndexOf('@')) + newMaNhanVien;
            newMaNhanVien = 'NV' + newMaNhanVien;
            //create taikhoan
            
            //hash default Matkhau
            var md5 = require('md5');
            var matkhau = md5('shizen123');
            //default profile picture
            var profilePicture = 'anonymous.png';

            /*
            console.log(JSON.stringify({
                MaNhanVien: newMaNhanVien,
                HoTen: tennhanvien,
                Email: email,
                GioiTinh: gioiTinh,
                SoDienThoai: sdt,
                NgaySinh: ngaysinh,
                DiaChi: diachi,
                CCCD: cccd,
                ProfilePicture: profilePicture,
                TaiKhoan: taikhoan,
                MatKhau: matkhau
                }) );
            *//*
            postData('http://localhost:5199/api/nhanvien', {
                MaNhanVien: newMaNhanVien,
                HoTen: tennhanvien,
                Email: email,
                GioiTinh: gioiTinh,
                SoDienThoai: sdt,
                NgaySinh: ngaysinh,
                DiaChi: diachi,
                CCCD: cccd,
                ProfilePicture: profilePicture,
                TaiKhoan: taikhoan,
                MatKhau: matkhau
            }).then(data => console.log(data));
            */
            /*
            fetch('http://localhost:5199/api/nhanvien',{
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    MaNhanVien: newMaNhanVien,
                    HoTen: addEmp.tennhanvien,
                    Email: addEmp.email,
                    GioiTinh: addEmp.gioiTinh,
                    SoDienThoai: addEmp.sdt,
                    NgaySinh: addEmp.ngaysinh,
                    DiaChi: addEmp.diachi,
                    CCCD: addEmp.cccd,
                    ProfilePicture: profilePicture,
                    TaiKhoan: taikhoan,
                    MatKhau: matkhau
                })
            })
            */
            if(addEmpRoles) {
                //console.log(addEmp.idnhanvien);
                var jsonRoles = '[{"IDNhanVien": '+(lastEmpID+1)+', "IDQuyen": '+addEmpRoles[0]+'}';
                
                for(var i=1; i < addEmpRoles.length; i++){
                   jsonRoles += ',{"IDNhanVien": '+(lastEmpID+1)+', "IDQuyen": '+addEmpRoles[i]+'}';
                }
                jsonRoles += ']';

                wait(1);
                postData('http://localhost:5199/api/nhanvien', {
                    MaNhanVien: newMaNhanVien,
                    HoTen: tennhanvien,
                    Email: email,
                    GioiTinh: gioiTinh,
                    SoDienThoai: sdt,
                    NgaySinh: ngaysinh,
                    DiaChi: diachi,
                    CCCD: cccd,
                    ProfilePicture: profilePicture,
                    TaiKhoan: taikhoan,
                    MatKhau: matkhau
                }).then(data => console.log(data))
                .then(() => {
                    fetch('http://localhost:5199/api/phanquyen',{
                        method: 'POST',
                        headers: {"Content-type": "application/json"},
                        body: jsonRoles
                    }).then(data => console.log(data))
                }).then(() => {
                    setEmail('');
                    setTenNhanVien('');
                    setSdt('');
                    setDiaChi('');
                    setCCCD('');
                    setGioiTinh('Nam');
                    setNgaySinh(null);
                    setAddEmpRoles([]);
                    handleResetPage();
                })  
                    //wait(1);
                    /* OLD
                    fetch('http://localhost:5199/api/phanquyen',{
                        method: 'POST',
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            IDNhanVien: lastEmpID+1,
                            IDQuyen: addEmpRoles[i]
                        })
                    }).then(data => console.log(data))
                    .catch((error) => {console.error('Error:', error)})
                    */
            }else{
                postData('http://localhost:5199/api/nhanvien', {
                    MaNhanVien: newMaNhanVien,
                    HoTen: tennhanvien,
                    Email: email,
                    GioiTinh: gioiTinh,
                    SoDienThoai: sdt,
                    NgaySinh: ngaysinh,
                    DiaChi: diachi,
                    CCCD: cccd,
                    ProfilePicture: profilePicture,
                    TaiKhoan: taikhoan,
                    MatKhau: matkhau
                }).then(data => console.log(data))
                .then(() => {
                    setEmail('');
                    setTenNhanVien('');
                    setSdt('');
                    setDiaChi('');
                    setCCCD('');
                    setGioiTinh('Nam');
                    setNgaySinh(null);
                    setAddEmpRoles([]);
                    handleResetPage();
                })
            }
        }        
    }

    return (
        <div>
            <Button sx={{ backgroundColor: 'var(--color7)' }} variant="contained" onClick={handleOpen}>Thêm Nhân Viên</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Thêm Nhân Viên
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
                    <Box
                        component="form" 
                        sx={{
                            '& > :not(style)': { m: 1 },
                          }} 
                        noValidate
                        autoComplete="off" 
                        onSubmit={handleSubmit}
                    >
                        <Grid container spacing={2}>
                          <Grid item xs={5}>
                            <TextField
                                onChange={(e) => setTenNhanVien(e.target.value)}
                                label="Tên Nhân Viên"
                                variant="outlined"
                                fullWidth
                                required 
                                error={tennhanvienError}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Ngày Sinh"
                                    value={ngaysinh} 

                                    onChange={(newNgaySinh) => {
                                        setNgaySinh(newNgaySinh)
                                    }}
                                    renderInput={(params) => 
                                        <TextField 
                                            fullWidth 
                                            required 
                                            {...params} 
                                        />}
                                />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={5}>
                            <TextField
                                onChange={(e) => setSdt(e.target.value)}
                                label="Số Điện Thoại" 
                                variant="outlined" 
                                display="block"
                                fullWidth 
                                required 
                                error={sdtError}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <TextField
                                onChange={(e) => setCCCD(e.target.value)}
                                label="Căn Cước Công Dân" 
                                variant="outlined" 
                                display="block"
                                fullWidth 
                                required 
                                error={cccdError}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email" 
                                variant="outlined" 
                                display="block"
                                fullWidth 
                                required 
                                error={emailError}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <TextField
                                onChange={(e) => setDiaChi(e.target.value)}
                                label="Địa Chỉ" 
                                variant="outlined" 
                                display="block"
                                fullWidth 
                                required 
                                error={diachiError}
                            />
                          </Grid>
                        </Grid>
                        
                        <FormControl sx={{display: 'block'}}>
                            <FormLabel>Giới Tính</FormLabel>
                            <RadioGroup value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)}>
                                <Grid container spacing={2}>
                                <Grid item>
                                    <FormControlLabel value="Nam" control={<Radio></Radio>} label="Nam"/>
                                </Grid>
                                <Grid item>
                                <FormControlLabel value="Nữ" control={<Radio></Radio>} label="Nữ"/>
                                </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{display: 'block'}}>
                          <FormLabel>Phân Quyền</FormLabel>
                          <FormGroup>
                            <FormControlLabel control={<Checkbox value="1" onChange={(e)=>getValue(e)} />} label="Quản Trị" />
                            <FormControlLabel control={<Checkbox value="2" onChange={(e)=>getValue(e)} />} label="Thu Tiền" />
                            <FormControlLabel control={<Checkbox value="3" onChange={(e)=>getValue(e)} />} label="Thống Kê - Báo Cáo" />
                          </FormGroup>
                        </FormControl>
                        
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary"  
                                sx={{marginRight: 2}}
                            >
                                Submit
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleClose} 
                            >
                                Cancel
                            </Button>
                        </Box>
                        
                    </Box>
                </Typography>
            </Box>
            </Modal>
        </div >
    );
}