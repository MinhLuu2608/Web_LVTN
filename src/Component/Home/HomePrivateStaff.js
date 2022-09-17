import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WcIcon from '@mui/icons-material/Wc';
import BadgeIcon from '@mui/icons-material/Badge';
import { LoginContext } from '../LoginContext/LoginContext';

function HomePrivateStaff() {
    const globaltext = useContext(LoginContext);

    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return day + '-' + month + '-' + year;
    }

    const d = new Date(globaltext.infostaff[0].NgaySinh)
    const NgaySinh = getFormattedDate(d);

    return (
        <Box display={"flex"}
            sx={{ width: "100%", height: "100%", flexDirection: "column" }}
        >
            <Typography variant='h4' color={"var(--color3)"}>
                THÔNG TIN NHÂN VIÊN
            </Typography>

            <Divider sx={{ height: "2px", backgroundColor: "var(--color11)" }} />
            <Box display={"flex"}
                sx={{
                    backgroundColor: "var(--color11)",
                    width: "90%",
                    height: 450,
                    alignSelf: 'center',
                    marginTop: 8,
                    borderRadius: 5,
                    color: 'var(--colortext11)',
                    padding: 6,

                }}
            >
                <Box
                    display={"flex"}
                    sx={{ width: "40%", height: "100%", flexDirection: 'column' }}>
                    {/* Tên , chức vụ , ảnh */}
                    <Typography variant='h4'>{globaltext.infostaff[0].HoTen}</Typography>

                    <Typography variant='h6' marginTop={1} fontStyle={'oblique'}>
                        {globaltext.quyen.map((element, index) => {
                            if (index === globaltext.quyen.length - 1) {
                                return element.TenQuyen
                            }
                            else {
                                return (element.TenQuyen + ' - ')
                            }
                        })}
                    </Typography>

                    <Typography variant='p' marginTop={2} fontSize={18} fontStyle={'oblique'} >
                        {'MSNV :' + globaltext.infostaff[0].MaNhanVien}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: "80%",
                        height: "100%",
                        marginLeft: 3,
                        flexDirection: "column",
                        justifyContent: "space-around",
                        marginTop: 3
                    }}
                    display="flex"
                >

                    <Box width={"100%"} height="30%" display="flex" sx={{ justifyContent: "space-between" }}>
                        <Box display={"flex"} alignItem={"center"} width={"90%"} height={"70px"}>
                            <DateRangeIcon sx={{ fontSize: 30 }} />
                            <Typography variant='p' marginLeft={2} fontSize={21}>
                                {NgaySinh}

                            </Typography>
                        </Box>
                        <Box display={"flex"} marginLeft={2} alignItem={"center"} width={"50%"} height={"70px"}>
                            <LocalPhoneIcon sx={{ fontSize: 30 }} />
                            <Typography variant='p' marginLeft={2} fontSize={21}>
                                {globaltext.infostaff[0].SoDienThoai}

                            </Typography>
                        </Box>


                    </Box>
                    <Box width={"100%"} height="30%" display="flex" sx={{ justifyContent: "space-between" }}>
                        <Box display={"flex"} alignItem={"center"} width={"90%"} height={"70px"}>
                            <EmailIcon sx={{ fontSize: 30 }} />
                            <Typography variant='p' marginLeft={2} fontSize={21} fontStyle={'oblique'}>
                                {globaltext.infostaff[0].Email}
                            </Typography>
                        </Box>
                        <Box display={"flex"} marginLeft={2} alignItem={"center"} width={"50%"} height={"70px"}>
                            <WcIcon sx={{ fontSize: 30 }} />
                            <Typography variant='p' marginLeft={2} fontSize={21}>
                                {globaltext.infostaff[0].GioiTinh}

                            </Typography>
                        </Box>
                    </Box>
                    <Box width={"100%"} height="30%" display="flex" sx={{ justifyContent: "space-between" }}>
                        <Box display={"flex"} alignItem={"center"} width={"90%"} height={"70px"}>
                            <AddLocationIcon sx={{ fontSize: 30 }} />
                            <Typography variant='p' marginLeft={2} fontSize={21}>
                                {globaltext.infostaff[0].DiaChi}
                            </Typography>
                        </Box>
                        <Box display={"flex"} marginLeft={2} alignItem={"center"} width={"50%"} height={"70px"}>
                            <BadgeIcon sx={{ fontSize: 30 }} />
                            <Typography variant='p' marginLeft={2} fontSize={21}>
                                {globaltext.infostaff[0].CCCD}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default HomePrivateStaff