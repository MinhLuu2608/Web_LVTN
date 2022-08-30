import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { TextField } from '@mui/material';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

export default function ServiceEditModal({ idDichVu, donGia, reRenderServiceMain }) {
    const [, dispatch] = React.useContext(SnackBarContext)

    const [open, setOpen] = React.useState(false);
    const [donGiaDV, setDonGiaDV] = React.useState(donGia);
    const [donGiaError, setDonGiaError] = React.useState(false);

    const handleOpen = () => {
        setDonGiaDV(donGia)
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    const handleInputDonGia = (event) => {
        setDonGiaDV(event.target.value)
    }

    const handleSubmit = () => {
        setDonGiaError(false)
        let validDonGia = false

        if (donGiaDV === '' || isNaN(+donGiaDV)) {
            setDonGiaError(true)
        } else validDonGia = true

        if (validDonGia) {
            fetch("http://localhost:5199/api/service", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IDDichVu: idDichVu,
                    DonGiaDV: donGiaDV
                })
            })
                .then(res => res.json())
                .then((result) => {
                    reRenderServiceMain();
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
                        Sửa thông tin dịch vụ
                    </Typography>
                    <TextField
                        required
                        value={donGiaDV}
                        style={{ width: 300 }}
                        label="Đơn giá"
                        variant="outlined"
                        onChange={handleInputDonGia}
                        error={donGiaError}
                    />

                    <Stack direction="row" spacing={2} style={{ paddingTop: 40 }}>
                        <Button variant="contained" onClick={handleSubmit}>Chỉnh sửa</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
