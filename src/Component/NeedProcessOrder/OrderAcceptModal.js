import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SnackBarContext from '../SnackBar/SnackBarContext'
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction'
import DoneIcon from '@mui/icons-material/Done'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { GetCookie, cookie } from '../Cookie/CookieFunc'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

let yearArray = [];

let curYear = new Date().getFullYear();
for (let i = curYear; i <= curYear + 1; i++) {
    yearArray.push(i);
}

export default function OrderAcceptModal({ idDonHang, reRenderMain }) {

    GetCookie(document.cookie)
    const [, dispatch] = React.useContext(SnackBarContext)

    const [open, setOpen] = React.useState(false)
    const [dayList, setDayList] = React.useState([])
    const [ngay, setNgay] = React.useState(new Date().getDate())
    const [thang, setThang] = React.useState((new Date().getMonth()) + 1)
    const [nam, setNam] = React.useState(new Date().getFullYear())
    const [buoiHen, setBuoiHen] = React.useState("Sáng")

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    const handleChangeNgay = (value) => {
        setNgay(value)
    }
    const handleChangeThang = (value) => {
        setNgay(1)
        setThang(value)
    }
    const handleChangeNam = (value) => {
        setNgay(1)
        setThang(1)
        setNam(value)
    }
    const handleChangeBuoiHen = (value) => {
        setBuoiHen(value)
    }

    const handleSubmit = () => {
        let ngayHen = nam + "-" + thang + "-" + ngay
        fetch("http://localhost:5199/api/donhang/accept", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IDDonHang: idDonHang,
                IDNhanVien: cookie,
                NgayHen: ngayHen,
                BuoiHen: buoiHen
            })
        })
            .then(res => res.json())
            .then((result) => {
                reRenderMain();
                dispatch(setOpenSnackBar());
                dispatch(setMessage(result.message));
                dispatch(setSeverity(result.severity));
                handleClose();
            });

    }

    React.useEffect(() => {
        let d = new Date(nam, thang, 0)
        let lastDay = d.getDate();
        let dayArray = []
        for (let i = 1; i <= lastDay; i++) {
            dayArray.push(i)
        }
        setDayList(dayArray)
    }, [thang, nam])

    return (
        <div>
            <IconButton variant="text" sx={{ color: 'var(--color7)' }} onClick={handleOpen}>
                <Tooltip title="Tiếp nhận đơn hàng">
                    <DoneIcon />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h5" style={{ paddingBottom: 10 }}>
                            Ngày hẹn
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <FormControl style={{ width: 100, }}>
                                <InputLabel id="demo-simple-select-label">Ngày</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={ngay}
                                    label="Ngày"
                                    onChange={event => handleChangeNgay(event.target.value)}
                                >
                                    {
                                        dayList.map(year => (
                                            <MenuItem key={year} value={year}> {year} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl style={{ width: 100, }}>
                                <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={thang}
                                    label="Tháng"
                                    onChange={event => handleChangeThang(event.target.value)}
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
                            <FormControl style={{ width: 100 }}>
                                <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={nam}
                                    label="Năm"
                                    onChange={event => handleChangeNam(event.target.value)}
                                >
                                    {
                                        yearArray.map(year => (
                                            <MenuItem key={year} value={year}> {year} </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Stack>
                        <FormControl style={{ width: 330 }}>
                            <InputLabel>Buổi hẹn</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={buoiHen}
                                label="Buổi hẹn"
                                onChange={event => handleChangeBuoiHen(event.target.value)}
                            >
                                <MenuItem value={"Sáng"}>Sáng</MenuItem>
                                <MenuItem value={"Chiều"}>Chiều</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" spacing={2} style={{ paddingTop: 40 }}>
                        <Button variant="contained" onClick={handleSubmit}>Xác nhận</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
