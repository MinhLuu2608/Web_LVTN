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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setMessage, setOpenSnackBar, setSeverity } from '../SnackBar/SnackBarAction';
import ServiceAddModal from './ServiceAddModal';
import ServiceFilter from './ServiceFilter';
import ServiceEditModal from './ServiceEditModal';

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


export default function ServiceMain() {

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

    const [rows, setRows] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [updateState, setUpdateState] = React.useState(true)
    const [searchLoaiDichVu, setSearchLoaiDichVu] = React.useState(-1)
    const [searchTinhTrangDichVu, setSearchTinhTrangDichVu] = React.useState(1)

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    };

    const handleChangeSearchLoaiDichVu = (value) => {
        setSearchLoaiDichVu(value)
    }
    const handleChangeSearchTinhTrangDV = (value) => {
        setSearchTinhTrangDichVu(value)
    }

    const reRender = () => setUpdateState(!updateState);

    const handleDelete = (id) => {
        if (window.confirm('B???n c?? ch???c ch???n mu???n ng???ng cung c???p d???ch v??? n??y? N???u d???ch v??? ch??a c?? ????n h??ng s??? b??? xo?? v??nh vi???n?')) {
            fetch("http://localhost:5199/api/dichvu/" + id + "/0", {
                method: 'PUT',
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

    const handleRecovery = (id) => {
        if (window.confirm('B???n c?? ch???c ch???n mu???n ph???c h???i d???ch v??? n??y?')) {
            fetch("http://localhost:5199/api/dichvu/" + id + "/1", {
                method: 'PUT',
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

    React.useEffect(() => {
        fetch("http://localhost:5199/api/dichvu/" + searchLoaiDichVu + "/" + searchTinhTrangDichVu)
            .then(response => response.json())
            .then(function (dichVu) {
                setRows(dichVu);
            },
                (error) => {
                    dispatch(setOpenSnackBar());
                    dispatch(setMessage("Failed"));
                    dispatch(setSeverity("error"));
                });
    }, [updateState, searchLoaiDichVu, searchTinhTrangDichVu, dispatch])

    return (
        <>
            <Typography variant="p" sx={{ fontSize: 30, color: "var(--color2)", fontWeight: "bold" }}>
                Qu???n l?? d???ch v???
            </Typography>
            <ServiceAddModal reRenderServiceMain={reRender} />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <ServiceFilter
                    searchLoaiDichVu={searchLoaiDichVu}
                    searchTinhTrangDV={searchTinhTrangDichVu}
                    changeLoaiDichVu={handleChangeSearchLoaiDichVu}
                    changeTinhTrangDV={handleChangeSearchTinhTrangDV}
                />
            </Stack>
            <TableContainer style={{ marginTop: 20 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>M?? d???ch v???</StyledTableCell>
                            <StyledTableCell>Lo???i d???ch v???</StyledTableCell>
                            <StyledTableCell>T??n D???ch v???</StyledTableCell>
                            <StyledTableCell width={300}>M?? t???</StyledTableCell>
                            <StyledTableCell align="center">????n v??? t??nh</StyledTableCell>
                            <StyledTableCell align="center">????n gi??</StyledTableCell>
                            <StyledTableCell align="center">T??nh tr???ng</StyledTableCell>
                            <StyledTableCell align="center">Thao t??c</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <StyledTableRow
                                key={row.IDDichVu}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell>{row.MaDichVu}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">{row.LoaiDichVu}</StyledTableCell>
                                <StyledTableCell>{row.TenDichVu}</StyledTableCell>
                                <StyledTableCell>{row.MoTaDV}</StyledTableCell>
                                <StyledTableCell align="center">{row.DonViTinh}</StyledTableCell>
                                <StyledTableCell align="center">{row.DonGiaDV}</StyledTableCell>
                                {
                                    row.TinhTrangDV === 1
                                        ?
                                        <StyledTableCell align="center" sx={{ color: "var(--color2)" }}>C??n ho???t ?????ng</StyledTableCell>
                                        :
                                        <StyledTableCell align="center" sx={{ color: "var(--color9)" }}>Ng???ng ho???t ?????ng</StyledTableCell>
                                }
                                <StyledTableCell align="center">
                                    <ButtonGroup>
                                        <ServiceEditModal
                                            idDichVu={row.IDDichVu}
                                            donGia={row.DonGiaDV}
                                            moTa={row.MoTaDV}
                                            reRenderServiceMain={reRender}
                                        />
                                        {
                                            row.TinhTrangDV === 1
                                                ?
                                                <IconButton onClick={() => handleDelete(row.IDDichVu)}>
                                                    <Tooltip sx={{ color: 'var(--color9)' }} title="Xo??">
                                                        <DeleteIcon />
                                                    </Tooltip>
                                                </IconButton>
                                                :
                                                <IconButton onClick={() => handleRecovery(row.IDDichVu)}>
                                                    <Tooltip sx={{ color: 'var(--color2)' }} title="Ph???c h???i">
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

