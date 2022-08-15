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
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';
import { GetCookie, cookie } from '../Cookie/CookieFunc';
import ReceiptFilter from './ReceiptFilter';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReceiptDetailModal from './ReceiptDetailModal';
import Button from '@mui/material/Button';


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


export default function ReceiptMain() {

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

    GetCookie(document.cookie)

    const [, dispatch] = React.useContext(SnackBarContext)

    const [rows, setRows] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [updateState, setUpdateState] = React.useState(true)
    const [searchThanhToan, setSearchThanhToan] = React.useState(-1)
    const [searchKyThu, setSearchKyThu] = React.useState(-1)
    const [searchKhachHang, setSearchKhachHang] = React.useState(-1)
    const [searchLoaiKhachHang, setSearchLoaiKhachHang] = React.useState(-1)
    const [searchTrangThai, setSearchTrangThai] = React.useState(-1)
    const [kyThuList, setKyThuList] = React.useState([])
    const [khachHangList, setKhachHangList] = React.useState([])
    const [loaiKhachHangList, setLoaiKhachHangList] = React.useState([])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeThanhToan = (thanhToan) => {
        setSearchThanhToan(thanhToan)
        setPage(0)
    }
    const handleChangeKyThu = (kyThu) => {
        setSearchKyThu(kyThu)
        setPage(0)
    }
    const handleChangeKhachHang = (khachHang) => {
        setSearchKhachHang(khachHang)
        setPage(0)
    }
    const handleChangeLoaiKhachHang = (loaiKhachHang) => {
        setSearchLoaiKhachHang(loaiKhachHang)
        setPage(0)
    }
    const handleChangeTrangThai = (trangThai) => {
        setSearchTrangThai(trangThai)
        setSearchThanhToan(-1)
        setPage(0)
    }

    const handleXacNhan = (IDPhieu, IDKhachHang, IDNhanVien) => {

        fetch("http://localhost:5199/api/PhieuThu", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                IDPhieu: IDPhieu,
                IDKhachHang: IDKhachHang,
                IDNhanVien: IDNhanVien
            })
        })
            .then(res => res.json())
            .then((result) => {
                dispatch(setOpenSnackBar())
                dispatch(setMessage(result.message))
                dispatch(setSeverity(result.severity))
            });
    }

    React.useEffect(() => {
        fetch('http://localhost:5199/api/KhachHang/' + cookie)
            .then(response => response.json())
            .then(function (khachHang) {
                setKhachHangList(khachHang);
            });
        fetch('http://localhost:5199/api/LoaiKhachHang')
            .then(response => response.json())
            .then(function (loaiKH) {
                setLoaiKhachHangList(loaiKH);
            });
        fetch('http://localhost:5199/api/kyThu')
            .then(response => response.json())
            .then(function (kyThu) {
                setKyThuList(kyThu);
            });
    }, [])


    React.useEffect(() => {
        let optionURL = cookie + "/" + searchKyThu + "/" +
            searchKhachHang + "/" + searchLoaiKhachHang + "/" + searchThanhToan + "/" + searchTrangThai
        fetch("http://localhost:5199/api/phieuthu/nhanvien/" + optionURL)
            .then(response => response.json())
            .then(function (phieuthu) {
                setRows(phieuthu);
            },
                (error) => {
                    dispatch(setOpenSnackBar())
                    dispatch(setMessage("Failed"))
                    dispatch(setSeverity("error"))
                })
    }, [updateState, searchKyThu, searchKhachHang, searchLoaiKhachHang, searchThanhToan, searchTrangThai, dispatch])

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
                Quản lý hoá đơn
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <ReceiptFilter
                    thanhToan={searchThanhToan}
                    kyThu={searchKyThu}
                    khachHang={searchKhachHang}
                    loaiKhachHang={searchLoaiKhachHang}
                    trangThai={searchTrangThai}
                    kyThuList={kyThuList}
                    khachHangList={khachHangList}
                    loaiKhachHangList={loaiKhachHangList}
                    changeThanhToan={handleChangeThanhToan}
                    changeKyThu={handleChangeKyThu}
                    changeKhachHang={handleChangeKhachHang}
                    changeLoaiKhachHang={handleChangeLoaiKhachHang}
                    changeTrangThai={handleChangeTrangThai}
                />
            </Stack>
            <TableContainer style={{ marginTop: 20 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell style={{ width: "5%" }} align="center">Mã Hoá đơn</StyledTableCell>
                            <StyledTableCell style={{ width: "5%" }} align="center">Mã khách hàng</StyledTableCell>
                            <StyledTableCell style={{ width: "25%" }} align="center">Tên khách hàng</StyledTableCell>
                            <StyledTableCell style={{ width: "15%" }} align="center">Loại khách hàng</StyledTableCell>
                            <StyledTableCell style={{ width: "10%" }} align="center">Trạng thái</StyledTableCell>
                            <StyledTableCell style={{ width: "30%" }} align="center">Tên kỳ thu</StyledTableCell>
                            <StyledTableCell style={{ width: "10%" }} align="center">Thao tác</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow
                                key={row.IDHoaDon}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.MaSoPhieu}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.MaKhachHang}</StyledTableCell>
                                <StyledTableCell align="center">{row.HoTenKH}</StyledTableCell>
                                <StyledTableCell align="center">{row.TenLoai}</StyledTableCell>
                                {
                                    row.NgayThu === null ?
                                        <StyledTableCell align="center" sx={{ color: "var(--color9)" }}>Chưa Thu</StyledTableCell>
                                        :
                                        <StyledTableCell align="center" sx={{ color: "var(--color7)" }}>Đã thu</StyledTableCell>
                                }
                                <StyledTableCell align="center">{row.TenKyThu}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup>
                                        {
                                            row.NgayThu === null ?
                                                <Button
                                                    sx={{
                                                        width: 60, height: 40, fontSize: 11, display: "flex", justifyContent: "flex-end",
                                                        color: "var(--color1)", backgroundColor: "var(--color3)",
                                                        ':hover': {
                                                            backgroundColor: 'var(--color1)',
                                                            color: 'var(--color3)',
                                                        }
                                                    }}
                                                    variant="outline"
                                                    onClick={() => {
                                                        handleXacNhan(row.IDHoaDon, row.IDKhachHang, cookie)
                                                        setUpdateState(!updateState)
                                                    }}
                                                >
                                                    Xác nhận
                                                </Button>
                                                :
                                                <ReceiptDetailModal receiptID={row.IDHoaDon} isExport={true} />
                                        }

                                        <ReceiptDetailModal receiptID={row.IDHoaDon} isExport={false} />
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

