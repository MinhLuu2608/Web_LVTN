import React from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import {Box} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DistrictFormAdd from './DistrictFormAdd';
import WardFormAdd from './WardFormAdd';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import WardFormDelete from './WardFormDelete';
import DistrictFormDelete from './DistrictFormDelete';

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

const style = {
    display: 'flex',
    width: 'auto',
    marginLeft: 2,
    color: 'black',
    alignItems: "center",
    justifyContent: "center"
};

const actionAreaStyle = {
    display: 'flex',
    justifyContent: 'space-between'
};

function DistrictAndWard() {

    const [chosenField, setChosenField] = React.useState('xaphuong');

    const showTablePagination = true;

    const [wards, setWards] = React.useState([]);

    const [districts, setDistricts] = React.useState([]);

    const [chosenDistrict, setChosenDistrict] = React.useState(0);

    const [searchDistricts, setSearchDistrict] = React.useState([]);

    const [searchWards, setSearchWards] = React.useState([]);

    const [page, setPage] = React.useState(0);

    const [resetPage, setResetPage] = React.useState(true)

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [searchInput, setSearchInput] = React.useState('');

    const handleResetPage = function () {
        setResetPage(!resetPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleShowTablePagination = function () {
        if (chosenField === "xaphuong") {
            if (searchInput !== "" || chosenDistrict !== 0) {
                if (showTablePagination)
                    return (
                        <TablePagination
                            rowsPerPageOptions={[10, 20, { value: -1, label: 'Tất Cả' }]}
                            component="div"
                            count={searchWards.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    );
            } else {
                if (showTablePagination)
                    return (
                        <TablePagination
                            rowsPerPageOptions={[10, 20, { value: -1, label: 'Tất Cả' }]}
                            component="div"
                            count={wards.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    );
            }
        } else {
            if (chosenDistrict !== 0 || searchInput !== "") {
                if (showTablePagination)
                    return (
                        <TablePagination
                            rowsPerPageOptions={[10, 20, { value: -1, label: 'Tất Cả' }]}
                            component="div"
                            count={searchDistricts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    );
            } else {
                if (showTablePagination)
                    return (
                        <TablePagination
                            rowsPerPageOptions={[10, 20, { value: -1, label: 'Tất Cả' }]}
                            component="div"
                            count={districts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    );
            }
        }
    }

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/QuanHuyen`)
            .then(res => {
                const districts = res.data;
                setDistricts(districts);
            })
    }, [resetPage])

    React.useEffect(() => {
        axios.get(`http://localhost:5199/api/XaPhuong/`)
            .then(res => {
                const wards = res.data;
                setWards(wards);
            })
    }, [resetPage])

    React.useEffect(() => {
        handleChosenWards(wards)
        handleChosenDistricts(districts)
    },[searchInput,chosenDistrict])

    const handleChangeChosenField = (event, newField) => {
        if (newField !== null) {
            setChosenField(newField);
        }
    };

    function removeAccents(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
        setPage(0);
        setRowsPerPage(-1);
    }

    const handleChangeDistrict = (event) => {
        setPage(0);
        setChosenDistrict(event.target.value);
        setRowsPerPage(-1);
    };

    //Hàm Lọc Xã Phường Theo Điều Kiện
    const handleChosenWards = function (Wards) {
        var handledSearchInput = removeAccents(searchInput.toLowerCase())
        var filteredWards = Wards.filter(function (Ward) {
            //Tìm kiếm thao trường
            if (removeAccents(Ward.TenXaPhuong.toLowerCase()).includes(handledSearchInput)) {
                if (chosenDistrict !== 0) {
                    return (
                        Ward.IDQuanHuyen === chosenDistrict
                    )
                } else {
                    return (
                        true
                    )
                }
            }
        })
        setSearchWards(filteredWards)
    }

    //Hàm Lọc Quận Huyện Theo Điều Kiện
    const handleChosenDistricts = function (Districts) {
        var handledSearchInput = removeAccents(searchInput.toLowerCase())
        var filteredDistricts = Districts.filter(function (District) {
            //Tìm kiếm thao trường
            if (removeAccents(District.TenQuanHuyen.toLowerCase()).includes(handledSearchInput)) {
                return (true)
            }
        })
        setSearchDistrict(filteredDistricts)
    }

    const showDistrictsAndWards = function (Rows) {
        var ObjectPerPage
        if (rowsPerPage === -1) {
            ObjectPerPage = Rows.length
        } else {
            ObjectPerPage = rowsPerPage
        }

        if (chosenField === "xaphuong") {
            if (Rows.length > 0) {
                return (
                    Rows
                        .slice(page * ObjectPerPage, page * ObjectPerPage + ObjectPerPage)
                        .map((row) => (
                            <StyledTableRow
                                key={row.IDXaPhuong}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">{row.IDXaPhuong}
                                </StyledTableCell>
                                <StyledTableCell>{row.TenXaPhuong}</StyledTableCell>
                                <StyledTableCell>{row.TenQuanHuyen}</StyledTableCell>
                                <StyledTableCell>
                                    <WardFormDelete ward={row} handleResetPage={handleResetPage} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                );
            } else {
                return (
                    <TableRow>
                        <StyledTableCell align='center' colSpan={8} width={5}>Không tìm thấy kết quả tương ứng</StyledTableCell>
                    </TableRow>
                )
            }
        } else {
            if (Rows.length > 0) {
                return (
                    Rows
                        .slice(page * ObjectPerPage, page * ObjectPerPage + ObjectPerPage)
                        .map((row) => (
                            <StyledTableRow
                                key={row.IDQuanHuyen}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">{row.IDQuanHuyen}
                                </StyledTableCell>
                                <StyledTableCell>{row.TenQuanHuyen}</StyledTableCell>
                                <StyledTableCell>
                                    <DistrictFormDelete district={row} handleResetPage={handleResetPage} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                );
            } else {
                return (
                    <TableRow>
                        <StyledTableCell align='center' colSpan={8} width={5}>Không tìm thấy kết quả tương ứng</StyledTableCell>
                    </TableRow>
                )
            }
        }
    }

    const showDistricts = function () {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead color="black">
                        <TableRow>
                            <StyledTableCell style={{ width: '30%' }}>Mã Quận Huyện</StyledTableCell>
                            <StyledTableCell style={{ width: '60%' }}>Tên Quận Huyện</StyledTableCell>
                            <StyledTableCell style={{ width: '10%' }}>Thao Tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchInput !== "" ?
                            showDistrictsAndWards(searchDistricts)
                            :
                            showDistrictsAndWards(districts)
                        }
                    </TableBody>
                </Table>
                {handleShowTablePagination()}
            </TableContainer>
        )
    }

    const showWards = function () {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead color="black">
                        <TableRow>
                            <StyledTableCell style={{ width: '10%' }}>Mã Quận Huyện</StyledTableCell>
                            <StyledTableCell style={{ width: '30%' }}>Tên Xã Phường</StyledTableCell>
                            <StyledTableCell style={{ width: '50%' }}>Tên Quận Huyện</StyledTableCell>
                            <StyledTableCell style={{ width: '10%' }}>Thao Tác</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchInput !== "" || chosenDistrict !== 0 ?
                            showDistrictsAndWards(searchWards)
                            :
                            showDistrictsAndWards(wards)
                        }
                    </TableBody>
                </Table>
                {handleShowTablePagination()}
            </TableContainer>
        )
    }
    
    const showSearchWards = function () {
        return (
            <Box sx={style}>
                {/* Truong tim kiem */}
                <FormControl sx={{ m: 1, width: '60ch' }}>
                    <InputLabel htmlFor="outlined-adornment-search">Tìm Kiếm</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type="text"
                        onChange={handleChangeSearchInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="button search"
                                    edge="end"                                                        >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label=" Tìm Kiếm "
                    />
                </FormControl>
                {/* combobox Quan Huyen */}
                <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="select-district"
                        value={chosenDistrict}
                        onChange={handleChangeDistrict}
                    >
                        <MenuItem value={0} key={0}>
                            Chọn Quận Huyện
                        </MenuItem>
                        {districts
                            .map((district) => (
                                <MenuItem value={district.IDQuanHuyen} key={district.IDQuanHuyen}>
                                    {district.TenQuanHuyen}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Box>
        )
    }

    const showSearchDistricts = function () {
        return (
            <Box sx={style}>
                {/* Truong tim kiem */}
                <FormControl sx={{ m: 1, width: '60ch' }}>
                    <InputLabel htmlFor="outlined-adornment-search">Tìm Kiếm</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type="text"
                        onChange={handleChangeSearchInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="button search"
                                    edge="end"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label=" Tìm Kiếm "
                    />
                </FormControl>
            </Box>
        )
    }

    return (
        <div>
            <Typography variant="p"
                sx={
                    {
                        fontSize: 30,
                        color: "var(--color2)",
                        fontWeight: "bold",
                    }
                }
            >
                Quản Lý Tỉnh Thành
            </Typography>
            <Stack direction="row" spacing={2} justifyContent='center' marginBottom={1}>
                {chosenField === "xaphuong" ?
                    showSearchWards()
                    :
                    showSearchDistricts()
                }
            </Stack>
            <Divider sx={{ marginBottom: 3 }}></Divider>
            <Box sx={actionAreaStyle}>
                {/* Toggle CustomerType */}
                <ToggleButtonGroup
                    exclusive
                    aria-label="CustomerType"
                    value={chosenField}
                    onChange={handleChangeChosenField}
                >
                    <ToggleButton
                        color='primary'
                        value='xaphuong'
                        aria-label='xaphuong'
                        key='xaphuong'
                        sx={{
                            border: 0,
                            fontWeight: "bold",
                            borderRadius: 2,
                            backgroundColor: "var(--color1)",
                        }}
                    >
                        Xã Phường
                    </ToggleButton>
                    <ToggleButton
                        color='primary'
                        value='quanhuyen'
                        aria-label='quanhuyen'
                        key='quanhuyen'
                        sx={{
                            border: 0,
                            fontWeight: "bold",
                            borderRadius: 2,
                            backgroundColor: "var(--color1)",
                        }}
                    >
                        Quận Huyện
                    </ToggleButton>
                </ToggleButtonGroup>
                <Stack direction="row" spacing={2} alignItems="flex-end" marginBottom={1}>
                    {chosenField === "xaphuong" ?
                        <WardFormAdd handleResetPage={handleResetPage} districts={districts} />
                        :
                        <DistrictFormAdd handleResetPage={handleResetPage} />
                    }
                </Stack>
            </Box>
            {chosenField === "xaphuong" ?
                showWards()
                :
                showDistricts()
            }
        </div>
    )
}

export default DistrictAndWard