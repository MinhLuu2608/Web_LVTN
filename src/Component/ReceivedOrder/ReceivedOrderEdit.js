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
import EditIcon from '@mui/icons-material/Edit'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { GetCookie, cookie } from '../Cookie/CookieFunc'
import { TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

class dichVu {
    constructor(soLuong, donGia, tongTien) {
        this.soLuong = soLuong
        this.donGia = donGia
        this.tongTien = tongTien
    }
    tinhTongTien() {
        this.tongTien = this.soLuong * this.donGia
    }

    confirmEdit(idDonHang) {

    }
}

let yearArray = [];

let curYear = new Date().getFullYear();
for (let i = curYear; i <= curYear + 1; i++) {
    yearArray.push(i);
}

export default function ReceivedOrderEdit() {


    let params = useParams();

    const [dayList, setDayList] = React.useState([])
    const [ngay, setNgay] = React.useState(new Date().getDate())
    const [thang, setThang] = React.useState((new Date().getMonth()) + 1)
    const [nam, setNam] = React.useState(new Date().getFullYear())
    const [buoiHen, setBuoiHen] = React.useState("Sáng")

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

    React.useEffect(() => {
        let d = new Date(nam, thang, 0)
        let lastDay = d.getDate();
        let dayArray = []
        for (let i = 1; i <= lastDay; i++) {
            dayArray.push(i)
        }
        setDayList(dayArray)
    }, [thang, nam])

    return <>
        <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} >
            <Link to="/home/receivedorder/">
                <IconButton variant="text" >
                    <Tooltip title="Trở lại">
                        <ArrowBackIosNewIcon />
                    </Tooltip>
                </IconButton>
            </Link>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
                <Typography variant="p" sx={{ fontSize: 30, color: "var(--color2)", fontWeight: "bold", paddingBottom: 5 }}>
                    Chỉnh sửa thông tin đơn hàng
                </Typography>
                <Typography variant="p" sx={{ fontSize: 30, fontWeight: "bold", paddingBottom: 5 }}>
                    Mã đơn hàng: {params.id}
                </Typography>
            </Stack>

        </Stack>
        <Box sx={{ marginLeft: 5, marginRight: 5 }}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h6" style={{ paddingTop: 3 }} >
                    Thông tin khách hàng
                </Typography>
                <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2} >
                    <TextField
                        required
                        style={{ width: 400, margin: 3 }}
                        label="Tên khách hàng"
                        variant="outlined"
                    // onChange={handleInputTenDichVu}
                    // error={tenDichVuError}
                    />
                    <TextField
                        required
                        style={{ width: 200, margin: 3 }}
                        label="Số điện thoại"
                        variant="outlined"
                    // onChange={handleInputTenDichVu}
                    // error={tenDichVuError}
                    />
                </Stack>
                <TextField
                    required
                    style={{ width: 610, margin: 3 }}
                    label="Địa chỉ khách hàng"
                    variant="outlined"
                // onChange={handleInputTenDichVu}
                // error={tenDichVuError}
                />
                <Typography variant="h6" style={{ paddingTop: 3 }}>
                    Ngày hẹn:
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
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
                    <FormControl style={{ width: 150 }}>
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
                <Typography variant="h6" style={{ paddingTop: 3 }} >
                    Chi tiết dịch vụ
                </Typography>
                <TableContainer style={{ marginTop: 20 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center">Mã dịch vụ</StyledTableCell>
                                <StyledTableCell align="center">Tên dịch vụ</StyledTableCell>
                                <StyledTableCell align="center">Loại dịch vụ</StyledTableCell>
                                <StyledTableCell align="center">Đơn vị tính</StyledTableCell>
                                <StyledTableCell align="center">Số lượng</StyledTableCell>
                                <StyledTableCell align="center">Đơn giá</StyledTableCell>
                                <StyledTableCell align="center">Tổng</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow
                                key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    Mã dịch vụ
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    Tên dịch vụ
                                </StyledTableCell>
                                <StyledTableCell>
                                    Loại dịch vụ
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Đơn vị tính
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Số lượng
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Đơn giá
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    Tổng
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        {/* <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <StyledTableRow
                                    key={row.IDDonHang}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.MaDonHang}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.TenKhachHang}</StyledTableCell>
                                    <StyledTableCell align="center">{row.NgayTaoConvert}</StyledTableCell>
                                    <StyledTableCell align="center">{row.DiaChiKH}</StyledTableCell>
                                    <StyledTableCell align="center">{row.NgayHenConvert}</StyledTableCell>
                                    {
                                        showTinhTrangXuLy(row.TinhTrangXuLy, row.Note)
                                    }
                                    <StyledTableCell align="center">
                                        <ButtonGroup>
                                            <ReceivedOrderDetailModal orderInfo={row} reRenderMain={reRender} />
                                            <Link to={"/home/receivedorder/edit/" + row.IDDonHang}>
                                                <IconButton variant="text" sx={{ color: 'var(--color8)' }}>
                                                    <Tooltip title="Sửa thông tin">
                                                        <EditIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            </Link>
                                            
                                            {
                                                row.TinhTrangXuLy !== 'Đã bị huỷ'
                                                    ? <ReceivedOrderDeleteModal
                                                        idDonHang={row.IDDonHang}
                                                        idNhanVien={idNhanVien}
                                                        reRenderMain={reRender}
                                                    />
                                                    : <IconButton onClick={() => handleRecovery(row.IDDonHang)}>
                                                        <Tooltip sx={{ color: 'var(--color2)' }} title="Phục hồi">
                                                            <RestartAltIcon />
                                                        </Tooltip>
                                                    </IconButton>
                                            }
                                        </ButtonGroup>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                    colSpan={4}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter> */}
                    </Table>
                </TableContainer>
            </Stack>
        </Box>
    </>
}





// export default function ReceivedOrderEdit({ idDonHang, reRenderMain }) {

//     GetCookie(document.cookie)
//     const [, dispatch] = React.useContext(SnackBarContext)

//     const [open, setOpen] = React.useState(false)
//     const [dayList, setDayList] = React.useState([])
    // const [ngay, setNgay] = React.useState(new Date().getDate())
    // const [thang, setThang] = React.useState((new Date().getMonth()) + 1)
    // const [nam, setNam] = React.useState(new Date().getFullYear())
    // const [buoiHen, setBuoiHen] = React.useState("Sáng")

//     const handleOpen = () => {
//         setOpen(true)
//     }

//     const handleClose = () => setOpen(false);

    // const handleChangeNgay = (value) => {
    //     setNgay(value)
    // }
    // const handleChangeThang = (value) => {
    //     setNgay(1)
    //     setThang(value)
    // }
    // const handleChangeNam = (value) => {
    //     setNgay(1)
    //     setThang(1)
    //     setNam(value)
    // }
    // const handleChangeBuoiHen = (value) => {
    //     setBuoiHen(value)
    // }

//     const handleSubmit = () => {
//         let ngayHen = nam + "-" + thang + "-" + ngay
//         fetch("http://localhost:5199/api/donhang/accept", {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 IDDonHang: idDonHang,
//                 IDNhanVien: cookie,
//                 NgayHen: ngayHen,
//                 BuoiHen: buoiHen
//             })
//         })
//             .then(res => res.json())
//             .then((result) => {
//                 reRenderMain();
//                 dispatch(setOpenSnackBar());
//                 dispatch(setMessage(result.message));
//                 dispatch(setSeverity(result.severity));
//                 handleClose();
//             });

//     }

    // React.useEffect(() => {
    //     let d = new Date(nam, thang, 0)
    //     let lastDay = d.getDate();
    //     let dayArray = []
    //     for (let i = 1; i <= lastDay; i++) {
    //         dayArray.push(i)
    //     }
    //     setDayList(dayArray)
    // }, [thang, nam])

//     return (
//         <div>
//             <IconButton variant="text" sx={{ color: 'var(--color8)' }} onClick={handleOpen}>
//                 <Tooltip title="Sửa thông tin">
//                     <EditIcon />
//                 </Tooltip>
//             </IconButton>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <Stack direction="column" spacing={2}>
//                         <Typography variant="h5" style={{ paddingBottom: 3 }}>
//                             Chỉnh sửa thông tin đơn hàng dịch vụ
//                         </Typography>
//                         <hr />
//                         <Typography variant="h5" style={{ paddingBottom: 2 }}>
//                             Thông tin khách hàng:
//                         </Typography>
//                         <Stack direction="row" spacing={2} alignItems="center">
//                             <TextField
//                                 required
//                                 style={{ width: 300 }}
//                                 label="Họ tên khách hàng"
//                                 variant="outlined"
//                             // onChange={handleInputTenDichVu}
//                             // error={tenDichVuError}
//                             />
//                             <TextField
//                                 required
//                                 style={{ width: 300 }}
//                                 label="Số điện thoại khách hàng"
//                                 variant="outlined"
//                             // onChange={handleInputTenDichVu}
//                             // error={tenDichVuError}
//                             />
//                         </Stack>
//                         <TextField
//                             required
//                             style={{ width: 620 }}
//                             label="Địa chỉ"
//                             variant="outlined"
//                         // onChange={handleInputTenDichVu}
//                         // error={tenDichVuError}
//                         />
//                         <hr />
                        // <Typography variant="h6" style={{ paddingTop: 3 }}>
                        //     Ngày hẹn:
                        // </Typography>
                        // <Stack direction="row" spacing={2} alignItems="center">

                        //     <FormControl style={{ width: 100, }}>
                        //         <InputLabel id="demo-simple-select-label">Ngày</InputLabel>
                        //         <Select
                        //             labelId="demo-simple-select-label"
                        //             value={ngay}
                        //             label="Ngày"
                        //             onChange={event => handleChangeNgay(event.target.value)}
                        //         >
                        //             {
                        //                 dayList.map(year => (
                        //                     <MenuItem key={year} value={year}> {year} </MenuItem>
                        //                 ))
                        //             }
                        //         </Select>
                        //     </FormControl>
                        //     <FormControl style={{ width: 100, }}>
                        //         <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
                        //         <Select
                        //             labelId="demo-simple-select-label"
                        //             value={thang}
                        //             label="Tháng"
                        //             onChange={event => handleChangeThang(event.target.value)}
                        //         >
                        //             <MenuItem value={1}>1</MenuItem>
                        //             <MenuItem value={2}>2</MenuItem>
                        //             <MenuItem value={3}>3</MenuItem>
                        //             <MenuItem value={4}>4</MenuItem>
                        //             <MenuItem value={5}>5</MenuItem>
                        //             <MenuItem value={6}>6</MenuItem>
                        //             <MenuItem value={7}>7</MenuItem>
                        //             <MenuItem value={8}>8</MenuItem>
                        //             <MenuItem value={9}>9</MenuItem>
                        //             <MenuItem value={10}>10</MenuItem>
                        //             <MenuItem value={11}>11</MenuItem>
                        //             <MenuItem value={12}>12</MenuItem>
                        //         </Select>
                        //     </FormControl>
                        //     <FormControl style={{ width: 100 }}>
                        //         <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                        //         <Select
                        //             labelId="demo-simple-select-label"
                        //             value={nam}
                        //             label="Năm"
                        //             onChange={event => handleChangeNam(event.target.value)}
                        //         >
                        //             {
                        //                 yearArray.map(year => (
                        //                     <MenuItem key={year} value={year}> {year} </MenuItem>
                        //                 ))
                        //             }
                        //         </Select>
                        //     </FormControl>
                        //     <FormControl style={{ width: 150 }}>
                        //         <InputLabel>Buổi hẹn</InputLabel>
                        //         <Select
                        //             labelId="demo-simple-select-label"
                        //             value={buoiHen}
                        //             label="Buổi hẹn"
                        //             onChange={event => handleChangeBuoiHen(event.target.value)}
                        //         >
                        //             <MenuItem value={"Sáng"}>Sáng</MenuItem>
                        //             <MenuItem value={"Chiều"}>Chiều</MenuItem>
                        //         </Select>
                        //     </FormControl>
//                         </Stack>
//                     </Stack>
//                     <Stack direction="row" spacing={2} style={{ paddingTop: 40 }}>
//                         <Button variant="contained" onClick={handleSubmit}>Xác nhận</Button>
//                         <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
//                     </Stack>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }
