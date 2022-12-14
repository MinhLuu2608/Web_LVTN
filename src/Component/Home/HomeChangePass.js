import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';
import { TextField } from '@mui/material';
import { GetCookie, cookie, BreakCookie } from '../Cookie/CookieFunc'

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


export default function HomeChangePass() {
    GetCookie(document.cookie)

    const [, dispatch] = React.useContext(SnackBarContext)
    const [currentPassword, setCurrentPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [rePassword, setRePassword] = React.useState('')

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
    }
    const handleRePasswordChange = (event) => {
        setRePassword(event.target.value)
    }


    const handleSubmit = async () => {
        let resultCheck = false
        await fetch("http://localhost:5199/api/login/checkRepass", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IDAccount: cookie,
                Password: currentPassword
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (result.severity !== "success") {
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage(result.message));
                    dispatch(setSeverity(result.severity));
                }
                else resultCheck = true
            },
                (error) => {
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage("Failed"));
                    dispatch(setSeverity("error"));
                })
        console.log(resultCheck)
        if (resultCheck === true) {
            if (newPassword !== rePassword) {
                dispatch(setOpenSnackBar());
                dispatch(setMessage("M???t kh???u m???i v?? nh???p l???i m???t kh???u m???i kh??ng gi???ng nhau"));
                dispatch(setSeverity("warning"));
            }
            else {
                await fetch("http://localhost:5199/api/mobileapp/changePassword", {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        IDAccount: cookie,
                        Password: newPassword
                    })
                })
                    .then(res => res.json())
                    .then((result) => {
                        if (result === 'Thay ?????i m???t kh???u th??nh c??ng') {
                            BreakCookie()
                            window.location.reload()
                        }
                    },
                        (error) => {
                            dispatch(setOpenSnackBar());
                            dispatch(setMessage("Failed"));
                            dispatch(setSeverity("error"));
                        })
            }
        }
    }

    return (
        <div>
            <Box sx={style}>
                <Typography variant="h5" style={{ paddingBottom: 30 }}>
                    ?????i m???t kh???u
                </Typography>
                <Stack direction="row" spacing={2} style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <TextField
                        required
                        style={{ width: 500 }}
                        label="M???t kh???u hi???n t???i"
                        type="password"
                        variant="outlined"
                        onChange={handleCurrentPasswordChange}
                    />
                </Stack>
                <Stack direction="row" spacing={2} style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <TextField
                        required
                        style={{ width: 500 }}
                        label="M???t kh???u m???i"
                        type="password"
                        variant="outlined"
                        onChange={handleNewPasswordChange}
                    />
                </Stack>
                <Stack direction="row" spacing={2} style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <TextField
                        required
                        style={{ width: 500 }}
                        label="Nh???p l???i m???t kh???u m???i"
                        type="password"
                        variant="outlined"
                        onChange={handleRePasswordChange}
                    />
                </Stack>
                <Stack direction="row" spacing={2} style={{ paddingTop: 30 }}>
                    <Button variant="contained" onClick={handleSubmit}>X??c nh???n</Button>
                </Stack>
            </Box>
        </div >
    )
}
