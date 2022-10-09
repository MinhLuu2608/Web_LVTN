import React from "react"
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TextField } from '@mui/material'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import Button from '@mui/material/Button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';


export default function ThongKeDoanhThu() {

    const [data, setData] = React.useState([])
    const [loai, setLoai] = React.useState(-1)
    const [thoiDiem, setThoiDiem] = React.useState(-1)
    const [cuaNam, setCuaNam] = React.useState(new Date().getFullYear())
    const [tuNam, setTuNam] = React.useState(new Date().getFullYear())
    const [denNam, setDenNam] = React.useState(new Date().getFullYear())
    const [updateState, setUpdateState] = React.useState(true)


    const handleChangeLoai = (loai) => {
        setLoai(loai)
    }
    const handleChangeThoiDiem = (value) => {
        setThoiDiem(value)
    }
    const handleChangeCuaNam = (value) => {
        setCuaNam(value)
    }
    const handleChangeTuNam = (value) => {
        setTuNam(value)
    }
    const handleChangeDenNam = (value) => {
        setDenNam(value)
    }

    const handleConfirm = () => {
        setUpdateState(!updateState)
    }

    React.useEffect(() => {
        if (thoiDiem === 1) {
            fetch(`http://localhost:5199/api/thongke/doanhthutheonam/${loai}/${tuNam}/${denNam}`)
                .then(response => response.json())
                .then(function (rows) {
                    setData(rows);
                });
        }
        if (thoiDiem === -1) {
            fetch(`http://localhost:5199/api/thongke/doanhthutheothang/${loai}/${cuaNam}`)
                .then(response => response.json())
                .then(function (rows) {
                    setData(rows);
                });
        }
    }, [updateState])
    return (
        <Stack direction="column" spacing={2} alignItems="center">
            <Typography
                variant="p"
                sx={{ fontSize: 30, color: "var(--color2)", fontWeight: "bold" }}
                align="center"
            >
                Thống kê doanh thu
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
                <FormControl style={{ width: 200, paddingTop: 5 }}>
                    <InputLabel>Doanh thu của</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={loai}
                        label="Doanh thu của"
                        onChange={event => handleChangeLoai(event.target.value)}
                    >
                        <MenuItem value={1}>Hóa đơn tháng</MenuItem>
                        <MenuItem value={2}>Đơn hàng dịch vụ</MenuItem>
                        <MenuItem key="allMonths" value={-1}>Tất cả</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ width: 100, paddingTop: 5 }}>
                    <InputLabel>Theo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={thoiDiem}
                        label="Theo"
                        onChange={event => handleChangeThoiDiem(event.target.value)}
                    >
                        <MenuItem value={1}>Năm</MenuItem>
                        <MenuItem value={-1}>Tháng</MenuItem>
                    </Select>
                </FormControl>
                {
                    thoiDiem === -1 ?
                        <TextField
                            label="Của năm"
                            value={cuaNam}
                            style={{ width: 100, maxHeight: 50 }}
                            variant="outlined"
                            onChange={(event) => {
                                if (isNaN(+event.target.value) || event.target.value < 0) {
                                    event.target.value = 0
                                }
                                else {
                                    handleChangeCuaNam(event.target.value)
                                }
                            }}
                        />
                        :
                        <>
                            <TextField
                                label="Từ năm"
                                value={tuNam}
                                style={{ width: 90, maxHeight: 50 }}
                                variant="outlined"
                                onChange={(event) => {
                                    if (isNaN(+event.target.value) || event.target.value < 0) {
                                        event.target.value = 0
                                    }
                                    else {
                                        handleChangeTuNam(event.target.value)
                                    }
                                }}
                            />
                            <TrendingFlatIcon />
                            <TextField
                                label="Đến năm"
                                value={denNam}
                                style={{ width: 100, maxHeight: 50 }}
                                variant="outlined"
                                onChange={(event) => {
                                    if (isNaN(+event.target.value) || event.target.value < 0) {
                                        event.target.value = 0
                                    }
                                    else {
                                        handleChangeDenNam(event.target.value)
                                    }
                                }}
                            />
                        </>
                }
                <Button variant="contained" sx={{ width: 150, height: 50 }} onClick={handleConfirm}>Xác nhận</Button>
            </Stack>
            <BarChart
                width={1000}
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
                <XAxis dataKey={thoiDiem === -1 ? "ThangThu" : "NamThu"} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Doanh thu" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
        </Stack>
    );
}
