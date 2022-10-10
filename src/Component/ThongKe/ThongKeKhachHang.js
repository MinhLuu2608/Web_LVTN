import React from "react"
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts'
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';

export default function ThongKeKhachHang() {

    const [, dispatch] = React.useContext(SnackBarContext)

    const [data, setData] = React.useState([])
    const [dataKey, setDataKey] = React.useState("")
    const [dataValueKey, setDataValueKey] = React.useState("")
    const [loai, setLoai] = React.useState(-1)
    const [quanHuyenList, setQuanHuyenList] = React.useState([])
    const [tuyenThuList, setTuyenThuList] = React.useState([])
    const [thuocQuan, setThuocQuan] = React.useState("")
    const [thuocTuyen, setThuocTuyen] = React.useState("")
    const [updateState, setUpdateState] = React.useState(true)

    const handleChangeLoai = (loai) => {
        setLoai(loai)
    }
    const handleChangeThuocQuan = (value) => {
        setThuocQuan(value)
    }
    const handleChangeThuocTuyen = (value) => {
        setThuocTuyen(value)
    }
    const handleConfirm = () => {
        setUpdateState(!updateState)
    }

    React.useEffect(() => {
        fetch("http://localhost:5199/api/quanhuyen/")
            .then(response => response.json())
            .then(function (quanHuyenList) {
                setQuanHuyenList(quanHuyenList)
            });
    }, [])
    React.useEffect(() => {
        if (thuocQuan !== "") {
            fetch(`http://localhost:5199/api/tuyenthu/1/-1/${thuocQuan}/-1`)
                .then(response => response.json())
                .then(function (tuyenThuList) {
                    setTuyenThuList(tuyenThuList)
                    setThuocTuyen("")
                });
        }
    }, [thuocQuan])

    React.useEffect(() => {
        var valid = true
        if (loai === 2 && thuocQuan === "") {
            valid = false
            dispatch(setOpenSnackBar())
            dispatch(setMessage("Hãy chọn quận huyện."))
            dispatch(setSeverity("warning"))
        }
        if (loai === 1) {
            if (thuocQuan === "" || thuocTuyen === "") {
                valid = false
                dispatch(setOpenSnackBar())
                dispatch(setMessage("Hãy chọn quận huyện và tuyến thu."))
                dispatch(setSeverity("warning"))
            }
        }
        if (valid) {
            if (loai === -1) {
                fetch(`http://localhost:5199/api/thongke/khachhangtheoquan`)
                    .then(response => response.json())
                    .then(function (rows) {
                        setData(rows)
                    })
                setDataKey("TenQuanHuyen")

            }
            if (loai === 2) {
                fetch(`http://localhost:5199/api/thongke/khachhangtheotuyen/${thuocQuan}`)
                    .then(response => response.json())
                    .then(function (rows) {
                        setData(rows)
                    })
                setDataKey("TenTuyenThu")
            }
            if (loai === 1) {
                fetch(`http://localhost:5199/api/thongke/khachhangtheoxp/${thuocTuyen}`)
                    .then(response => response.json())
                    .then(function (rows) {
                        setData(rows)
                    })
                setDataKey("TenXaPhuong")
            }
        }
    }, [updateState])

    return (
        <Stack direction="column" spacing={2} alignItems="center">
            <Typography
                variant="p"
                sx={{ fontSize: 30, color: "var(--color2)", fontWeight: "bold" }}
                align="center"
            >
                Thống kê khách hàng hiện tại
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
                <FormControl style={{ width: 160, paddingRight: 20 }}>
                    <InputLabel>Theo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={loai}
                        label="Theo"
                        onChange={event => handleChangeLoai(event.target.value)}
                    >
                        <MenuItem value={1}>Xã phường</MenuItem>
                        <MenuItem value={2}>Tuyến thu</MenuItem>
                        <MenuItem key="allMonths" value={-1}>Quận huyện</MenuItem>
                    </Select>
                </FormControl>
                {
                    loai !== -1 ?
                        <FormControl style={{ width: 250, paddingRight: 20 }}>
                            <InputLabel>Thuộc Quận</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={thuocQuan}
                                label="Thuộc Quận"
                                onChange={event => handleChangeThuocQuan(event.target.value)}
                            >
                                {
                                    quanHuyenList.map(quanHuyen => (
                                        <MenuItem key={quanHuyen.IDQuanHuyen} value={quanHuyen.IDQuanHuyen}> {quanHuyen.TenQuanHuyen} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        :
                        <>
                        </>
                }
                {
                    loai === 1 ?
                        <FormControl style={{ width: 300, paddingRight: 20 }}>
                            <InputLabel>Thuộc tuyến</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={thuocTuyen}
                                label="Thuộc tuyến"
                                onChange={event => handleChangeThuocTuyen(event.target.value)}
                            >
                                {
                                    tuyenThuList.map(tuyenThu => (
                                        <MenuItem key={tuyenThu.IDTuyenThu} value={tuyenThu.IDTuyenThu}> {tuyenThu.TenTuyenThu} </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        : <></>
                }
                <Button variant="contained" sx={{ width: 150, height: 50 }} onClick={handleConfirm}>Xác nhận</Button>
            </Stack>
            <BarChart
                width={1100}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey={dataKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Khách hàng" fill="#8884d8" />
            </BarChart>
        </Stack>
    );
}
