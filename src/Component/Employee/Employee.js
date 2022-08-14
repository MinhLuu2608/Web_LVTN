import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { FormControl, FormControlLabel, FormLabel, FormHelperText, FormGroup } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import EmployeeFormView from './EmployeeFormView';
import EmployeeFormEdit from './EmployeeFormEdit';
import EmployeeFormAdd from './EmployeeFormAdd';
import ExportFileExcel from './ExportFileExcel';
import EmployeeFormDelete from './EmployeeFormDelete';

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

export default function Employee() {
    //API input data
    const [employees, setEmployees] = React.useState([]);
    const [empRoles, setEmpRoles] = React.useState([]);
    const [roles, setRoles] = React.useState([]);
   
    const [disabledEmployee, setDisabledEmployee] = React.useState(false);
    /*
    const [handleError, setHandleError] = React.useState({
        emailError: false,
        tennhanvienError: false,
        sdtError: false,
        diachiError: false,
        cccdError: false
    });
    */
    //Search Bar
    /*
    const [searchCategory, setSearchCategory] = React.useState('HoTen');
    const [searchTerm, setSearchTerm] = React.useState('');
    */
    const [searchHandle, setSearchHandle] = React.useState({
        searchCategory: 'HoTen',
        searchTerm: ''
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [resetPage, setResetPage] = React.useState(true);
    
    React.useEffect( () => {
        fetch('http://localhost:5199/api/nhanvien')
            .then(res => res.json())
            .then(data => setEmployees(data))
        fetch('http://localhost:5199/api/phanquyen')
            .then(res => res.json())
            .then(data => setEmpRoles(data))
        fetch('http://localhost:5199/api/quyen')
            .then(res => res.json())
            .then(data => setRoles(data))
    }, [resetPage]);

    const handleResetPage = function () {
        setResetPage(!resetPage)
    }
    const handleSelectionDisabledEmployee = () => {
        setDisabledEmployee(!disabledEmployee)
        handleResetPage()
        setPage(0);
    }

    
    function filterEmpList(){
        const empList = employees.filter((val) => {
            /*
            console.log(val.CCCD);
            console.log('SearchTerm')
            console.log(val.CCCD.toString().includes(searchHandle.searchTerm))
            */
            if (!disabledEmployee){
                if(getIDQuyenByIDNhanVien(val.IDNhanVien, empRoles, roles).length !== 0){
                    if (searchHandle.searchTerm == '') {
                        return val;
                    }else
                    if (searchHandle.searchCategory === 'HoTen' &&  val.HoTen.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                        return val;
                    }else
                    if (searchHandle.searchCategory === 'MaNhanVien' &&  val.MaNhanVien.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                        return val;
                    }else
                    if (searchHandle.searchCategory === 'Email' &&  val.Email.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                        return val;
                    }else
                    if (searchHandle.searchCategory === 'CCCD' &&  val.CCCD.includes(searchHandle.searchTerm)){
                        return val;
                    }
                }
            }else{
                if(getIDQuyenByIDNhanVien(val.IDNhanVien, empRoles, roles).length === 0){
                    if (searchHandle.searchTerm == '') {
                        return val;
                    }else
                    if (searchHandle.searchCategory === 'HoTen' &&  val.HoTen.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                        return val;
                    }else
                    if (searchHandle.searchCategory === 'MaNhanVien' &&  val.MaNhanVien.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                        return val;
                    }else
                    if (searchHandle.searchCategory === 'Email' &&  val.Email.toLowerCase().includes(searchHandle.searchTerm.toLowerCase())){
                        return val;
                    }else
                    if (searchHandle.searchCategory === 'CCCD' &&  val.CCCD.includes(searchHandle.searchTerm)){
                        return val;
                    }
                }
            }
        });
        return empList;
    }
    //console.log(filterEmpList());

    function getIDQuyenByIDNhanVien (idNV, empRoles, roles) {
        let quyenNV;
        let idQuyenNV = [];
        if (empRoles.filter(e => e.IDNhanVien === idNV)) {
            quyenNV = empRoles.filter(e => e.IDNhanVien === idNV).map(empRole => empRole.IDQuyen);
        }

        for(let i=0; i<quyenNV.length; i++) {
            if (roles.filter(e => e.IDQuyen === quyenNV[i])) {
                idQuyenNV[i] = parseInt(roles.filter(e => e.IDQuyen === quyenNV[i]).map(role => role.IDQuyen).toString());
            }
        }
        return idQuyenNV;
    }
    //console.log(getIDQuyenByIDNhanVien(9, empRoles, roles).length)
    function getQuyenByIDNhanVien (idNV, empRoles, roles) {
        let quyenNV;
        let tenQuyenNV = '';
        if (empRoles.filter(e => e.IDNhanVien === idNV)) {
            quyenNV = empRoles.filter(e => e.IDNhanVien === idNV).map(empRole => empRole.IDQuyen);
        }

        tenQuyenNV += roles.filter(e => e.IDQuyen === quyenNV[0]).map(role => role.TenQuyen);
        for(let i=1; i<quyenNV.length; i++) {
            if (roles.filter(e => e.IDQuyen === quyenNV[i])) {
                tenQuyenNV += ' | ';
                tenQuyenNV += roles.filter(e => e.IDQuyen === quyenNV[i]).map(role => role.TenQuyen);
            }
        }
        return tenQuyenNV;
    }
    const [valueCheckNV, setValueCheckNV] = React.useState();
    function checkTuyenThuNV(idNV){
        fetch('http://localhost:5199/api/nhanvien/checktuyenthu/' + idNV)
            .then(response => response.json())
            .then((data) => setValueCheckNV(data))
    }
    //console.log(getIDQuyenByIDNhanVien(11, empRoles, roles))
    //console.log(roles);
    /*
    let x = getIDQuyenByIDNhanVien(1, empRoles, roles);
    console.log(x);
    console.log(x.includes(2));
    */
    return (
        <div>
            <Typography variant="p"
                sx={
                    {
                        fontSize: 30,
                        color: "var(--color2)",
                        fontWeight: "bold"
                    }
                }
            >
                Quản Lý Nhân Viên
            </Typography>
            <Divider sx={{ marginBottom : 3 }}></Divider>
            
            {/* Search Bar */}
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchHandle.searchCategory}
                            label="Danh Mục"
                            onChange={(event) => {
                                setSearchHandle({ ...searchHandle, searchCategory: event.target.value })
                            }}
                        >
                            <MenuItem value={'HoTen'}>Họ Tên</MenuItem>
                            <MenuItem value={'MaNhanVien'}>Mã Nhân Viên</MenuItem>
                            <MenuItem value={'Email'}>Email</MenuItem>
                            <MenuItem value={'CCCD'}>CCCD</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7}>
                    <TextField 
                        id="outlined-search" 
                        label="Tìm kiếm" 
                        type="search" 
                        onChange={(event) => {
                            setSearchHandle({ ...searchHandle, searchTerm: event.target.value })
                        }} 
                        sx={{ width: '70%' }}
                    />
                </Grid>
            </Grid>
            
            {/* Buttons: Xuất Excel, Thêm Nhân Viên */}
            <Stack direction="row-reverse" spacing={2} marginBottom={1}>
                <EmployeeFormAdd employees={employees} handleResetPage={handleResetPage}></EmployeeFormAdd>
                <ExportFileExcel employees={filterEmpList()} getQuyenByIDNhanVien={getQuyenByIDNhanVien} empRolesExcel={empRoles} rolesExcel={roles} handleResetPage={handleResetPage}></ExportFileExcel>
            </Stack>
            
            {/* Table Danh Sách Nhân Viên */}
            <Typography 
                variant="h5" 
                component="h2" 
                color="initial" 
                sx={{ margin : 2 }}
            >
                Danh Sách Nhân Viên <FormControlLabel sx={{paddingLeft: 5}} control={<Checkbox onClick={handleSelectionDisabledEmployee} />} label="Hiển Thị Nhân Viên Không Hoạt Động" />
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell>Mã Nhân Viên</StyledTableCell>
                            <StyledTableCell align="left">Tên Nhân Viên</StyledTableCell>
                            <StyledTableCell align="center">Chức vụ</StyledTableCell>
                            <StyledTableCell align="center">SĐT</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="left">Giới Tính</StyledTableCell>
                            <StyledTableCell align="center">Ngày Sinh</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filterEmpList().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filterEmpList()
                          ).map((employee) => (
                            <StyledTableRow
                                key={employee.IDNhanVien}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {employee.MaNhanVien}
                                </StyledTableCell>
                                <StyledTableCell align="left">{employee.HoTen}</StyledTableCell>
                                <StyledTableCell align="left">{getQuyenByIDNhanVien(employee.IDNhanVien, empRoles, roles)}</StyledTableCell>
                                <StyledTableCell align="center">{employee.SoDienThoai}</StyledTableCell>
                                <StyledTableCell align="left">{employee.Email}</StyledTableCell>
                                <StyledTableCell align="left">{employee.GioiTinh}</StyledTableCell>
                                <StyledTableCell align="right">{new Date(employee.NgaySinh).toLocaleDateString("es-CL")}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup variant="text" color="primary" aria-label="">
                                        <EmployeeFormView employee={employee} empRoles={getQuyenByIDNhanVien(employee.IDNhanVien, empRoles, roles)} ></EmployeeFormView>
                                        <EmployeeFormEdit employee={employee} employeeList={employees} getIDQuyenByIDNhanVien={getIDQuyenByIDNhanVien} empRolesEdit={empRoles} rolesEdit={roles} handleResetPage={handleResetPage}></EmployeeFormEdit>
                                        <EmployeeFormDelete employee={employee} getIDQuyenByIDNhanVien={getIDQuyenByIDNhanVien} empRoles={empRoles} roles={roles} handleResetPage={handleResetPage}></EmployeeFormDelete>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>   
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[10, 15, 30, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={filterEmpList().length}
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
    </div>
    )
}