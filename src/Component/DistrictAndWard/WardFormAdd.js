import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';


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

const Info__style = {
    display: 'flex',
    width: 400,
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginLeft: 2,
    color: 'black'
};

const AddForm__style = {
    display: 'flex',
};



export default function WardFormAdd({ handleResetPage, districts }) {

    const client = axios.create({
        baseURL: "http://localhost:5199/api/XaPhuong"
    });

    const [, dispatch] = React.useContext(SnackBarContext)

    const [Name, setName] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const [posts, setPosts] = React.useState([]);

    const [chosenDistrict, setChosenDistrict] = React.useState(0);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleInputName = (event) => {
        setName(event.target.value)
    }

    const handleChangeDistrict = (event) => {
        setChosenDistrict(event.target.value);
    };

    const handleSubmit = () => {

        let thongbao = "Hãy thêm thông tin cho :";

        let validName = false;

        let validChosenDistrict = false;

        if (Name === "") {
            thongbao = thongbao + "\nTên Quận Huyện"
        } else validName = true

        if (chosenDistrict === 0) {
            thongbao = thongbao + "\nQuận Huyện"
        } else validChosenDistrict = true

        if (validName && validChosenDistrict) {
            addPosts(Name);
        } else {
            alert(thongbao);
        }
    };
    const addPosts = (Name) => {
        client
            .post('', {
                "tenXaPhuong": Name,
                "idQuanHuyen": chosenDistrict
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
                    console.log('err.response.data' + err.response.data);
                    console.log('err.response.status' + err.response.status);
                    console.log('err.response.headers' + err.response.headers);
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                } else {
                    // Anything else
                }
            });
        setName('');
        handleResetPage();
        handleClose();
    };
    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color7)' }}>Thêm Xã Phường</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={2} alignItems="flex-end" justifyContent="space-between" marginBottom={4}>
                        <Typography id="post-request-error-handling" variant="h5">
                            Thêm Xã Phường Mới
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>

                    <Box sx={AddForm__style}>
                        <Box sx={Info__style}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="select-district"
                                value={chosenDistrict}
                                onChange={handleChangeDistrict}
                                style={{ marginBottom: 20 }}
                            >
                                <MenuItem value={0} key={0}>
                                    Hãy Chọn Quận Huyện
                                </MenuItem>
                                {districts
                                    .map((district) => (
                                        <MenuItem value={district.IDQuanHuyen} key={district.IDQuanHuyen}>
                                            {district.TenQuanHuyen}
                                        </MenuItem>
                                    ))}
                            </Select>
                            <TextField
                                required
                                label="Tên Xã Phường"
                                variant="outlined"
                                onChange={handleInputName}
                                style={{ paddingBottom: 20 }}
                            >
                            </TextField>
                        </Box>
                    </Box>
                    <Stack sx={{ padding: 2 }} direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="contained" onClick={handleSubmit} sx={{ width: 200 }}>Xác nhận</Button>
                        <Button variant="contained" onClick={handleClose} sx={{ width: 200 }}>Huỷ bỏ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}