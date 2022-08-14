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
export default function EmployeeFormView({ employee, empRoles }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const NgaySinh = new Date(employee.NgaySinh);
    return (
        <div>
            <IconButton onClick={handleOpen} variant="text" color="primary">
                <Tooltip title="Xem Chi Tiết"><VisibilityIcon />
                </Tooltip>
            </IconButton>
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
                    <Box sx={Info__style}>
                        <Typography variant="h4" style={{ width: 1200, paddingBottom: 40}}>
                            Chi Tiết Nhân Viên
                        </Typography>
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Họ Tên: <Typography variant="inherit">{employee.HoTen}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Mã Số Nhân Viên: <Typography variant="inherit">{employee.MaNhanVien}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Chức Vụ: <Typography variant="inherit">{empRoles}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Giới Tính: <Typography variant="inherit">{employee.GioiTinh}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Ngày Sinh: <Typography variant="inherit">{getFormattedDate(NgaySinh)}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Số Điện Thoại: <Typography variant="inherit">{employee.SoDienThoai}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Số CCCD: <Typography variant="inherit">{employee.CCCD}</Typography>
                        </Typography>
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Email: <Typography variant="inherit">{employee.Email}</Typography>
                        </Typography> 
                        <Typography variant="h6" style={{ width: 700, paddingBottom: 40, paddingRight: 40 }}>
                            Địa Chỉ: <Typography variant="inherit">{employee.DiaChi}</Typography>
                        </Typography>  
                        <Typography variant="h6" style={{ width: 300, paddingBottom: 40, paddingRight: 40 }}>
                            Tài Khoản: <Typography variant="inherit">{employee.TaiKhoan}</Typography>
                        </Typography>        
                    </Box>
                </Box>
            </Modal>
        </div >
    )
}