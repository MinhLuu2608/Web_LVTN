import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};


export default function ServiceAddModal({ reRenderServiceMain }) {
    const [, dispatch] = React.useContext(SnackBarContext)

    const [open, setOpen] = React.useState(false);
    const [loaiDichVu, setLoaiDichVu] = React.useState('Trong nhà');
    const [tenDichVu, setTenDichVu] = React.useState('');
    const [donViTinh, setDonViTinh] = React.useState('');
    const [donGiaDV, setDonGiaDV] = React.useState(0);
    const [tenDichVuError, setTenDichVuError] = React.useState(false);
    const [donGiaError, setDonGiaError] = React.useState(false);
    const [donViTinhError, setDonViTinhError] = React.useState(false);

    const handleOpen = () => {
        setTenDichVuError(false)
        setDonGiaError(false)
        setDonViTinhError(false)
        setOpen(true)
    }
    const handleClose = () => setOpen(false)

    const handleLoaiDichVuChange = (event) => {
        setLoaiDichVu(event.target.value);
    };
    const handleInputTenDichVu = (event) => {
        setTenDichVu(event.target.value)
    }
    const handleInputDonGia = (event) => {
        setDonGiaDV(event.target.value)
    }
    const handleInputDonViTinh = (event) => {
        setDonViTinh(event.target.value)
    }

    const handleSubmit = () => {
        setTenDichVuError(false)
        setDonGiaError(false)
        setDonViTinhError(false)

        let validTenDichVu = false
        let validDonGia = false
        let validDonViTinh = false
        if (tenDichVu === '') {
            setTenDichVuError(true)
        } else validTenDichVu = true

        if (donGiaDV === '' || isNaN(+donGiaDV)) {
            setDonGiaError(true)
        } else validDonGia = true

        if (donViTinh === '') {
            setDonViTinhError(true)
        } else validDonViTinh = true

        if (validTenDichVu && validDonGia && validDonViTinh) {
            fetch("http://localhost:5199/api/dichvu/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    LoaiDichVu: loaiDichVu,
                    TenDichVu: tenDichVu,
                    DonViTinh: donViTinh,
                    DonGiaDV: donGiaDV,
                })
            })
                .then(res => res.json())
                .then((result) => {
                    reRenderServiceMain();
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage(result.message));
                    dispatch(setSeverity(result.severity));
                    handleClose();
                },
                    (error) => {
                        dispatch(setOpenSnackBar());
                        dispatch(setMessage("Failed"));
                        dispatch(setSeverity("error"));
                    });
        }

    }

    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end">
                <Button variant="contained" color="success" onClick={handleOpen}> Thêm dịch vụ</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" style={{ paddingBottom: 30 }}>
                        Thêm dịch vụ
                    </Typography>
                    <Stack direction="row" spacing={2} style={{ paddingBottom: 20 }} >
                        <TextField
                            required
                            style={{ width: 300 }}
                            label="Tên dịch vụ"
                            variant="outlined"
                            onChange={handleInputTenDichVu}
                            error={tenDichVuError}
                        />
                        <FormControl style={{ width: 200, paddingRight: 30 }}>
                            <InputLabel>Loại dịch vụ</InputLabel>
                            <Select
                                value={loaiDichVu}
                                label="Loại dịch vụ"
                                onChange={handleLoaiDichVuChange}
                            >
                                <MenuItem value={"Trong nhà"}>Trong nhà</MenuItem>
                                <MenuItem value={"Ngoài trời"}>Ngoài trời</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} >
                        <TextField
                            required
                            style={{ width: 300 }}
                            label="Đơn giá"
                            variant="outlined"
                            onChange={handleInputDonGia}
                            error={donGiaError}
                        />
                        <TextField
                            required
                            style={{ width: 200 }}
                            label="Đơn vị tính"
                            variant="outlined"
                            onChange={handleInputDonViTinh}
                            error={donViTinhError}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} style={{ paddingTop: 30 }}>
                        <Button variant="contained" onClick={handleSubmit}>Xác nhận</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
