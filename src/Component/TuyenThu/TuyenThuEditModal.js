import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import EditNhanVien from './EditNhanVien';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';
import SnackBarContext from '../SnackBar/SnackBarContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 570,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};


export default function TuyenThuEditModal({ idTuyenThu, tenTuyenThu, idNhanVien, tenNhanVien, idQuanHuyen, nhanVienList, reRenderTuyenThuMain }) {
    const [, dispatch] = React.useContext(SnackBarContext)
    
    const [open, setOpen] = React.useState(false);
    const [nhanVien, setNhanVien] = React.useState(-1);
    const handleOpen = () => {
        if (idNhanVien !== null) {
            setNhanVien(idNhanVien);
        }
        else {
            setNhanVien(-1);
        }
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        if (nhanVien !== -1) {
            fetch("http://localhost:5199/api/tuyenthu", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IDNhanVien: nhanVien,
                    IDTuyenThu: idTuyenThu,
                    IDQuanHuyen: idQuanHuyen,
                })
            })
                .then(res => res.json())
                .then((result) => {
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

            reRenderTuyenThuMain();
        }
        else {
            alert('Chỉnh sửa nhân viên không thể có giá trị: None');
        }
    }

    return (
        <div>
            <IconButton variant="text" sx={{ color: 'var(--color8)' }} onClick={handleOpen}>
                <Tooltip title="Chỉnh Sửa">
                    <EditIcon />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        Sửa thông tin tuyến thu
                    </Typography>
                    {/* <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        {tenTuyenThu}
                    </Typography> */}
                    <TextField
                        label="Tên tuyến thu"
                        value={tenTuyenThu}
                        style={{ paddingBottom: 20, width: 500 }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <EditNhanVien
                        defaultIDNhanVien={idNhanVien}
                        defaultLabelNhanVien={tenNhanVien}
                        nhanVienList={nhanVienList}
                        changeNhanVien={setNhanVien}
                    />
                    <Stack direction="row" spacing={2} style={{ paddingTop: 40 }}>
                        <Button variant="contained" onClick={handleSubmit}>Chỉnh sửa</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}
