import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useReactToPrint } from 'react-to-print';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
export default function ExportReceiptReport( {receipt} ) {
    const [open, setOpen] = React.useState(false);
        const [ngaythu,setNgayThu] = React.useState('');
    const [ngaytao, setNgayTao] = React.useState('');
    //change tt
     function change(date) {
    if (!date) {
      return 'Chưa thu';
    } else {
      return 'Đã thu';
    }

    }
    const getFormattedDate = (date) => {
            var year = date.getFullYear();
        
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
        
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return day + '-' + month + '-' + year;
    }
    const handleOpen = () => {
        setOpen(true);
                setNgayTao(getFormattedDate(new Date(receipt.NgayTao)));
        if (receipt.NgayThu != null) {
            setNgayThu(getFormattedDate(new Date(receipt.NgayThu)));
        } else {
            return "open fail";
        }
    }
    const handleClose = () => setOpen(false);
    //
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true
    });
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
    // overflow:'scroll',
    height:'95%',
    display:'block',
    marginTop: 4,
    marginBottom: 5,
    textAlign: 'left' 
            
    };

        const Info__style = {
        display: 'flex',
        width: 800,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10
    };
    return (
    <div>
      <Button onClick={handleOpen}><PrintIcon></PrintIcon></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2} alignItems="flex-end">
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Box ref={componentRef}>
                        <Typography variant="h6" style={{display: 'inline-block', textAlign: "left"}}>
                                <img src="/static/media/Logo.d35d7c77ea0ad085e30c.jpg" alt="Logo" style={{width: 70,textAlign: "left", marginLeft: 70 }}></img>
                        </Typography>
                        <Typography variant="h6" style={{display: 'inline-block',fontSize:14,textAlign:"right",width:630 }}> 
                            <b>Mẫu số phiếu: </b> {receipt.MauSoPhieu}
                        </Typography>
                        <Typography variant="h5" style={{paddingBottom: 30,textAlign:"center" }}>
                            <b>Phiếu thu phí môi trường</b>
                        </Typography>
                        <Box sx={Info__style}>
                            <Typography variant="h6" style={{fontSize:14, width: 800, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Công Ty Môi Trường SHIZEN</b>
                            </Typography>
                            <Typography variant="h6" style={{fontSize:14, width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Mã tuyến Thu:</b> {receipt.MaTuyenThu}
                            </Typography>
                            <Typography variant="h6" style={{fontSize:14, width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Mã Nhân Viên: </b>{receipt.MaNhanVien}
                            </Typography>
                            <Typography variant="h6" style={{fontSize:14, width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Mã KH: </b> {receipt.MaKhachHang}
                            </Typography>
                            <Typography variant="h6" style={{fontSize:14, width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Nhân viên thu: </b> {receipt.HoTen}
                            </Typography>
                            <Typography variant="h6" style={{fontSize:14, width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Tên KH: </b>{receipt.HoTenKH}
                            </Typography>
                            <Typography variant="h6" style={{fontSize:14, width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>SĐT Nhân Viên:</b> {receipt.SoDienThoai}
                            </Typography>
                            <Typography variant="h6" style={{fontSize:14, width: 400, paddingBottom: 0, paddingRight: 40 }}>
                                <b>Địa chỉ KH: </b>{receipt.DiaChi}, Phường {receipt.TenXaPhuong}, {receipt.TenQuanHuyen}
                            </Typography>
                             <TableContainer sx={{width: 700, border:'solid black 1px',marginTop:2}}>
                            <Table sx={{ width: 698}} aria-label="caption table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={{fontSize:14, fontWeight: 'bold',borderRight:'solid black 1px',borderBottom:'solid black 1px'}} >Mã hóa đơn</TableCell>
                                    <TableCell align="left" sx={{fontSize:14, fontWeight: 'bold',borderRight:'solid black 1px',borderBottom:'solid black 1px'}}>Kỳ Thu</TableCell>
                                    <TableCell align="left" sx={{fontSize:14, fontWeight: 'bold',borderRight:'solid black 1px',borderBottom:'solid black 1px'}}>Loại hộ</TableCell>
                                    <TableCell align="left" sx={{fontSize:14, fontWeight: 'bold',borderRight:'solid black 1px',borderBottom:'solid black 1px'}}>Tuyến thu</TableCell>
                                    <TableCell align="left" sx={{fontSize:14, fontWeight: 'bold',borderBottom:'solid black 1px'}}>Trạng thái</TableCell>     
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>  
                                            <TableCell align="left" sx={{fontSize:14,borderRight:'solid black 1px'}}>{receipt.MaSoPhieu}</TableCell>
                                            <TableCell align="left"  sx={{fontSize:14,borderRight:'solid black 1px'}}>{receipt.TenKyThu}</TableCell>
                                            <TableCell align="left"  sx={{fontSize:14,borderRight:'solid black 1px'}}>{receipt.TenLoai}</TableCell>
                                            <TableCell align="left"  sx={{fontSize:14,borderRight:'solid black 1px'}}>{receipt.TenTuyenThu}</TableCell>
                                            <TableCell align="left">{change(receipt.NgayThu)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            </TableContainer>
                            <Typography variant="h6" style={{fontSize:16, width: 700,paddingTop: 30, paddingBottom: 0, paddingRight: 40,textAlign:"right" }}>
                                <b>Tổng tiền: </b>
                                    {receipt.Gia.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' })}
                            </Typography>
                        </Box>
                    </Box>
                        <Stack direction="row" alignItems="center" justifyContent="space-evenly" marginTop={1}>
                            <Button variant="contained" onClick={handlePrint}>In hóa đơn</Button>  
                            <Button variant="contained" onClick={handleClose}>Huỷ</Button>
                        </Stack>
                </Box>
            </Modal>
        </div >
    
  );
}