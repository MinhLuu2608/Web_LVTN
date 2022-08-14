import IconButton from '@mui/material/IconButton';
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

export default function ReceiptDetailOnline({ receipt, handleClose }) {

    const style = {

        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 850,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 1,
        height: 520,
        display: 'block',
        marginTop: 4,
        marginBottom: 5,
        textAlign: 'left',
    };

    const Info__style = {
        display: 'flex',
        width: 800,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10
    };


    function change(date) {
        if (!date) {
            return 'Chưa thu';
        } else {
            return 'Đã thu';
        }
    }



    return (
        <Box sx={style}>
            <Stack direction="column" spacing={2} alignItems="flex-end">
                <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
            </Stack>
            <Box>
                <Typography variant="h6" style={{ display: 'inline-block', textAlign: "left" }}>
                    <img src="/static/media/Logo.d35d7c77ea0ad085e30c.jpg" alt="Logo" style={{ width: 70, textAlign: "left", marginLeft: 70 }}></img>
                </Typography>
                <Typography variant="h5" style={{ paddingBottom: 30, textAlign: "center" }}>
                    <b>Hoá đơn phí môi trường tháng {receipt.Thang} </b>
                </Typography>
                <Box sx={Info__style}>
                    <Typography variant="h6" style={{ fontSize: 14, width: 800, paddingBottom: 0, paddingRight: 40 }}>
                        <b>Công Ty Môi Trường SHIZEN</b>
                    </Typography>
                    <Typography variant="h6" style={{ fontSize: 14, width: 800, paddingBottom: 0, paddingRight: 40 }}>
                        <b>Mã KH: </b> {receipt.MaKhachHang}
                    </Typography>
                    <Typography variant="h6" style={{ fontSize: 14, width: 800, paddingBottom: 0, paddingRight: 40 }}>
                        <b>Tên KH: </b>{receipt.HoTenKH}
                    </Typography>
                    <Typography variant="h6" style={{ fontSize: 14, width: 800, paddingBottom: 0, paddingRight: 40 }}>
                        <b>Địa chỉ KH: </b>{receipt.DiaChi}, Phường {receipt.TenXaPhuong}, {receipt.TenQuanHuyen}
                    </Typography>
                    <Typography variant="h6" style={{ fontSize: 14, width: 800, paddingBottom: 0, paddingRight: 40 }}>
                        <b>Username: </b> {receipt.Username}
                    </Typography>
                    <Typography variant="h6" style={{ fontSize: 14, width: 800, paddingBottom: 0, paddingRight: 40 }}>
                        <b>SĐT: </b> {receipt.SDT}
                    </Typography>
                    <TableContainer sx={{ width: 700, border: 'solid black 1px', marginTop: 1 }}>
                        <Table sx={{ width: 698 }} aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontSize: 14, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px' }} >Mã hóa đơn</TableCell>
                                    <TableCell align="left" sx={{ fontSize: 14, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px' }}>Kỳ Thu</TableCell>
                                    <TableCell align="left" sx={{ fontSize: 14, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px' }}>Loại hộ</TableCell>
                                    <TableCell align="left" sx={{ fontSize: 14, fontWeight: 'bold', borderRight: 'solid black 1px', borderBottom: 'solid black 1px' }}>Tuyến thu</TableCell>
                                    <TableCell align="left" sx={{ fontSize: 14, fontWeight: 'bold', borderBottom: 'solid black 1px' }}>Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontSize: 14, borderRight: 'solid black 1px' }}>{receipt.MaSoPhieu}</TableCell>
                                    <TableCell align="left" sx={{ fontSize: 14, borderRight: 'solid black 1px' }}>{receipt.TenKyThu}</TableCell>
                                    <TableCell align="left" sx={{ fontSize: 14, borderRight: 'solid black 1px' }}>{receipt.TenLoai}</TableCell>
                                    <TableCell align="left" sx={{ fontSize: 14, borderRight: 'solid black 1px' }}>Thanh toán online</TableCell>
                                    <TableCell align="left">{change(receipt.NgayThu)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h6" style={{ fontSize: 16, width: 700, paddingTop: 30, paddingBottom: 0, paddingRight: 40, textAlign: "right" }}>
                        <b>Tổng tiền: </b>{receipt.Gia}đ
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}