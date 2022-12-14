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
export default function CustomerFormAdd({ customer, handleResetPage, importdistricts, importwards }) {

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

    const [errorCCCD, setErrorCCCD] = React.useState(false);

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/LoaiKhachHang`)
            .then(res => {
                const customerTypes = res.data;
                setCustomerTypes(customerTypes);
            })
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true)
        setErrorCCCD(false)
        setDistricts(importdistricts)
        setWards(importwards)
    }
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

    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    }


    const handleSubmit = () => {
        setErrorCCCD(false)

        const current = new Date()
        const date = getFormattedDate(current)

        let thongbao = "H??y th??m th??ng tin cho :"
        let validName = false
        let validCCCD = false
        let validNumberCCCD = false
        let validAddress = false
        let validChosenDistrict = false
        let validChosenWard = false
        let validChosenCustomerType = false

        if (Name === "") {
            thongbao = thongbao + "\nH??? v?? T??n"
        } else validName = true

        if (CCCD === "") {
            thongbao = thongbao + "\nC??n C?????c C??ng D??n"
        } else validCCCD = true

        if (Address === "") {
            thongbao = thongbao + "\n?????a Ch???"
        } else validAddress = true

        if (chosenDistrict === 0) {
            thongbao = thongbao + "\nQu???n Huy???n"
        } else validChosenDistrict = true

        if (chosenWard === 0) {
            thongbao = thongbao + "\nX?? Ph?????ng"
        } else validChosenWard = true

        if (chosenCustomerType === 0) {
            thongbao = thongbao + "\nLo???i Kh??ch H??ng"
        } else validChosenCustomerType = true

        if (CCCD.length !== 12 || isNaN(+CCCD)) {
            thongbao = thongbao + "\nCCCD ph???i ????ng 12 k?? t??? s???"
            setErrorCCCD(true)
        } else validNumberCCCD = true

        if (validName && validCCCD && validNumberCCCD && validAddress && validChosenDistrict && validChosenWard && validChosenCustomerType) {
            addPosts(Name, Address, CCCD, chosenWard, chosenCustomerType, date);
        } else {
            alert(thongbao);
        }
    };
    const addPosts = (Name, Address, CCCD, chosenWard, chosenCustomerType, date) => {
        client
            .post('', {
                "hoTenKH": Name,
                "DiaChi": Address,
                "cccd": CCCD,
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
        setChosenWard(0);
        handleResetPage();
        setChosenCustomerType(0);
        setChosenDistrict(0);
        handleClose();
    };
    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color7)' }}>Th??m Kh??ch H??ng</Button>
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
                        Th??m Kh??ch H??ng M???i
                    </Typography>
                    <Box sx={AddForm__style}>
                        <Box sx={Info__style}>
                            <TextField
                                required
                                label="H??? v?? T??n"
                                variant="outlined"
                                onChange={handleInputName}
                            >
                            </TextField>
                            <TextField
                                required
                                label="S??? CCCD"
                                variant="outlined"
                                style={{ marginTop: '20px' }}
                                onChange={handleInputCCCD}
                                error={errorCCCD}
                            >
                            </TextField>
                            <TextField
                                required
                                label="?????a Ch???"
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
                                    H??y Ch???n Qu???n Huy???n
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
                                    H??y Ch???n X?? Ph?????ng
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
                                    H??y Ch???n Lo???i Kh??ch H??ng
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
                    <Stack sx={{ padding: 2 }} direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={handleSubmit} sx={{ width: 200 }}>X??c nh???n</Button>
                        <Button variant="contained" onClick={handleClose} sx={{ width: 200 }}>Hu??? b???</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}