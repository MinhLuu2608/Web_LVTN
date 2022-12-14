import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useReactToPrint } from 'react-to-print';
import Button from '@mui/material/Button';
import SnackBarContext from '../SnackBar/SnackBarContext'
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction'


export default function ReceivedOrderDetailModal({ orderInfo, reRenderMain }) {

    const style = {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 1,
        display: 'block',
        marginTop: 4,
        marginBottom: 5,
        textAlign: 'left',
        zIndex: 10,
    }

    const Info__style = {
        display: 'flex',
        width: 800,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10
    }

    const [, dispatch] = React.useContext(SnackBarContext)
    const [open, setOpen] = React.useState(false)
    const [order,] = React.useState(orderInfo)
    const [dichVuList, setDichVuList] = React.useState([])
    const [tableSX, setTableSX] = React.useState({})

    const handleOpen = () => {
        setTableSX({ width: 760, border: 'solid black 1px', marginTop: 1, overflowY: 'scroll', overflowX: 'hidden', maxHeight: 300 })
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        fetch("http://localhost:5199/api/donhang/chitiet/" + orderInfo.IDDonHang)
            .then(response => response.json())
            .then(function (dichVuList) {
                setDichVuList(dichVuList);
            });
    }, [orderInfo.IDDonHang])

    const componentRef = React.useRef();
    const handlePrintConfirm = async () => {
        await setTableSX({ width: 760, border: 'solid black 1px', marginTop: 1 })
        handleClose()
        handlePrint()
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true
    });

    const handleConfirm = () => {
        fetch("http://localhost:5199/api/donhang/confirm", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IDDonHang: orderInfo.IDDonHang
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

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <Tooltip sx={{ color: 'var(--color7)' }} title="Chi ti???t">
                    <VisibilityIcon />
                </Tooltip>
            </IconButton>
            <Modal
                style={{ marginTop: 15, marginBottom: 10, }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2} alignItems="flex-end" style={{ paddingTop: 25 }}>
                        <IconButton variant="contained" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Box ref={componentRef}>
                        {/* <Typography variant="h6" style={{ display: 'inline-block', textAlign: "left" }}>
                                <img src="/static/media/Logo.d35d7c77ea0ad085e30c.jpg" alt="Logo" style={{ width: 70, textAlign: "left", marginLeft: 70 }}></img>
                            </Typography> */}
                        <Typography variant="h5" style={{ paddingBottom: 10, textAlign: "center" }}>
                            <b>????n h??ng d???ch v??? </b>
                        </Typography>
                        <Box sx={Info__style}>
                            <Typography variant="h6" style={{ fontSize: 13, width: 850, paddingRight: 40 }}>
                                <b>C??ng Ty M??i Tr?????ng ENVI</b>
                            </Typography>
                            <Typography variant="h6" style={{ fontSize: 13, width: 850, paddingRight: 40 }}>
                                <b>M?? ????n h??ng: </b> {order.MaDonHang}
                            </Typography>
                            <Typography variant="h6" style={{ fontSize: 13, width: 850, paddingRight: 40 }}>
                                <b>H??? t??n kh??ch h??ng: </b>{order.TenKhachHang}
                            </Typography>
                            <Typography variant="h6" style={{ fontSize: 13, width: 850, paddingRight: 40 }}>
                                <b>S??T kh??ch h??ng: </b> {order.SoDienThoaiKH}
                            </Typography>
                            <Typography variant="h6" style={{ fontSize: 13, width: 850, paddingRight: 40 }}>
                                <b>?????a ch??? kh??ch h??ng: </b> {order.DiaChiKH}
                            </Typography>
                            <Typography variant="h6" style={{ fontSize: 13, width: 850, paddingRight: 40 }}>
                                <b>H??? t??n nh??n vi??n: </b> {order.HoTen}
                            </Typography>
                            <Typography variant="h6" style={{ fontSize: 13, width: 850, paddingRight: 40 }}>
                                <b>Ng??y thu: </b> {order.NgayThuConvert}
                            </Typography>
                            <TableContainer sx={tableSX}>
                                <Table sx={{ width: 760 }} aria-label="caption table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" sx={{ fontSize: 12, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px', width: '15%' }} >M?? d???ch v???</TableCell>
                                            <TableCell align="left" sx={{ fontSize: 12, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px', width: '25%' }}>T??n d???ch v???</TableCell>
                                            <TableCell align="left" sx={{ fontSize: 12, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px', width: '15%' }}>Lo???i d???ch v???</TableCell>
                                            <TableCell align="left" sx={{ fontSize: 12, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px', width: '10%' }}>????n v??? t??nh</TableCell>
                                            <TableCell align="left" sx={{ fontSize: 12, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px', width: '10%' }}>S??? l?????ng</TableCell>
                                            <TableCell align="left" sx={{ fontSize: 12, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px', width: '10%' }}>????n gi??</TableCell>
                                            <TableCell align="left" sx={{ fontSize: 12, fontWeight: 'bold', borderBottom: 'solid black 1px', width: '15%' }}>T???ng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            dichVuList.map((dichVu) => (
                                                <TableRow key={dichVu.MaDichVu}>
                                                    <TableCell align="left" sx={{ fontSize: 13, borderRight: 'solid black 1px' }}>{dichVu.MaDichVu}</TableCell>
                                                    <TableCell align="left" sx={{ fontSize: 13, borderRight: 'solid black 1px' }}>{dichVu.TenDichVu}</TableCell>
                                                    <TableCell align="left" sx={{ fontSize: 13, borderRight: 'solid black 1px' }}>{dichVu.LoaiDichVu}</TableCell>
                                                    <TableCell align="left" sx={{ fontSize: 13, borderRight: 'solid black 1px' }}>{dichVu.DonViTinh}</TableCell>
                                                    <TableCell align="left" sx={{ fontSize: 13, borderRight: 'solid black 1px' }}>{dichVu.SoLuong}</TableCell>
                                                    <TableCell align="left" sx={{ fontSize: 13, borderRight: 'solid black 1px' }}>{dichVu.DonGiaDV}??</TableCell>
                                                    <TableCell align="left">{dichVu.TongTienDV}??</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Typography variant="h6" style={{ fontSize: 16, width: 750, paddingTop: 30, paddingRight: 40, textAlign: "right" }}>
                                <b>T???ng ti???n: </b>{order.TongTienDH}??
                            </Typography>
                        </Box>
                    </Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-evenly" paddingTop={3} paddingBottom={2}>
                        {
                            orderInfo.TinhTrangXuLy === '???? ho??n th??nh'
                                ? <>
                                    <Button variant="contained" onClick={handlePrintConfirm}>In h??a ????n</Button>
                                    <Button variant="contained" onClick={handleClose}>Hu???</Button>
                                </>
                                : <></>
                        }
                        {
                            orderInfo.TinhTrangXuLy !== '???? ho??n th??nh' && orderInfo.TinhTrangXuLy !== '???? b??? hu???'
                                ? <>
                                    <Button variant="contained" onClick={handleConfirm}>X??c nh???n ho??n th??nh v?? thanh to??n</Button>
                                    <Button variant="contained" onClick={handleClose}>Hu??? b???</Button>
                                </>
                                : <></>
                        }
                    </Stack>
                </Box>
            </Modal>
        </div >
    )
}