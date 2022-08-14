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
import KyThuEditModal from './KyThuEditModal';
import KyThuAddModal from './KyThuAddModal';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import KyThuFilter from './KyThuFilter';
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
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';

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


export default function KyThuMain() {

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

    const [ , dispatch] = React.useContext(SnackBarContext)

    const [rows, setRows] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [updateState, setUpdateState] = React.useState(true)
    const [yearsList, setYearsList] = React.useState([])
    const [searchMonth, setSearchMonth] = React.useState(-1)
    const [searchYear, setSearchYear] = React.useState(-1)

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
        if (window.confirm('Xoá kỳ thu sẽ xoá theo các phiếu thu của kỳ thu tương ứng. Bạn có chắc chắn muốn xoá ?')) {
            fetch("http://localhost:5199/api/kythu/" + id, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    reRender()
                    dispatch(setOpenSnackBar())
                    dispatch(setMessage(result.message))
                    dispatch(setSeverity(result.severity))
                });
            
        }
    }

    const handleChangeMonth = (month) => {
        setSearchMonth(month)
        setPage(0)
    };

    const handleChangeYear = (year) => {
        setSearchYear(year)
        setPage(0)
    };

    React.useEffect(() => {
        fetch("http://localhost:5199/api/kythu/" + searchMonth + "/" + searchYear)
            .then(response => response.json())
            .then(function (kyThu) {
                setRows(kyThu);
            },
                (error) => {
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage("Failed"));
                    dispatch(setSeverity("error"));
                });
    }, [updateState, searchMonth, searchYear, dispatch])

    React.useEffect(() => {
        fetch("http://localhost:5199/api/kythu/years")
            .then(response => response.json())
            .then(function (years) {
                setYearsList(years);
                setSearchYear(-1);
            })
    }, [updateState])

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
                Quản lý kỳ thu
            </Typography>
            <KyThuAddModal reRenderKyThuMain={reRender} />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <KyThuFilter
                    month={searchMonth}
                    year={searchYear}
                    years={yearsList}
                    changeMonth={handleChangeMonth}
                    changeYear={handleChangeYear}
                />
            </Stack>
            <TableContainer style={{ marginTop: 20 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Tên Kỳ thu</StyledTableCell>
                            <StyledTableCell align="center">Tháng</StyledTableCell>
                            <StyledTableCell align="center">Năm</StyledTableCell>
                            <StyledTableCell align="center">Ngày Tạo</StyledTableCell>
                            <StyledTableCell align="center">Thao tác</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow
                                key={row.IDKyThu}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.TenKyThu}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.Thang}</StyledTableCell>
                                <StyledTableCell align="center">{row.Nam}</StyledTableCell>
                                <StyledTableCell align="center">{row.NgayTao}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup>
                                        <KyThuEditModal idKyThu={row.IDKyThu} thang={row.Thang} nam={row.Nam} reRenderKyThuMain={reRender} />
                                        <IconButton onClick={() => handleDelete(row.IDKyThu)}>
                                            <Tooltip sx={{ color: 'var(--color9)' }} title="Xoá">
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

