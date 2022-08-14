import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { FormControl, TextField, FormControlLabel, FormGroup, FormLabel, ButtonGroup } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';


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

const AddForm__style = {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: 5
};
export default function EmployeeFormEdit({ employee, employeeList, empRolesEdit, rolesEdit, getIDQuyenByIDNhanVien, handleResetPage}) {
    const [addEmp, setAddEmp] = React.useState({
        idnhanvien: employee.IDNhanVien,
        email: employee.Email,
        manhanvien: employee.MaNhanVien,
        tennhanvien: employee.HoTen,
        sdt: employee.SoDienThoai,
        diachi: employee.DiaChi,
        cccd: employee.CCCD,
        gioiTinh: employee.GioiTinh,
        profilepicture: employee.ProfilePicture,
        taikhoan: employee.TaiKhoan,
        matkhau: employee.MatKhau,
        ngaysinh: employee.NgaySinh
    });
    var md5 = require('md5');
    const [emailError, setEmailError] = React.useState(false);
    const [tennhanvienError, setTenNhanVienError] = React.useState(false);
    const [sdtError, setSdtError] = React.useState(false);
    const [diachiError, setDiaChiError] = React.useState(false);
    const [cccdError, setCCCDError] = React.useState(false);

    const defaultEmpRoles = getIDQuyenByIDNhanVien(employee.IDNhanVien, empRolesEdit, rolesEdit);
    const [addEmpRoles, setAddEmpRoles] = React.useState(defaultEmpRoles);

    const handleCheck = (id) => {
        setAddEmpRoles(prev => {
            const isChecked = addEmpRoles.includes(id)
            if(isChecked) {
                return addEmpRoles.filter(item => item !== id)
            }else{
                return [...prev, id]
            }
        })
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setEmailError(false);
        setTenNhanVienError(false);
        setSdtError(false);
        setDiaChiError(false);
        setCCCDError(false);
        setAddEmpRoles(getIDQuyenByIDNhanVien(employee.IDNhanVien, empRolesEdit, rolesEdit));
        setAddEmp({
            ...addEmp, 
            idnhanvien: employee.IDNhanVien,
            email: employee.Email,
            manhanvien: employee.MaNhanVien,
            tennhanvien: employee.HoTen,
            sdt: employee.SoDienThoai,
            diachi: employee.DiaChi,
            cccd: employee.CCCD,
            gioiTinh: employee.GioiTinh,
            profilepicture: employee.ProfilePicture,
            taikhoan: employee.TaiKhoan,
            matkhau: employee.MatKhau,
            ngaysinh: employee.NgaySinh
        });
        setOpen(true);
    }
    const handleClose = () => {
        setEmailError(false);
        setTenNhanVienError(false);
        setSdtError(false);
        setDiaChiError(false);
        setCCCDError(false);
        setAddEmpRoles(getIDQuyenByIDNhanVien(employee.IDNhanVien, empRolesEdit, rolesEdit));
        setAddEmp({
            ...addEmp, 
            idnhanvien: employee.IDNhanVien,
            email: employee.Email,
            manhanvien: employee.MaNhanVien,
            tennhanvien: employee.HoTen,
            sdt: employee.SoDienThoai,
            diachi: employee.DiaChi,
            cccd: employee.CCCD,
            gioiTinh: employee.GioiTinh,
            profilepicture: employee.ProfilePicture,
            taikhoan: employee.TaiKhoan,
            matkhau: employee.MatKhau,
            ngaysinh: employee.NgaySinh
        });
        setOpen(false)
    };

    function validateEmail(email){
        var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return EMAIL_REGEX.test(email);
    }
    //console.log(employeeList);
    function isDuplicateCCCD(idNV, cccd){
        var result = false;
        for(var i=0; i < employeeList.length; i++){
            if(employeeList[i].IDNhanVien === idNV){
                continue;
            }
            if(employeeList[i].CCCD === cccd.toString()) {
                result = true;
                /*
                console.log('loop #' + i + ' id: '+ employeeList[i].IDNhanVien)
                console.log( cccd.toString());
                */
                break;
            }
        }
        return result;
    }

    function isDuplicateSDT(idNV, sdt){
        var result = false;
        for(var i=0; i < employeeList.length; i++){
            if(employeeList[i].IDNhanVien === idNV){
                continue;
            }
            if(employeeList[i].SoDienThoai === sdt.toString()) {
                result = true;
                /*
                console.log('loop #' + i + ' id: '+ employeeList[i].IDNhanVien)
                console.log( sdt.toString());
                */
                break;
            }
        }
        return result;
    }

    function isDuplicateEmail(idNV, email){
        var result = false;
        for(var i=0; i < employeeList.length; i++){
            if(employeeList[i].IDNhanVien === idNV){
                continue;
            }
            if(employeeList[i].Email === email.toString()) {
                result = true;
                /*
                console.log('loop #' + i + ' id: '+ employeeList[i].IDNhanVien)
                console.log( email.toString());
                */
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
        
        if(addEmp.email == '' || !validateEmail(addEmp.email) || isDuplicateEmail(addEmp.idnhanvien, addEmp.email)) {
            setEmailError(true);
        }else validEmail = true

        if(addEmp.tennhanvien == '') {
            setTenNhanVienError(true);
        }else validHoTen = true

        if((addEmp.sdt === '' || isNaN(+addEmp.sdt) || addEmp.sdt.length !== 10 || isDuplicateSDT(addEmp.idnhanvien, addEmp.sdt)) ) {
            setSdtError(true);
        }else validSDT= true

        if(addEmp.diachi == '') {
            setDiaChiError(true);
        }else validDiaChi = true

        if(addEmp.cccd === '' || addEmp.cccd.length !== 12 || isNaN(+(addEmp.cccd)) || isDuplicateCCCD(addEmp.idnhanvien, addEmp.cccd)) {
            setCCCDError(true);
        }else validCCCD = true

        if(addEmp.ngaysinh == null) {
            //setNgaySinh('');
            setAddEmp({...addEmp, ngaysinh: '' });
        }
        
        const today = new Date().getFullYear();
        const ngaySinh = new Date(addEmp.ngaysinh);
        //console.log(ngaySinh.getFullYear());
        if(ngaySinh){
            //console.log(today - ngaySinh.getFullYear());
            if(ngaySinh!=null && (today - ngaySinh.getFullYear() < 18)){
                //setNgaySinh('');
                setAddEmp({...addEmp, ngaysinh: '' });
            }else validNgaySinh = true;
        }
 
        //if(email && tennhanvien && sdt && diachi && cccd && ngaysinh!=null && !(today - ngaysinh.getFullYear() < 18) && validateEmail(email)) {
        if(validCCCD && validDiaChi && validEmail && validHoTen && validNgaySinh && validSDT) {
            addEmp.ngaysinh = ngaySinh.toLocaleDateString();
            /*
            console.log(JSON.stringify({
                    IDNhanVien: addEmp.idnhanvien,
                    MaNhanVien: addEmp.manhanvien,
                    HoTen: addEmp.tennhanvien,
                    Email: addEmp.email,
                    GioiTinh: addEmp.gioiTinh,
                    SoDienThoai: addEmp.sdt,
                    NgaySinh: addEmp.ngaysinh,
                    DiaChi: addEmp.diachi,
                    CCCD: addEmp.cccd,
                    ProfilePicture: addEmp.profilepicture,
                    TaiKhoan: addEmp.taikhoan,
                    MatKhau: addEmp.matkhau
                }) );
            */
            fetch('http://localhost:5199/api/nhanvien',{
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    IDNhanVien: addEmp.idnhanvien,
                    MaNhanVien: addEmp.manhanvien,
                    HoTen: addEmp.tennhanvien,
                    Email: addEmp.email,
                    GioiTinh: addEmp.gioiTinh,
                    SoDienThoai: addEmp.sdt,
                    NgaySinh: addEmp.ngaysinh,
                    DiaChi: addEmp.diachi,
                    CCCD: addEmp.cccd,
                    ProfilePicture: addEmp.profilepicture,
                    TaiKhoan: addEmp.taikhoan,
                    MatKhau: addEmp.matkhau
                })
            });

            if(addEmpRoles.length > 0) {
                /*
                console.log('idnhanvien: '+addEmp.idnhanvien);
                */
                var jsonRoles = '[{"IDNhanVien": '+(addEmp.idnhanvien)+', "IDQuyen": '+addEmpRoles[0]+'}';
                
                for(var i=1; i < addEmpRoles.length; i++){
                   jsonRoles += ',{"IDNhanVien": '+(addEmp.idnhanvien)+', "IDQuyen": '+addEmpRoles[i]+'}';
                }
                jsonRoles += ']';
                
                fetch('http://localhost:5199/api/nhanvien/' + addEmp.idnhanvien, {
                    method: 'DELETE'
                }).then(data => console.log(data))
                .then(()=> {
                    fetch('http://localhost:5199/api/phanquyen',{
                        method: 'POST',
                        headers: {"Content-type": "application/json"},
                        body: jsonRoles
                    }).then(data => console.log(data))
                }).then(() => {
                    setOpen(false);
                    handleResetPage();
                })


                /* OLD
                for(var i=0; i < addEmpRoles.length; i++){
                    
                    console.log(
                        JSON.stringify({
                            IDNhanVien: addEmp.idnhanvien,
                            IDQuyen: addEmpRoles[i]
                        })
                    );
                    
                    wait(1);
                    editEmpRoles(addEmp.idnhanvien, addEmpRoles[i])
                    
                    fetch('http://localhost:5199/api/phanquyen',{
                        method: 'POST',
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify({
                            IDNhanVien: addEmp.idnhanvien,
                            IDQuyen: addEmpRoles[i]
                        })
                    }).then(data => console.log(data));
                    
                }
                */
            }
        }
               
    };

    const [checkNV, setCheckNV] = React.useState(false);
    const [buttonDisplay, setButtonDisplay] = React.useState(false);

    async function checkTuyenThuNV(){
        await fetch('http://localhost:5199/api/nhanvien/checktuyenthu/' + employee.IDNhanVien)
        .then(response => response.json())
        .then((data) => setCheckNV(data))
        .then(() => handleCheckTuyenThuNV(checkNV))
    }
    
    function handleCheckTuyenThuNV(checkNV){
        if(!checkNV){
            setButtonDisplay(true);
        }else{
            setButtonDisplay(false);
        }
    }
    checkTuyenThuNV()
    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end" onClick={handleOpen} marginBottom={1}>
                <IconButton variant="text" color="primary">
                    <Tooltip title="Chỉnh Sửa"><EditIcon sx={{ color: 'var(--color8)' }} />
                    </Tooltip>
                </IconButton>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Box sx={style}>
                    <Typography id="post-request-error-handling" variant="h5">
                        Chỉnh Sửa Thông Tin Nhân Viên
                    </Typography>
                    <Box sx={AddForm__style}>
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
                                    onChange={(e) => setAddEmp({...addEmp, tennhanvien: e.target.value})}
                                    label="Tên Nhân Viên"
                                    defaultValue={employee.HoTen}
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
                                        value={addEmp.ngaysinh} 
                                        onChange={(newNgaySinh) => {
                                            setAddEmp({...addEmp, ngaysinh: newNgaySinh });
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
                                    onChange={(e) => setAddEmp({...addEmp, sdt: e.target.value})}
                                    label="Số Điện Thoại" 
                                    defaultValue={employee.SoDienThoai}
                                    variant="outlined" 
                                    display="block"
                                    fullWidth 
                                    required 
                                    error={sdtError}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={(e) => setAddEmp({...addEmp, cccd: e.target.value})}
                                    label="Căn Cước Công Dân" 
                                    defaultValue={employee.CCCD}
                                    variant="outlined" 
                                    display="block"
                                    fullWidth 
                                    required 
                                    error={cccdError}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={(e) => setAddEmp({...addEmp, email: e.target.value})}
                                    label="Email" 
                                    defaultValue={employee.Email}
                                    variant="outlined" 
                                    display="block"
                                    fullWidth 
                                    required 
                                    error={emailError}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={(e) => setAddEmp({...addEmp, diachi: e.target.value})}
                                    label="Địa Chỉ" 
                                    defaultValue={employee.DiaChi}
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
                                <RadioGroup value={addEmp.gioiTinh} onChange={(e) => setAddEmp({...addEmp, gioiTinh: e.target.value})}>
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
                                <FormControlLabel control={<Checkbox value="1" checked={addEmpRoles.includes(1)} onChange={() => handleCheck(1)} />} label="Quản Trị" />
                                <FormControlLabel control={<Checkbox value="2" checked={addEmpRoles.includes(2)} onChange={() => handleCheck(2)} disabled={buttonDisplay} />} label="Thu Tiền" />
                                <FormControlLabel control={<Checkbox value="3" checked={addEmpRoles.includes(3)} onChange={() => handleCheck(3)} />} label="Thống Kê - Báo Cáo" />                             
                            </FormGroup>
                            </FormControl>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button 
                                    variant="contained" 
                                    color="primary"  
                                    onClick={(e) => setAddEmp({...addEmp, matkhau: md5('shizen123')})}
                                    sx={{marginRight: 2}}
                                >
                                    Reset Mật Khẩu
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary"  
                                    sx={{marginRight: 2}}
                                >
                                    Xác Nhận
                                </Button>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleClose} 
                                >
                                    Hủy Bỏ
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}