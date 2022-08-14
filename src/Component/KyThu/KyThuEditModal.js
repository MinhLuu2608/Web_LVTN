import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';

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

let yearArray = [];

let curYear = new Date().getFullYear();
for (let i = curYear - 30; i <= curYear + 10; i++) {
    yearArray.push(i);
}


export default function KyThuEditModal({ idKyThu, thang, nam, reRenderKyThuMain }) {
    const [ , dispatch] = React.useContext(SnackBarContext)

    const [open, setOpen] = React.useState(false);
    const [Thang, setThang] = React.useState(thang);
    const [Nam, setNam] = React.useState(nam);
    const handleOpen = () => {
        setThang(thang);
        setNam(nam);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleThangChange = (event) => {
        setThang(event.target.value);
    };
    const handleNamChange = (event) => {
        setNam(event.target.value);
    };

    const handleSubmit = () => {
        fetch("http://localhost:5199/api/kythu", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IDKyThu: idKyThu,
                Thang: Thang,
                Nam: Nam
            })
        })
            .then(res => res.json())
            .then((result) => {
                reRenderKyThuMain();
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

    return (
        <div>
            <IconButton variant="text" sx={{ color: 'var(--color8)' }} onClick={handleOpen}>
                <Tooltip title="Chỉnh Sửa">
                    <EditIcon />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        Sửa thông tin kỳ thu
                    </Typography>
                    <FormControl style={{ width: 200, paddingRight: 50 }}>
                        <InputLabel>Tháng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={Thang}
                            label="Tháng"
                            onChange={handleThangChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: 200 }}>
                        <InputLabel>Năm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={Nam}
                            label="Năm"
                            onChange={handleNamChange}
                        >
                            {
                                yearArray.map(year => (
                                    <MenuItem key={year} value={year}> {year} </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <Stack direction="row" spacing={2} style={{ paddingTop: 40 }}>
                        <Button variant="contained" onClick={handleSubmit}>Chỉnh sửa</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
