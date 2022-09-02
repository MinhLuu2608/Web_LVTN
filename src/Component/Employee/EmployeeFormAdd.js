import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { FormControl, TextField, FormControlLabel, FormLabel } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { generate } from '@wcj/generate-password'
import SnackBarContext from '../SnackBar/SnackBarContext'
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction'


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

export default function EmployeeFormAdd({ employees, handleResetPage }) {
    const [, dispatch] = React.useContext(SnackBarContext)

    //Add Employee Form
    const [email, setEmail] = React.useState('');
    const [tennhanvien, setTenNhanVien] = React.useState('');
    const [sdt, setSdt] = React.useState('');
    const [diachi, setDiaChi] = React.useState('');
    const [cccd, setCCCD] = React.useState('');
    const [gioiTinh, setGioiTinh] = React.useState('Nam');
    const [taiKhoan, setTaiKhoan] = React.useState('');
    const [matKhau, setMatKhau] = React.useState('');
    var [ngaysinh, setNgaySinh] = React.useState(null);

    const [lastEmpID, setLastEmpID] = React.useState('');

    //Add Employee Form Handle Error
    const [emailError, setEmailError] = React.useState(false);
    const [tennhanvienError, setTenNhanVienError] = React.useState(false);
    const [sdtError, setSdtError] = React.useState(false);
    const [diachiError, setDiaChiError] = React.useState(false);
    const [cccdError, setCCCDError] = React.useState(false);

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

    const handleGeneratePassword = () => {
        const pwd = generate({
            length: 6,
            special: false
        });
        setMatKhau(pwd);
    }


    const handleClose = () => setOpen(false);

    var md5 = require('md5');


    function validateEmail(email) {
        var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return EMAIL_REGEX.test(email);
    }

    function isDuplicateCCCD(cccd) {
        var result = false;
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].CCCD === cccd) {
                result = true;
                break;
            }
        }
        return result;
    }

    function isDuplicateSDT(sdt) {
        var result = false;
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].SoDienThoai === sdt) {
                result = true;
                break;
            }
        }
        return result;
    }

    function isDuplicateEmail(email) {
        var result = false;
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].Email === email) {
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

        if (email === '' || !validateEmail(email) || isDuplicateEmail(email)) {
            setEmailError(true);
        } else validEmail = true

        if (tennhanvien === '') {
            setTenNhanVienError(true);
        } else validHoTen = true

        if ((sdt === '' || isNaN(+sdt) || sdt.length !== 10 || isDuplicateSDT(sdt))) {
            setSdtError(true);
        } else validSDT = true

        if (diachi === '') {
            setDiaChiError(true);
        } else validDiaChi = true

        if (cccd === '' || cccd.length !== 12 || isNaN(+(cccd)) || isDuplicateCCCD(cccd)) {
            setCCCDError(true);
        } else validCCCD = true

        const today = new Date().getFullYear();
        if (ngaysinh == null) {
            setNgaySinh('');
        }

        if (ngaysinh) {
            if ((today - ngaysinh.getFullYear() < 18)) {
                dispatch(setOpenSnackBar());
                dispatch(setMessage("Tuổi nhân viên không nhỏ hơn 18"));
                dispatch(setSeverity("warning"));
            } else validNgaySinh = true;
        }

        fetch('http://localhost:5199/api/nhanvien/getlastempid')
            .then(res => res.json())
            .then(data => setLastEmpID(data[0].IDNhanVien))

        if (validCCCD && validDiaChi && validEmail && validHoTen && validNgaySinh && validSDT) {
            ngaysinh = ngaysinh.toLocaleDateString();
            //create new MaNhanVien
            var lastMaNhanVien = employees[employees.length - 1].MaNhanVien;
            var newMaNhanVien = parseInt(lastMaNhanVien.substring(2));
            newMaNhanVien = newMaNhanVien + 1;
            newMaNhanVien = newMaNhanVien.toString().padStart(4, '0');
            newMaNhanVien = 'NV' + newMaNhanVien;
            //create taikhoan

            //hash default Matkhau
            // var md5 = require('md5');
            // var matkhau = md5('shizen123');
            //default profile picture
            var profilePicture = 'anonymous.png';

            // console.log(md5(matKhau))

            fetch("http://localhost:5199/api/nhanvien/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    HoTen: tennhanvien,
                    Email: email,
                    GioiTinh: gioiTinh,
                    SoDienThoai: sdt,
                    NgaySinh: ngaysinh,
                    DiaChi: diachi,
                    CCCD: cccd,
                    ProfilePicture: profilePicture,
                    TaiKhoan: taiKhoan,
                    MatKhau: matKhau
                    // MatKhau: md5(matKhau)
                })
            })
                .then(res => res.json())
                .then((result) => {
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage(result.message));
                    dispatch(setSeverity(result.severity));
                    if (result.severity === "success") {
                        setEmail('')
                        setTenNhanVien('')
                        setSdt('')
                        setDiaChi('')
                        setCCCD('')
                        setGioiTinh('Nam')
                        setNgaySinh(null)
                        setTaiKhoan('')
                        setMatKhau('')
                        handleResetPage()
                        setOpen(false)
                    }
                },
                    (error) => {
                        dispatch(setOpenSnackBar())
                        dispatch(setMessage("Failed"))
                        dispatch(setSeverity("error"))
                    });

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
                                <Grid item xs={5}>
                                    <TextField
                                        value={taiKhoan}
                                        onChange={(e) => setTaiKhoan(e.target.value)}
                                        label="Tên Tài khoản"
                                        display="block"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        value={matKhau}
                                        onChange={(e) => setMatKhau(e.target.value)}
                                        label="Mật khẩu"
                                        display="block"
                                        fullWidth
                                    />
                                    <Button onClick={handleGeneratePassword}>Tạo mật khẩu</Button>
                                </Grid>

                            </Grid>

                            <FormControl sx={{ display: 'block', paddingLeft: 2 }}>
                                <FormLabel>Giới Tính</FormLabel>
                                <RadioGroup value={gioiTinh} onChange={(e) => setGioiTinh(e.target.value)}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <FormControlLabel value="Nam" control={<Radio></Radio>} label="Nam" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="Nữ" control={<Radio></Radio>} label="Nữ" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                            {/* 
                            <FormControl sx={{ display: 'block' }}>
                                <FormLabel>Phân Quyền</FormLabel>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox value="1" onChange={(e) => getValue(e)} />} label="Quản Trị" />
                                    <FormControlLabel control={<Checkbox value="2" onChange={(e) => getValue(e)} />} label="Thu Tiền" />
                                    <FormControlLabel control={<Checkbox value="3" onChange={(e) => getValue(e)} />} label="Thống Kê - Báo Cáo" />
                                </FormGroup>
                            </FormControl> */}

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginRight: 2 }}
                                >
                                    Xác nhận
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                                >
                                    Huỷ bỏ
                                </Button>
                            </Box>

                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div >
    )
}