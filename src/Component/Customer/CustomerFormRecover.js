import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function CustomerFormRecover({ customer, handleResetPage }) {

    const client = axios.create({
        baseURL: "http://localhost:5199/api/KhachHang/" + customer.IDKhachHang +",1"
    });

    const [, dispatch] = React.useContext(SnackBarContext)

    const [posts, setPosts] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        client
            .put('', {
            })
            .then((response) => {
                setPosts([response.data, ...posts]);
                dispatch(setOpenSnackBar());
                dispatch(setMessage(response.data.message));
                dispatch(setSeverity(response.data.severity));
            })
            .catch((err) => {
                if (err.response) {
                    // The client was given an error response (5xx, 4xx)
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                } else {
                    // Anything else
                }
            });
        handleResetPage();
        handleClose();
    };

    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end" onClick={handleOpen} marginBottom={1}>
                <IconButton variant="text">
                    <Tooltip title="Phục Hồi">
                        <RestartAltIcon
                            sx={{ color: 'var(--color2)'}}
                        />
                    </Tooltip>
                </IconButton>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 20 }}>
                        Xác Nhận Phục Hồi Khách Hàng
                    </Typography>
                    <Typography id="post-request-error-handling" variant="h4" style={{ paddingBottom: 40 }}>
                        {customer.HoTenKH}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-evenly" >
                        <Button variant="contained" onClick={handleSubmit}>Xác Nhận</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}