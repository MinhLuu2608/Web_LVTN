import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
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
export default function CustomerFormEdit({ customer, handleResetPage, importdistricts, importwards }) {

    const client = axios.create({
        baseURL: "http://localhost:5199/api/KhachHang"
    });

    const [, dispatch] = React.useContext(SnackBarContext)

    const [posts, setPosts] = React.useState([]);

    const [Name, setName] = React.useState('');

    const [CCCD, setCCCD] = React.useState('');

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

    const handleOpen = () => {
        setOpen(true);
        setName(customer.HoTenKH);
        setCCCD(customer.CCCD);
        setAddress(customer.DiaChi);
        setChosenDistrict(customer.IDQuanHuyen);
        setChosenWard(customer.IDXaPhuong);
        setChosenCustomerType(customer.IDLoaiKhachHang);
        setDistricts(importdistricts);
        setWards(importwards);
    }

    const [open, setOpen] = React.useState(false);


    const handleInputName = (event) => {
        setName(event.target.value)
    }
    const handleInputCCCD = (event) => {
        setCCCD(event.target.value)
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

    const handleSubmit = () => {

        let thongbao = "Hãy thêm thông tin đúng dạng cho :";
        let validName = false;
        let validCCCD = false;
        let validNumberCCCD = false;
        let validAddress = false;
        let validChosenDistrict = false;
        let validChosenWard = false;
        let validChosenCustomerType = false;

        if (Name === "" || Name.search(/[0-9]/) >= 0) {
            thongbao = thongbao + "\nHọ và Tên"
        } else validName = true


        if (CCCD === "") {
            thongbao = thongbao + "\nCăn Cước Công Dân"
        } else validCCCD = true

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

        if (validName && validCCCD && validNumberCCCD && validAddress && validChosenDistrict && validChosenWard && validChosenCustomerType) {
            addPosts(Name, Address, CCCD, chosenWard, chosenCustomerType);
        } else {
            alert(thongbao);
        }
    };
    const addPosts = (Name, Address, CCCD, chosenWard, chosenCustomerType) => {
        client
            .put('', {
                "hoTenKH": Name,
                "DiaChi": Address,
                "cccd": CCCD,
                "idXaPhuong": chosenWard,
                "idLoaiKhachHang": chosenCustomerType,
                "maKhachHang": customer.MaKhachHang,
                "idKhachHang": customer.IDKhachHang
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
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                } else {
                    // Anything else
                }
            });
        setName('');
        setAddress('');
        setCCCD('');
        setChosenWard(0);
        setChosenCustomerType(0);
        setChosenDistrict(0);
        handleResetPage();
        handleClose();
    };
    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end" onClick={handleOpen} marginBottom={1}>
                <IconButton variant="text" color="warning">
                    <Tooltip title="Chỉnh Sửa">
                        <EditIcon
                            sx={{ color: 'var(--color8)' }}
                        />
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
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 40 }}>
                        Chỉnh Sửa Thông Tin Khách Hàng
                    </Typography>
                    <Box sx={AddForm__style}>
                        <Box sx={Info__style}>
                            <TextField
                                required
                                label="Họ và Tên"
                                variant="outlined"
                                defaultValue={customer.HoTenKH}
                                onChange={handleInputName}
                            >
                            </TextField>
                            <TextField
                                required
                                type="tel"
                                label="Số CCCD"
                                defaultValue={customer.CCCD}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                variant="outlined"
                                style={{ marginTop: '20px' }}
                                onChange={handleInputCCCD}
                            >
                            </TextField>
                            <TextField
                                required
                                label="Địa Chỉ"
                                defaultValue={customer.DiaChi}
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
                                disabled
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
                    <Stack sx={{ padding: 3 }} direction="column" spacing={2} alignItems="flex-end">
                        <Button variant="contained" onClick={handleSubmit}>Xác Nhận</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}