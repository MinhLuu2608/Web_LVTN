import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

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


export default function TuyenThuViewModal({ idTuyenThu, tenTuyenThu, idNhanVien }) {

    const [open, setOpen] = React.useState(false)
    const [allEmp, setAllEmp] = React.useState("")

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    React.useEffect(() => {
        if (idNhanVien !== null) {
            fetch("http://localhost:5199/api/tuyenthu/allemp/" + idTuyenThu + "/" + idNhanVien)
                .then(response => response.json())
                .then(function (empList) {
                    setAllEmp(empList);
                })
        }
        else{
            setAllEmp("Tuyến thu này chưa có nhân viên tiếp nhận")
        }
    }, [idTuyenThu, idNhanVien])

    return (
        <div>
            <IconButton variant="text" sx={{ color: 'var(--color8)' }} onClick={handleOpen}>
                <Tooltip title="Xem chi tiết">
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
                    <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        Thông tin chi tiết tuyến thu
                    </Typography>
                    <TextField
                        label="ID Tuyến Thu"
                        value={idTuyenThu}
                        style={{ paddingBottom: 20, width: 500 }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="Tên tuyến thu "
                        value={tenTuyenThu}
                        style={{ paddingBottom: 20, width: 500 }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="Tổng hợp nhân viên trong tuyến"
                        multiline
                        value={allEmp}
                        style={{ width: 500 }}
                        rows={5}
                    />
                    <Stack direction="row" spacing={2} style={{ paddingTop: 30 }}>
                        <Button variant="contained" onClick={handleClose}>Thoát</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}
