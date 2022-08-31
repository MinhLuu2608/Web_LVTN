import * as React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import Typography from '@mui/material/Typography'
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import ButtonGroup from '@mui/material/ButtonGroup'
import SnackBarContext from '../SnackBar/SnackBarContext'
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction'
import { GetCookie, cookie } from '../Cookie/CookieFunc'
import ReceivedOrderFilter from './ReceivedOrderFilter'
import ReceivedOrderDetailModal from './ReceivedOrderDetailModal'
import ReceivedOrderDeleteModal from './ReceivedOrderDeleteModal'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';

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


export default function ReceivedOrderMain() {

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
    const [idNhanVien, setIDNhanVien] = React.useState(0)
    const [searchTenKH, setSearchTenKH] = React.useState("")
    const [searchTinhTrangXuLy, setSearchTinhTrangXuLy] = React.useState("Đã tiếp nhận")

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    };

    const handleChangeTenKH = (event) => {
        setSearchTenKH(event.target.value)
    }
    const handleChangeTinhTrangXuLy = (value) => {
        setSearchTinhTrangXuLy(value)
    }

    const handleRecovery = (idDonHang) => {
        fetch("http://localhost:5199/api/donhang/recovery", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IDDonHang: idDonHang
            })
        })
            .then(res => res.json())
            .then((result) => {
                reRender()
                dispatch(setOpenSnackBar())
                dispatch(setMessage(result.message))
                dispatch(setSeverity(result.severity))
            })
    }

    const reRender = () => setUpdateState(!updateState);

    React.useEffect(() => {
        fetch("http://localhost:5199/api/donhang/received", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IDNhanVien: idNhanVien,
                TenKhachHang: searchTenKH,
                TinhTrangXuLy: searchTinhTrangXuLy
            })
        })
            .then(res => res.json())
            .then((donHang) => {
                setRows(donHang);
            },
                (error) => {
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage("Failed"));
                    dispatch(setSeverity("error"));
                });
    }, [updateState, searchTenKH, searchTinhTrangXuLy, idNhanVien, dispatch])

    React.useEffect(() => {
        GetCookie(document.cookie)
        setIDNhanVien(cookie)
    }, [updateState])


    const showTinhTrangXuLy = (tinhTrangXuLy, note) => {
        let color = "";
        if (tinhTrangXuLy === 'Đã tiếp nhận') {
            color = "var(--color9)"
        }
        if (tinhTrangXuLy === 'Đã hoàn thành') {
            color = "var(--color7)"
        }

        if (tinhTrangXuLy === 'Đã bị huỷ') {
            color = "var(--color14)"
        }
        if (tinhTrangXuLy === 'Đã bị huỷ')
            return <StyledTableCell align="center" sx={{ color: color }}>{tinhTrangXuLy}: {note}</StyledTableCell>

        return <StyledTableCell align="center" sx={{ color: color }}>{tinhTrangXuLy}</StyledTableCell>
    }

    return (
        <>
            <Typography variant="p" sx={{ fontSize: 30, color: "var(--color2)", fontWeight: "bold", paddingBottom: 20 }}>
                Danh sách đơn hàng đã nhận
            </Typography>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <ReceivedOrderFilter
                    searchTenKH={searchTenKH}
                    searchTinhTrangXuLy={searchTinhTrangXuLy}
                    changeTenKH={handleChangeTenKH}
                    changeTinhTrangXuLy={handleChangeTinhTrangXuLy}
                />
            </Stack>
            <TableContainer style={{ marginTop: 20 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center">Mã đơn hàng</StyledTableCell>
                            <StyledTableCell align="center">Tên khách hàng</StyledTableCell>
                            <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                            <StyledTableCell align="center">Địa chỉ khách hàng</StyledTableCell>
                            <StyledTableCell align="center">Ngày hẹn</StyledTableCell>
                            <StyledTableCell align="center">Tình trạng</StyledTableCell>
                            <StyledTableCell align="center">Thao tác</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow
                                key={row.IDDonHang}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.MaDonHang}
                                </StyledTableCell>
                                <StyledTableCell>{row.TenKhachHang}</StyledTableCell>
                                <StyledTableCell align="center">{row.NgayTaoConvert}</StyledTableCell>
                                <StyledTableCell align="center">{row.DiaChiKH}</StyledTableCell>
                                <StyledTableCell align="center">{row.NgayHenConvert}</StyledTableCell>
                                {
                                    showTinhTrangXuLy(row.TinhTrangXuLy, row.Note)
                                }
                                <StyledTableCell align="center">
                                    <ButtonGroup>
                                        <ReceivedOrderDetailModal orderInfo={row} />
                                        {/* <OrderAcceptModal
                                            idDonHang={row.IDDonHang}
                                            reRenderMain={reRender}
                                        /> */}
                                        {
                                            row.TinhTrangXuLy !== 'Đã bị huỷ'
                                                ? <ReceivedOrderDeleteModal
                                                    idDonHang={row.IDDonHang}
                                                    idNhanVien={idNhanVien}
                                                    reRenderMain={reRender}
                                                />
                                                : <IconButton onClick={() => handleRecovery(row.IDDonHang)}>
                                                    <Tooltip sx={{ color: 'var(--color2)' }} title="Phục hồi">
                                                        <RestartAltIcon />
                                                    </Tooltip>
                                                </IconButton>
                                        }
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

