import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import FilterAutocomplete from './FilterAutocomplete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

let yearArray = [];

let curYear = new Date().getFullYear();
for (let i = curYear - 30; i <= curYear + 10; i++) {
    yearArray.push(i);
}

export default function HoaDonAddModal() {
    const [open, setOpen] = React.useState(false);
    const [khachHangList, setKhachHangList] = React.useState([]);
    const [kyThuList, setKyThuList] = React.useState([]);
    const [idKhachHang, setIDKhachHang] = React.useState('');
    const [diaChiKH, setDiaChiKH] = React.useState('---None---');
    const [idTuyenThu, setIDTuyenThu] = React.useState('');
    const [idKyThu, setIDKyThu] = React.useState('');
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleKhachHangChange = (event) => {
        setIDKhachHang(event.target.value);
    };
    const handleKyThuChange = (event) => {
        setIDKyThu(event.target.value);
    };
    const handleChangeInformation = (information) => {
        setDiaChiKH(information.Diachi)
        setIDTuyenThu(information.IDTuyenThu)
    };

    //submit  
    const handleSubmit = () => {
        fetch("http://localhost:5199/api/phieuthu/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "idKhachHang": idKhachHang,
                "idTuyenThu": idTuyenThu,
                "idKyThu": idKyThu,
                "idNhanVien": 0,
                "mauSoPhieu": "string",
                "ngayTao": "string",
                "ngayThu": "string"
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                handleClose();
            },
                (error) => {
                    alert('Failed');
                });

    }

    React.useEffect(() => {
        fetch("http://localhost:5199/api/phieuthu/khachhang")
            .then(response => response.json())
            .then(function (customers) {
                setKhachHangList(customers)
            });
        fetch("http://localhost:5199/api/phieuthu/kythu")
            .then(response => response.json())
            .then(function (kyThu) {
                setKyThuList(kyThu)
            });
    }, [])


    React.useEffect(() => {
        if (idKhachHang !== '') {
            fetch("http://localhost:5199/api/phieuthu/khachhang/" + idKhachHang)
                .then(response => response.json())
                .then(function (informations) {
                    informations.map((information) => (
                        handleChangeInformation(information)
                    ))
                });
        }
    }, [idKhachHang])

    return (
        <div>
            <Stack direction="column" spacing={10} alignItems="flex-end" >
                <Button variant="contained" sx={{ backgroundColor: 'var(--color7)' }} onClick={handleOpen}> Thêm Hoá đơn</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        Thêm Hoá đơn
                    </Typography>
                    <TextField
                        fullWidth
                        select
                        label="Chọn Khách Hàng"
                        value={idKhachHang}
                        onChange={handleKhachHangChange}
                        style={{ paddingBottom: 20 }}
                    >
                        {
                            khachHangList.map(customer => (
                                <MenuItem key={customer.IDKhachHang} value={customer.IDKhachHang}>{customer.HoTenKH}</MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField
                        fullWidth
                        style={{ paddingBottom: 20 }}
                        label="Địa chỉ khách hàng"
                        disabled
                        value={diaChiKH}
                    />
                    <TextField
                        fullWidth
                        select
                        label="Chọn kỳ thu"
                        value={idKyThu}
                        onChange={handleKyThuChange}
                        style={{ paddingBottom: 20 }}
                    >
                        {
                            kyThuList.map(kythu => (
                                <MenuItem key={kythu.IDKyThu} value={kythu.IDKyThu}>{kythu.TenKyThu}</MenuItem>
                            ))
                        }
                    </TextField>
                    <Stack direction="row" spacing={2} style={{ paddingTop: 20 }}>
                        <Button variant="contained" onClick={handleSubmit}>Thêm</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    )
}
