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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

export default function KyThuAddModal({ reRenderKyThuMain }) {
    const [, dispatch] = React.useContext(SnackBarContext)

    const [open, setOpen] = React.useState(false);
    const [statusAddPhieuThu, setStatus] = React.useState(true);
    const [Thang, setThang] = React.useState(new Date().getMonth() + 1);
    const [Nam, setNam] = React.useState(new Date().getFullYear());
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleSelection = () => {
        setStatus(!statusAddPhieuThu);
    }
    const handleThangChange = (event) => {
        setThang(event.target.value);
    };
    const handleNamChange = (event) => {
        setNam(event.target.value);
    };

    const handleSubmit = () => {
        fetch("http://localhost:5199/api/kythu/" + statusAddPhieuThu, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            <Stack direction="column" spacing={2} alignItems="flex-end">
                <Button variant="contained" color="success" onClick={handleOpen}> Thêm kỳ thu</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        Thêm kỳ thu
                    </Typography>
                    <FormControl style={{ width: 200, paddingRight: 50 }}>
                        <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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
                        <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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
                    <FormGroup style={{ paddingTop: 20 }}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked onClick={handleSelection} />}
                            label="Tạo phiếu thu tương ứng kỳ thu"
                        />
                    </FormGroup>

                    <Stack direction="row" spacing={2} style={{ paddingTop: 20 }}>
                        <Button variant="contained" onClick={handleSubmit}>Thêm</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
