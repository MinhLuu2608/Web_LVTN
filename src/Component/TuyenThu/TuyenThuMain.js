import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Typography from '@mui/material/Typography';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import TuyenThuAddModal from './TuyenThuAddModal';
import TuyenThuFilter from './TuyenThuFilter';
import TuyenThuEditModal from './TuyenThuEditModal';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';
import TuyenThuViewModal from './TuyenThuViewModal';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function TuyenThuMain() {

    // Table Style
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

    const [, dispatch] = React.useContext(SnackBarContext)


    const [rows, setRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [updateState, setUpdateState] = React.useState(true);
    const [searchTrangThai, setSearchTrangThai] = React.useState(0);
    const [searchNhanVien, setSearchNhanVien] = React.useState(-1);
    const [searchQuanHuyen, setSearchQuanHuyen] = React.useState(-1);
    const [searchXaPhuong, setSearchXaPhuong] = React.useState(-1);
    const [nhanVienList, setNhanVienList] = React.useState([]);
    const [nhanVienThuTienList, setNhanVienThuTienList] = React.useState([]);
    const [quanHuyenList, setQuanHuyenList] = React.useState([]);
    const [xaPhuongList, setXaPhuongList] = React.useState([]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const reRender = () => setUpdateState(!updateState);

    const handleDelete = (id) => {
        if (window.confirm('Kết thúc tuyến thu sẽ giải phóng các xã phường trong tuyến thu và sẽ xoá tuyến thu nếu tuyến thu này chưa bao giờ phân tuyến. Bạn có chắc chắn muốn kết thúc tuyến thu này ?')) {
            fetch("http://localhost:5199/api/tuyenthu/" + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    reRender();
                    dispatch(setOpenSnackBar())
                    dispatch(setMessage(result.message))
                    dispatch(setSeverity(result.severity))
                })
        }
    }

    const handleChangeTrangThai = (trangThai) => {
        setSearchTrangThai(trangThai)
        setPage(0)
        if (trangThai === -1) setSearchNhanVien(-1)
    }

    const handleChangeNhanVien = (nhanVien) => {
        setSearchNhanVien(nhanVien)
        setPage(0)
    }

    const handleChangeQuanHuyen = (quanHuyen) => {
        setSearchQuanHuyen(quanHuyen)
        setPage(0)
    }

    const handleChangeXaPhuong = (xaPhuong) => {
        setSearchXaPhuong(xaPhuong)
        setPage(0)
    }

    React.useEffect(() => {
        fetch("http://localhost:5199/api/quanhuyen/")
            .then(response => response.json())
            .then(function (quanHuyenList) {
                setQuanHuyenList(quanHuyenList);
            });
        fetch("http://localhost:5199/api/nhanvien/")
            .then(response => response.json())
            .then(function (nhanVienList) {
                setNhanVienList(nhanVienList);
            });
        fetch("http://localhost:5199/api/nhanvien/quyen/2")
            .then(response => response.json())
            .then(function (nhanVienList) {
                setNhanVienThuTienList(nhanVienList);
            });
    }, [])

    React.useEffect(() => {
        setSearchXaPhuong(-1);
        if (searchQuanHuyen === -1) {
            setXaPhuongList([]);
        }
        else {
            fetch("http://localhost:5199/api/xaphuong/" + searchQuanHuyen)
                .then(response => response.json())
                .then(function (xaPhuongList) {
                    setXaPhuongList(xaPhuongList);
                });
        }
    }, [searchQuanHuyen])

    React.useEffect(() => {
        if (searchTrangThai !== -1) {
            fetch("http://localhost:5199/api/tuyenthu/" + searchTrangThai + "/" + searchNhanVien + "/" + searchQuanHuyen + "/" + searchXaPhuong)
                .then(response => response.json())
                .then(function (tuyenThu) {
                    setRows(tuyenThu);
                },
                    (error) => {
                        dispatch(setOpenSnackBar())
                        dispatch(setMessage("Failed"))
                        dispatch(setSeverity("error"))
                    })
        }
        else {
            fetch("http://localhost:5199/api/tuyenthu/-1/-1/" + searchQuanHuyen + "/" + searchXaPhuong)
                .then(response => response.json())
                .then(function (tuyenThu) {
                    setRows(tuyenThu);
                },
                    (error) => {
                        dispatch(setOpenSnackBar())
                        dispatch(setMessage("Failed"))
                        dispatch(setSeverity("error"))
                    })
        }
    }, [updateState, searchTrangThai, searchNhanVien, searchQuanHuyen, searchXaPhuong, dispatch])

    return (
        <>
            <Typography variant="p"
                sx={
                    {
                        fontSize: 30,
                        color: "var(--color2)",
                        fontWeight: "bold"
                    }
                }
            >
                Quản lý tuyến thu
            </Typography>

            <TuyenThuAddModal reRenderKyThuMain={reRender} />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <TuyenThuFilter
                    trangThai={searchTrangThai}
                    nhanVien={searchNhanVien}
                    quanHuyen={searchQuanHuyen}
                    xaPhuong={searchXaPhuong}
                    nhanVienList={nhanVienList}
                    quanHuyenList={quanHuyenList}
                    xaPhuongList={xaPhuongList}
                    changeTrangThai={handleChangeTrangThai}
                    changeNhanVien={handleChangeNhanVien}
                    changeQuanHuyen={handleChangeQuanHuyen}
                    changeXaPhuong={handleChangeXaPhuong}
                />
            </Stack>
            <TableContainer style={{ marginTop: 20 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell style={{ width: "9%" }} align="center">Mã tuyến thu</StyledTableCell>
                            <StyledTableCell style={{ width: "31%" }} align="center">Tên tuyến thu</StyledTableCell>
                            <StyledTableCell style={{ width: "15%" }} align="center">Tên quận huyện</StyledTableCell>
                            <StyledTableCell style={{ width: "15%" }} align="center">Tên nhân viên</StyledTableCell>
                            <StyledTableCell style={{ width: "10%" }} align="center">Ngày bắt đầu</StyledTableCell>
                            <StyledTableCell style={{ width: "10%" }} align="center">Ngày kết thúc</StyledTableCell>
                            <StyledTableCell style={{ width: "10%" }} align="center">Thao tác</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow
                                key={row.IDTuyenThu}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.MaTuyenThu}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.TenTuyenThu}</StyledTableCell>
                                <StyledTableCell align="center">{row.TenQuanHuyen}</StyledTableCell>
                                {
                                    row.NgayBatDau === null ?
                                        <StyledTableCell colSpan={3} align="center" style={{ color: "#5f1ebde8" }}>Không có nhân viên tiếp nhận</StyledTableCell>
                                        :
                                        // handleRenderInfo(row)
                                        (
                                            <>
                                                <StyledTableCell align="center">{row.HoTen}</StyledTableCell>
                                                <StyledTableCell align="center">{row.NgayBatDau}</StyledTableCell>
                                                <StyledTableCell align="center">{row.NgayKetThuc}</StyledTableCell>
                                            </>
                                        )
                                }
                                <StyledTableCell align="center">
                                    <ButtonGroup>
                                        <TuyenThuViewModal
                                            idTuyenThu={row.IDTuyenThu}
                                            tenTuyenThu={row.TenTuyenThu}
                                            idNhanVien={row.IDNhanVien}
                                            tenNhanVien={row.HoTen}
                                        />
                                        <TuyenThuEditModal
                                            idTuyenThu={row.IDTuyenThu}
                                            tenTuyenThu={row.TenTuyenThu}
                                            idNhanVien={row.IDNhanVien}
                                            tenNhanVien={row.HoTen}
                                            idQuanHuyen={row.IDQuanHuyen}
                                            ngayBD={row.NgayBatDau}
                                            nhanVienList={nhanVienThuTienList}
                                            reRenderTuyenThuMain={reRender}
                                        />
                                        <IconButton onClick={() => handleDelete(row.IDTuyenThu)}>
                                            <Tooltip sx={{ color: 'var(--color9)' }} title="Kết thúc">
                                                <DeleteIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

