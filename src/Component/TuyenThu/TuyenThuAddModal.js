import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

export default function TuyenThuAddModal({ reRenderKyThuMain }) {
    const [, dispatch] = React.useContext(SnackBarContext)

    const [open, setOpen] = React.useState(false);

    const [quanHuyenList, setQuanHuyenList] = React.useState([]);
    const [xaPhuongList, setXaPhuongList] = React.useState([]);
    const [quanHuyen, setQuanHuyen] = React.useState('-1');
    const [xaPhuong, setXaPhuong] = React.useState([]);


    const handleChangeQuanHuyen = (quanHuyen) => {
        setQuanHuyen(quanHuyen);
    };

    const handleChangeXaPhuong = (event) => {
        const {
            target: { value },
        } = event;
        setXaPhuong(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);


    const handleSubmit = () => {
        fetch("http://localhost:5199/api/tuyenthu/" + quanHuyen, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(xaPhuong)
        })
            .then(res => res.json())
            .then((result) => {
                reRenderKyThuMain()
                dispatch(setOpenSnackBar())
                dispatch(setMessage(result.message))
                dispatch(setSeverity(result.severity))
                handleClose()
            },
                (error) => {
                    alert('Failed');
                });
    }

    React.useEffect(() => {
        fetch("http://localhost:5199/api/quanhuyen/")
            .then(response => response.json())
            .then(function (quanHuyenList) {
                setQuanHuyenList(quanHuyenList);
            },
                (error) => {
                    alert('Failed');
                });
    }, [])
    React.useEffect(() => {
        if (quanHuyen === -1) {
            setXaPhuong([]);
            setXaPhuongList([]);
        }
        else {
            fetch("http://localhost:5199/api/xaphuong/" + quanHuyen)
                .then(response => response.json())
                .then(function (xaPhuongList) {
                    setXaPhuongList(xaPhuongList);
                },
                    (error) => {
                        alert('Failed');
                    });
        }
        setXaPhuong([]);
    }, [quanHuyen])

    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end">
                <Button variant="contained" color="success" onClick={handleOpen}> Thêm tuyến thu</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography variant="h5" style={{ paddingBottom: 40 }}>
                        Thêm tuyến thu
                    </Typography>
                    <FormControl fullWidth style={{ paddingLeft: 7, paddingBottom: 20 }}>
                        <InputLabel>Quận huyện</InputLabel>
                        <Select
                            value={quanHuyen}
                            label="Quận huyện"
                            onChange={event => handleChangeQuanHuyen(event.target.value)}
                        >
                            {
                                quanHuyenList.map(quanHuyen => (
                                    <MenuItem key={quanHuyen.IDQuanHuyen} value={quanHuyen.IDQuanHuyen}> {quanHuyen.TenQuanHuyen} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-QuanHuyen" value={-1}>None</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel id="demo-multiple-chip-label">Xã phường</InputLabel>
                        <Select
                            multiple
                            value={xaPhuong}
                            onChange={handleChangeXaPhuong}
                            input={<OutlinedInput id="select-multiple-chip" label="Xã Phường" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {xaPhuongList.map(xaPhuong => (
                                <MenuItem
                                    key={xaPhuong.IDXaPhuong}
                                    value={xaPhuong.TenXaPhuong}
                                >
                                    {xaPhuong.TenXaPhuong}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={2} style={{ paddingTop: 20 }}>
                        <Button variant="contained" onClick={handleSubmit}>Thêm</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
