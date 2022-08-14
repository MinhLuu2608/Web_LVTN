import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';

const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1300,
    height: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};
const Info__style = {
    display: 'flex',
    width: 1250,
    height: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'var(--color3)',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CustomerNoRoute({ handleResetPage }) {
    const [open, setOpen] = React.useState(false);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const client = axios.create({
        baseURL: "http://localhost:5199/api/KhachHang/customerNoRoute"
    });

    const [, dispatch] = React.useContext(SnackBarContext)

    const [posts, setPosts] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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

    const [customersNoRoute, setCustomersNoRoute] = React.useState([])

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/KhachHang/getCustomerNoRoute`)
            .then(res => {
                const customersNoRoute = res.data;
                setCustomersNoRoute(customersNoRoute);
            })
    }, [handleResetPage])

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color7)' }}>Khách Hàng Không Có Tuyến Thu</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={1} alignItems="flex-end" justifyContent="space-between" marginBottom={3}>
                        <Typography variant="h4">
                            Danh Sách Khách Hàng Không Có Tuyến Thu
                        </Typography>
                        <IconButton variant="contained" onClick={handleClose}><CloseIcon /></IconButton>
                    </Stack>
                    <Box sx={Info__style}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead color="black">
                                    <TableRow>
                                        <StyledTableCell style={{ width: '15%' }}>Mã Khách Hàng</StyledTableCell>
                                        <StyledTableCell style={{ width: '15%' }}>Tên Khách Hàng</StyledTableCell>
                                        <StyledTableCell style={{ width: '15%' }}>Loại Khách Hàng</StyledTableCell>
                                        <StyledTableCell style={{ width: '15%' }}>Địa Chỉ</StyledTableCell>
                                        <StyledTableCell style={{ width: '10%' }}>Xã Phường</StyledTableCell>
                                        <StyledTableCell style={{ width: '15%' }}>Quận Huyện</StyledTableCell>
                                        <StyledTableCell style={{ width: '15%' }}>Trạng Thái</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customersNoRoute
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (customer) {
                                            return (
                                                <StyledTableRow
                                                    key={customer.IDKhachHang}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <StyledTableCell component="th" scope="row" >
                                                        {customer.MaKhachHang}
                                                    </StyledTableCell>
                                                    <StyledTableCell>{customer.HoTenKH}</StyledTableCell>
                                                    <StyledTableCell>{customer.TenLoai}</StyledTableCell>
                                                    <StyledTableCell>{customer.DiaChi}</StyledTableCell>
                                                    <StyledTableCell>{customer.TenXaPhuong}</StyledTableCell>
                                                    <StyledTableCell>{customer.TenQuanHuyen}</StyledTableCell>
                                                    {customer.TrangThai === 1 ?
                                                        <StyledTableCell sx={{ color: "var(--color2)" }}>Đang Sử Dụng</StyledTableCell>
                                                        :
                                                        <StyledTableCell style={{ color: "var(--color9)" }}>Tạm Dừng Sử Dụng</StyledTableCell>
                                                    }
                                                </StyledTableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5]}
                                component="div"
                                count={customersNoRoute.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Box>
                    <Stack direction="row-reverse" spacing={2} alignItems="flex-end" marginTop={2}>
                        <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: 'var(--color9)' }}>Tạm Dừng Tất Cả Khách Hàng Không Có Tuyến Thu</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}