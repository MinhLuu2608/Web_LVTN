import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};
const Info__style = {
    display: 'flex',
    width: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10
};
function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
}
export default function CustomerFormView({ customer }) {
    const [open, setOpen] = React.useState(false);

    const [accountLinked, setAccountLinked] = React.useState("");

    React.useEffect(() => {
        fetch("http://localhost:5199/api/khachhang/accountLinked/" + customer.IDKhachHang)
            .then(response => response.json())
            .then(function (accountLink) {
                setAccountLinked(accountLink)
            })
    }, [customer.IDKhachHang])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);
    const NgayTao = new Date(customer.NgayTao);
    let ngayKetThuc

    if (customer.NgayKetThuc !== null) {
        ngayKetThuc = getFormattedDate(new Date(customer.NgayKetThuc))
    } else {
        ngayKetThuc = "Đang sử dụng"
    }
    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="primary">
                <Tooltip title="Xem Chi Tiết">
                    <VisibilityIcon
                        sx={{ color: 'var(--color7)' }}
                    />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={1} alignItems="flex-end" justifyContent="space-between" marginBottom={5}>
                        <Typography variant="h4">
                            Chi Tiết Khách Hàng
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Box sx={Info__style}>
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Họ Tên: <Typography variant="inherit">{customer.HoTenKH}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Mã Số Khách Hàng: <Typography variant="inherit">{customer.MaKhachHang}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Ngày Tạo: <Typography variant="inherit">{getFormattedDate(NgayTao)}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Ngày Kết thúc: <Typography variant="inherit">{ngayKetThuc}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Địa Chỉ: <Typography variant="inherit">{customer.DiaChi}, {customer.TenXaPhuong} , {customer.TenQuanHuyen}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Số CCCD: <Typography variant="inherit">{customer.CCCD}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Các account đã liên kết:
                            <Typography variant="inherit">
                                {accountLinked}
                            </Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Loại Khách Hàng: <Typography variant="inherit">{customer.TenLoai}</Typography>
                        </Typography>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}