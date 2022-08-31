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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { TextField } from '@mui/material';
import Select from '@mui/material/Select'
import DeleteIcon from '@mui/icons-material/Delete'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};


export default function ReceivedOrderDeleteModal({ idDonHang, idNhanVien, reRenderMain }) {

    const [, dispatch] = React.useContext(SnackBarContext)
    const [lyDo, setLyDo] = React.useState("SPAM")
    const [lyDoKhac, setLyDoKhac] = React.useState("SPAM")
    const [lyDoKhacError, setLyDoKhacError] = React.useState(false);
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setLyDoKhacError(false)
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    const handleChangeLyDo = (value) => {
        setLyDo(value)
    }
    const handleChangeLyDoKhac = (event) => {
        setLyDoKhac(event.target.value)
    }

    const handleSubmit = () => {
        let validLyDoKhac = false
        let note = ""
        setLyDoKhacError(false)

        if (lyDo !== 'Khác') {
            note = lyDo
            validLyDoKhac = true
        }
        else {
            if (lyDoKhac === '') {
                setLyDoKhacError(true)
            }
            else {
                note = lyDoKhac
                validLyDoKhac = true
            }
        }
        if (validLyDoKhac) {
            fetch("http://localhost:5199/api/donhang/cancelreceveid", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    IDDonHang: idDonHang,
                    IDNhanVien: idNhanVien,
                    Note: note
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
    }

    return (
        <div>
            <IconButton variant="text" sx={{ color: 'var(--color9)' }} onClick={handleOpen}>
                <Tooltip title="Huỷ đơn hàng">
                    <DeleteIcon />
                </Tooltip>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5" style={{ paddingBottom: 20 }}>
                        Huỷ đơn hàng
                    </Typography>
                    <FormControl style={{ width: 330 }}>
                        <InputLabel>Lý do huỷ</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={lyDo}
                            label="Lý do huỷ"
                            onChange={event => handleChangeLyDo(event.target.value)}
                        >
                            <MenuItem value={"SPAM"}>SPAM</MenuItem>
                            <MenuItem value={"Không thể liên lạc"}>Không thể liên lạc với khách hàng</MenuItem>
                            <MenuItem value={"Khác"}>Khác</MenuItem>
                        </Select>
                        {
                            lyDo === "Khác"
                                ? <TextField
                                    value={lyDoKhac}
                                    style={{ width: 330, marginTop: 20 }}
                                    label="Lý do khác"
                                    variant="outlined"
                                    onChange={handleChangeLyDoKhac}
                                    error={lyDoKhacError}
                                />
                                : <></>
                        }
                    </FormControl>
                    <Stack direction="row" spacing={2} style={{ paddingTop: 20 }}>
                        <Button variant="contained" onClick={handleSubmit}>Xác nhận</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
