import React, { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import "../CSS/client.css";
import picture from "../image/Capture.PNG";
import md5 from "md5";
import axios from "axios";
import { cookie, CreateCookie, GetCookie } from "./Cookie/CookieFunc";
import { useNavigate } from "react-router-dom";

function Client() {
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        Username: "",
        Password: "",
    });
    // Set thông báo
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [StateLogin, setStateLogin] = useState("Not connect");

    const Checklogin = () => {
        if (login.Username.length !== 0 && login.Password.length !== 0) {
            axios
                .post("http://localhost:5199/api/Login", login)
                .then((res) => res.data)
                .then((res) => {
                    setStateLogin(res);
                    if (res === "Username Not Valid") {
                        handleClick();
                    }
                });
        } else {
            handleClick1();
        }
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen1(false);
    };

    console.log(StateLogin);

    if (cookie.length === 0) {
        if (StateLogin === "Connect") {
            axios
                .get(`http://localhost:5199/api/Login/${login.Username}`)
                .then((res) => res.data)
                .then((res) => {
                    if (document.cookie.length === 0) {
                        if (res !== "") {
                            CreateCookie(res);
                            navigate("home");
                        }
                    }
                });
        }
    } else {
        console.log("Đã có cookie");
    }

    return (
        <Box className="Client__app" width="100%" height="100vh" display="flex">
            {/* Hình nền  */}
            <Box
                width="100%"
                height="100%"
                display="flex"
                sx={{
                    backgroundImage:
                        'url("https://wallpaperaccess.com/full/1841213.jpg")',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#F5F5F5",
                }}
            >
                <Box
                    width="33%"
                    height="75%"
                    display="flex"
                    sx={{
                        backgroundColor: "white",

                        opacity: 0.9,
                        borderRadius: "5px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/*Logo */}
                    <Box
                        width="100%"
                        height="38%"
                        display="flex"
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            marginBottom: 2,
                            userSelect: "none",
                        }}
                    >
                        <img
                            src={picture}
                            alt="Logo"
                            width={290}
                            style={{ marginRight: 8 }}
                        />
                    </Box>
                    {/*input */}
                    <Box
                        width="100%"
                        height="25%"
                        display="flex"
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            marginBottom: 3,
                        }}
                    >
                        <TextField
                            id="outlined-uncontrolled"
                            label="Tài khoản"
                            variant="outlined"
                            sx={{
                                marginBottom: 3,
                                width: "50%",
                            }}
                            onChange={(e) => {
                                setLogin({
                                    ...login,
                                    Username: e.target.value,
                                });
                            }}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Mật khẩu"
                            variant="outlined"
                            type={"password"}
                            sx={{
                                width: "50%",
                            }}
                            onChange={(e) => {
                                setLogin({
                                    ...login,
                                    Password: e.target.value,
                                    // Password: md5(e.target.value),
                                });
                            }}
                        // onChange={(e)=> {setLogin({...login,Password: md5(e.target.value)})}}
                        />
                    </Box>
                    {/*Button */}
                    <Box
                        sx={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 2,
                            flexDirection: "column",
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                width: "100%",
                                marginBottom: 2,
                            }}
                            onClick={Checklogin}
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            variant="text"
                            size="large"
                            color="error"
                            sx={{
                                width: "100%",
                                marginTop: 2,
                                textDecoration: "underline",
                            }}
                        >
                            Hủy bỏ
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Snackbar
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
            >
                <Alert
                    onClose={handleClose1}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Vui lòng nhập tài khoản và mật khẩu
                </Alert>
            </Snackbar>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                key="top left"
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Đăng nhập thất bại sai tài khoản hoặc mật khẩu!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Client;
