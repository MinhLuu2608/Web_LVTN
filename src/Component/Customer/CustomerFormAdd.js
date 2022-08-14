import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { FlareSharp } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Info__style = {
    display: 'flex',
    width: 400,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 2,
    color: 'black'
};

const AddForm__style = {
    display: 'flex',
};
export default function CustomerFormAdd({ customer, handleResetPage, importdistricts, importwards}) {

    const client = axios.create({
        baseURL: "http://localhost:5199/api/KhachHang"
    });

    const [, dispatch] = React.useContext(SnackBarContext)

    const [posts, setPosts] = React.useState([]);

    const [Name, setName] = React.useState('');

    const [CCCD, setCCCD] = React.useState('');

    const [DayGrant, setDayGrant] = React.useState('2020-01-01');

    const [Address, setAddress] = React.useState('');

    const [chosenDistrict, setChosenDistrict] = React.useState(0);

    const [chosenWard, setChosenWard] = React.useState(0);

    const [chosenCustomerType, setChosenCustomerType] = React.useState(0);

    const [wards, setWards] = React.useState([]);

    const [districts, setDistricts] = React.useState([]);

    const [customerTypes, setCustomerTypes] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/LoaiKhachHang`)
            .then(res => {
                const customerTypes = res.data;
                setCustomerTypes(customerTypes);
            })
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        setDistricts(importdistricts);
        setWards(importwards);
    }
    const handleInputName = (event) => {
        setName(event.target.value)
    }
    const handleInputCCCD = (event) => {
        setCCCD(event.target.value)
    }
    const handleInputDayGrant = (event) => {
        setDayGrant(event.target.value)
    }
    const handleInputAddress = (event) => {
        setAddress(event.target.value)
    }
    const handleClose = () => setOpen(false);

    const handleChangeDistrict = (event) => {
        setChosenDistrict(event.target.value);
        setChosenWard(0);
    };

    const handleChangeWard = (event) => {
        setChosenWard(event.target.value);
    };

    const handleCustomerType = (event) => {
        setChosenCustomerType(event.target.value);
    };

    function handleShowWard(ward) {
        if (ward.IDQuanHuyen === chosenDistrict) {
            return (
                <MenuItem value={ward.IDXaPhuong} key={ward.IDXaPhuong}>
                    {ward.TenXaPhuong}
                </MenuItem>
            )
        }
    }

    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [openAlert, setOpenAlert] = React.useState(false);

    const handleClickAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };
    const handleSubmit = () => {
        const current = new Date();
        const date = getFormattedDate(current);

        let thongbao = "Hãy thêm thông tin cho :";
        let validName = false;
        let validCCCD = false;
        let validNumberCCCD = false;
        let validDayGrant = false;
        let validNumberDayGrant = false;
        let validAddress = false;
        let validChosenDistrict = false;
        let validChosenWard = false;
        let validChosenCustomerType = false;

        if (Name === "") {
            thongbao = thongbao + "\nHọ và Tên"
        } else validName = true

        if (CCCD === "") {
            thongbao = thongbao + "\nCăn Cước Công Dân"
        } else validCCCD = true

        if (DayGrant === "") {
            thongbao = thongbao + "\nNgày Cấp"
        } else validDayGrant = true

        if (Address === "") {
            thongbao = thongbao + "\nĐịa Chỉ"
        } else validAddress = true

        if (chosenDistrict === 0) {
            thongbao = thongbao + "\nQuận Huyện"
        } else validChosenDistrict = true

        if (chosenWard === 0) {
            thongbao = thongbao + "\nXã Phường"
        } else validChosenWard = true

        if (chosenCustomerType === 0) {
            thongbao = thongbao + "\nLoại Khách Hàng"
        } else validChosenCustomerType = true

        if (CCCD.length !== 12) {
            thongbao = thongbao + "\nCCCD phải đúng 12 ký tự"
        } else validNumberCCCD = true

        if (DayGrant > date) {
            thongbao = thongbao + "\nNgày Cấp Phải Trước Ngày Hiện tại"
        } else validNumberDayGrant = true

        console.log("DayGrant" + DayGrant)
        console.log("date" + date)
        if (validName && validCCCD && validNumberCCCD && validDayGrant && validAddress && validChosenDistrict && validChosenWard && validChosenCustomerType && validNumberDayGrant) {
            addPosts(Name, Address, CCCD, DayGrant, chosenWard, chosenCustomerType, date);
        } else {
            alert(thongbao);
        }
        // if (Name === "") {
        //     alert('Hãy Điền Họ và Tên')
        // } else {
        //     if (CCCD === "") {
        //         alert('Hãy Điền Căn Cước Công Dân')
        //     } else {
        //         if (CCCD.length != 12) {
        //             alert('Hãy Điền Căn Cước Công Dân Đủ 12 ký tự')
        //         } else {
        //             if (DayGrant === "") {
        //                 alert('Hãy Điền Ngày Cấp CCCD')
        //             } else {
        //                 if (Address === "") {
        //                     alert('Hãy Điền Địa Chỉ')
        //                 } else {
        //                     if (chosenDistrict === 0) {
        //                         alert('Hãy Điền Quận Huyện')
        //                     } else {
        //                         if (chosenWard === 0) {
        //                             alert('Hãy Điền Xã Phường')
        //                         } else {
        //                             if (chosenCustomerType === 0) {
        //                                 alert('Hãy Điền Loại Khách Hàng')
        //                             } else {
        //                                 const current = new Date();
        //                                 const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
        //                                 addPosts(Name, Address, CCCD, DayGrant, chosenWard, chosenCustomerType, date);
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    };
    const addPosts = (Name, Address, CCCD, DayGrant, chosenWard, chosenCustomerType, date) => {
        client
            .post('', {
                "hoTenKH": Name,
                "DiaChi": Address,
                "cccd": CCCD,
                "ngayCap": DayGrant,
                "idXaPhuong": chosenWard,
                "idLoaiKhachHang": chosenCustomerType,
                "ngayTao": date,
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
            })
            .catch((err) => {
                if (err.response) {
                    // The client was given an error response (5xx, 4xx)
                    console.log('err.response.data' + err.response.data);
                    console.log('err.response.status' + err.response.status);
                    console.log('err.response.headers' + err.response.headers);
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                } else {
                    // Anything else
                }
            });
        setName('');
        setAddress('');
        setCCCD('');
        setDayGrant('');
        setChosenWard(0);
        handleResetPage();
        setChosenCustomerType(0);
        setChosenDistrict(0);
        handleClose();
    };
    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color7)' }}>Thêm Khách Hàng</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 40 }}>
                        Thêm Khách Hàng Mới
                    </Typography>
                    <Box sx={AddForm__style}>
                        <Box sx={Info__style}>
                            <TextField
                                required
                                label="Họ và Tên"
                                variant="outlined"
                                onChange={handleInputName}
                            >
                            </TextField>
                            <TextField
                                required
                                type="number"
                                label="Số CCCD"
                                variant="outlined"
                                style={{ marginTop: '20px' }}
                                onChange={handleInputCCCD}
                            >
                            </TextField>
                            <TextField
                                required
                                type="date"
                                label="Ngày Cấp CCCD" variant="outlined"
                                defaultValue="2020-01-01"
                                style={{ marginTop: '20px' }}
                                onChange={handleInputDayGrant}
                            >
                            </TextField>
                            <TextField
                                required
                                label="Địa Chỉ"
                                variant="outlined"
                                style={{ marginTop: '20px' }}
                                onChange={handleInputAddress}
                            >
                            </TextField>
                        </Box>
                        <Box sx={Info__style}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-district"
                                value={chosenDistrict}
                                onChange={handleChangeDistrict}
                            >
                                <MenuItem value={0} key={0}>
                                    Hãy Chọn Quận Huyện
                                </MenuItem>
                                {districts
                                    .map((district) => (
                                        <MenuItem value={district.IDQuanHuyen} key={district.IDQuanHuyen}>
                                            {district.TenQuanHuyen}
                                        </MenuItem>
                                    ))}
                            </Select>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                value={chosenWard}
                                onChange={handleChangeWard}
                                style={{ marginTop: '20px' }}
                            >
                                <MenuItem value={0} key={0}>
                                    Hãy Chọn Xã Phường
                                </MenuItem>
                                {wards
                                    .map((ward) => (
                                        handleShowWard(ward)
                                    ))}
                            </Select>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-ward"
                                value={chosenCustomerType}
                                onChange={handleCustomerType}
                                style={{ marginTop: '20px' }}
                            >
                                <MenuItem value={0} key={0}>
                                    Hãy Chọn Loại Khách Hàng
                                </MenuItem>
                                {customerTypes
                                    .map((customerType) => (
                                        <MenuItem value={customerType.IDLoaiKhachHang} key={customerType.IDLoaiKhachHang}>
                                            {customerType.TenLoai}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Box>
                    </Box>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <Button variant="contained" onClick={handleSubmit}>Thêm Khách Hàng</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}