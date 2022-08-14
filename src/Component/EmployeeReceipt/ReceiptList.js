import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ReceiptDetailModal from './ReceiptDetailModal';
import '../../CSS/App.css';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { GetCookie, cookie } from '../Cookie/CookieFunc';
import Stack from '@mui/material/Stack';
import ExportReceiptReport from './ExportReceiptReport';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
function ReceiptList() {
  //style
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1b98e0",
      color: theme.palette.common.white,
      fontWeight: "bold"
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


  //state
  const [rows, setRows] = React.useState([]);//state PhieuThu
  const [updateState, setUpdateState] = React.useState(true); //state reRender
  // const [quanhuyen, setQuanHuyen] = React.useState([]);
  const [xaphuong, setXaPhuong] = React.useState([]);
  const [tuyenthu, setTuyenThu] = React.useState([]);
  const [loaikhachhang, setLoaiKhachHang] = React.useState([]);
  const [searchField, setSearchField] = React.useState(0);// state search
  const [chosenQuanHuyen, setChosenQuanHuyen] = React.useState(0);// state QuanHuyen
  const [chosenXaPhuong, setChosenXaPhuong] = React.useState(0);// state XaPhuong
  const [chosenTuyenThu, setChosenTuyenThu] = React.useState(0);// state TuyenThu
  const [chosenTrangThai, setChosenTrangThai] = React.useState(0);// state TuyenThu
  const [chosenTenKhachHang, setChosenTenKhachHang] = React.useState('');// state TenKhachHang
  const [chosenLoaiKhachHang, setChosenLoaiKhachHang] = React.useState(0);// state TuyenThu
  const [changeshow, setChangeShow] = React.useState([]); // state Change
  GetCookie(document.cookie)
  // change status
  function change(date) {
    if (!date) {
      return 'Chưa thu';
    } else {
      return 'Đã thu';
    }
  };
  // hidden button status
  const hiddenButtonStatus = (date) => {
    if (!date) {
      return 'Xác nhận';
    }
      return 'Đã xác nhận';
  };  
  //get PhieuThu
  React.useEffect(() => {
    fetch("http://localhost:5199/api/PhieuThu/nhanvien/" + cookie)
      .then(response => response.json())
      .then(function (PhieuThu) {
        setRows(PhieuThu);
      },
        (error) => {
          alert('Failed');
        })
  }, [updateState]);
  //get XaPhuong
    React.useEffect(() => {
    fetch("http://localhost:5199/api/PhieuThu/getbyidemp/" + cookie)
      .then(response => response.json())
      .then(function (xaphuong) {
        setXaPhuong(xaphuong);   
        console.log('xp',xaphuong);
      },
          
        (error) => {
          alert('Failed');
        })
    }, [updateState]);
  //getTuyenThu
      React.useEffect(() => {
      fetch("http://localhost:5199/api/PhieuThu/tuyenthu/" + cookie)
      .then(response => response.json())
      .then(function (tuyenthu) {
        setTuyenThu(tuyenthu);   
      },
        (error) => {
          alert('Failed');
        })
      }, [updateState]);
  //getLoaiKhachHang
      React.useEffect(() => {
        fetch("http://localhost:5199/api/PhieuThu/loaikhachhang")
        .then(response => response.json())
        .then(function (loaikhachhang) {
          setLoaiKhachHang(loaikhachhang);   
        },
            
          (error) => {
            alert('Failed');
          })
      }, [updateState]);
//hadle delete
const reRender = () => setUpdateState(!updateState);
const handleDelete = (id) => {
  if (window.confirm('Bạn có chắc chắn muốn xoá phiếu thu này ?')) {
      fetch("http://localhost:5199/api/PhieuThu/" + id, {
          method: 'DELETE',
          header: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
          .then(res => res.json())
          .then((result) => {
              alert(result);
          });
          console.log('delete');
          reRender();
    
  }
}
  //setState DiaChi
    // handle QuanHuyen
  const handleQuanHuyen = (event) => {
    setChosenQuanHuyen(event.target.value);
                setPage(0);
        setRowsPerPage(-1);
  }
  React.useEffect(() => {
    QuanHuyen(rows);
  }, [chosenQuanHuyen]);
  
  const QuanHuyen = (quanhuyen) => {
    const b = rows.filter((row) => {
      if (chosenQuanHuyen === "") {
        return row;
      }
      else if (row.IDQuanHuyen === chosenQuanHuyen) {
        return row;
      }
    })
    console.log('sadasd', b);
    setChangeShow(b);
  }
  // handle XaPhuong
    const handleXaPhuong = (event) => {
      setChosenXaPhuong(event.target.value);
                  setPage(0);
        setRowsPerPage(-1);
    }
  
    React.useEffect(() => {
      XaPhuong(rows);

    }, [chosenXaPhuong]);  
    const XaPhuong = (xaphuong) => {
      const c = rows.filter((row) => {
        if (chosenXaPhuong === 0 && row.IDQuanHuyen === chosenQuanHuyen ) {
          return row;
        }
        else if (chosenXaPhuong === 0 && chosenQuanHuyen === 0) {
          return row;
        }
        else if (row.IDXaPhuong === chosenXaPhuong) {
          return row;
        }
      })
      setChangeShow(c);
    }
    //handle TuyenThu
    const handleTuyenThu = (event) => {
      setChosenTuyenThu(event.target.value);
                  setPage(0);
        setRowsPerPage(-1);
    }
  
    React.useEffect(() => {
      TuyenThu(rows);
    }, [chosenTuyenThu]);  
  
    const TuyenThu = (tuyenthu) => {
      const d = rows.filter((row) => {
        if (chosenTuyenThu === "") {
          return row;
        }
        else if (row.IDTuyenThu === chosenTuyenThu) {
          console.log('tuyen thu',row);
          return row;
        }
      })
      setChangeShow(d);
    }
  //handle TrangThai
  const handleTrangThai = (event) => {
    setChosenTrangThai(event.target.value);
    console.log('tt', event.target.value);
                setPage(0);
        setRowsPerPage(-1);
  }
  React.useEffect(() => {
    TrangThai(rows);
  }, [chosenTrangThai]);  
  const TrangThai = (trangthai) => {
    const d = rows.filter((row) => {
      if (row.NgayThu != null && chosenTrangThai === 1) {
          console.log(row);
          return row;
      } else if (row.NgayThu === null && chosenTrangThai === 2) {
          console.log(row);
          return row;
      }
      else if (chosenTrangThai === 0) {
        console.log(row);
        return row;
      }
    })
    setChangeShow(d);
  }
  //handle LoaiKhachHang
    //handleTrangThai
  const handleLoaiKhachHang = (event) => {
    console.log('value', event.target.value);
    setChosenLoaiKhachHang(event.target.value);
                setPage(0);
        setRowsPerPage(-1);
  }

  React.useEffect(() => {
    LoaiKhachHang(rows);
  }, [chosenLoaiKhachHang]);  

  const LoaiKhachHang = (loaikhachhang) => {
    const i = rows.filter((row) => {
      if (row.IDLoaiKhachHang === chosenLoaiKhachHang) {
        console.log('loai', row);
        return row;
      }
    })
    setChangeShow(i);
  }
  //update trangthai
 const getFormattedDate = (date) => {
            var year = date.getFullYear();
        
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
        
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return day + '-' + month + '-' + year;
    }
  // Button XacNhan
  const XacNhan = (IDKhachHang,IDPhieu,NgayTao,MauSoPhieu,IDNhanVien) => {
    console.log('idPhieu', IDPhieu);
    console.log('idNhanVien', IDNhanVien);
    console.log('idKH', IDKhachHang);
    fetch("http://localhost:5199/api/PhieuThu", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        IDKhachHang: IDKhachHang,
        IDPhieu: IDPhieu,
        NgayTao: NgayTao,
        MauSoPhieu: MauSoPhieu,
        IDNhanVien: IDNhanVien,
      })
    })
      .then(res => res.json())
      .then((result) => {
        alert(result);
      });
      console.log('update');
      reRender();
  }
  //show phieu thu
  const showPhieuThu = function (Phieu) {
        var PhieusPerPage
        if (rowsPerPage === -1) {
          PhieusPerPage = Phieu.length;
        } else {
          PhieusPerPage = rowsPerPage;
        }
    if (Phieu.length > 0) {
      return (
        Phieu
          .slice(page * PhieusPerPage, page * PhieusPerPage + PhieusPerPage)
          .map((row) => (
            <StyledTableRow key={row.IDPhieu}>
              <StyledTableCell component="th" scope="row">
                {row.MaSoPhieu}
              </StyledTableCell>
              <StyledTableCell align="left">{row.MaKhachHang}</StyledTableCell>
              <StyledTableCell align="left">{row.HoTenKH}</StyledTableCell>
              <StyledTableCell align="left">{row.TenLoai}</StyledTableCell>
              {
                change(row.NgayThu) === 'Đã thu' ?
                  <StyledTableCell id="tt" align="left" sx={{ color: "var(--color7)" }}>{change(row.NgayThu)}</StyledTableCell>
                  :
                  <StyledTableCell id="tt" align="left" sx={{ color: "var(--color9)" }}>{change(row.NgayThu)}</StyledTableCell>
              }
              <StyledTableCell id="tt" align="left">{row.TenKyThu}</StyledTableCell>
              {/* function */}
              <StyledTableCell align="left" padding='none'>
                {
                  hiddenButtonStatus(row.NgayThu) === "Xác nhận" ?
                    <Button
                      sx={{
                        width: 25 , height: 40, fontSize: 11, display: "flex", justifyContent: "flex-end",
                        color: "var(--color1)", backgroundColor: "var(--color3)",
                            ':hover': {
                                backgroundColor: 'var(--color1)',
                                color: 'var(--color3)',
                            }
                      }}
                      variant="outline"
                      onClick={() => XacNhan(row.IDKhachHang, row.IDPhieu ,row.NgayTao, row.MauSoPhieu, cookie)}
                      disabled={row.NgayThu}
                    >
                      {hiddenButtonStatus(row.NgayThu)}
                    </Button> 
                    :
                    <Stack direction="row" spacing={0} alignItems="flex-end" marginLeft={1} marginBottom={2} marginTop={2}>
                      {
                        <ExportReceiptReport receipt={row}/>
                      }
                    </Stack>
                }
              </StyledTableCell>
              <StyledTableCell align="left" padding='none'> 
                <ButtonGroup variant="" aria-label="button group"> 
                  <ReceiptDetailModal receipt={row}/>
                </ButtonGroup>  
              </StyledTableCell>
              <StyledTableCell align="left" padding='none'>
              </StyledTableCell>
              <StyledTableCell align="left" padding='none'>
              </StyledTableCell>
              <StyledTableCell align="left" padding='none'>
                </StyledTableCell>
            </StyledTableRow>
          ))
      )
    }else {
            return (
                <TableRow>
                    <StyledTableCell align='center' colSpan={8} width={5}>Không tìm thấy kết quả tương ứng</StyledTableCell>
                </TableRow>
            )
        }

  }
  //show XaPhuong 
  function showXaPhuong(xaphuong) {
    if (xaphuong.IDQuanHuyen === chosenQuanHuyen) {
      return (
            <MenuItem value={xaphuong.IDXaPhuong} key={xaphuong.IDXaPhuong}>
              {xaphuong.TenXaPhuong}
            </MenuItem>
          )
    } else if (chosenQuanHuyen === 0) {
      return (
            <MenuItem value={xaphuong.IDXaPhuong} key={xaphuong.IDXaPhuong}>
              {xaphuong.TenXaPhuong}
            </MenuItem>
          )
    }
  }
  //showTuyenThu
  function showTuyenThu(tuyenthu) {
      return (
            <MenuItem value={tuyenthu.IDTuyenThu} key={tuyenthu.IDTuyenThu}>
              {tuyenthu.TenTuyenThu}
            </MenuItem>
          )
  }
  //showLoaiKhachHang
  function showLoaiKhachHang(loaikhachhang) {
    return (
            <MenuItem value={loaikhachhang.IDLoaiKhachHang} key={loaikhachhang.IDLoaiKhachHang}>
              {loaikhachhang.TenLoai}
            </MenuItem>
          )
  }
  //handle search
  const handleSearch = (event) => {
    setSearchField(event.target.value);
    setChosenLoaiKhachHang(0);
    setChosenQuanHuyen(0);
    setChosenTenKhachHang('');
    setChosenTrangThai(0);
    setChosenTuyenThu(0);
    setChosenXaPhuong(0);
  }
  //handleSearchInput
  const handleChangeSearchInputKH = (event) => {
    setChosenTenKhachHang(event.target.value);
                setPage(0);
        setRowsPerPage(-1);
    console.log(event.target.value);
  }
  React.useEffect(() => {
    TenKhachHang(rows);
  }, [chosenTenKhachHang]);  

  const TenKhachHang = (tenkhachhang) => {
    const f = rows.filter((row) => {
      if (row.HoTenKH.toLowerCase().includes(chosenTenKhachHang.toLowerCase())) {
          return row;
      }
    })
    setChangeShow(f);
  }
  //show filter DiaChi
  function showfilterXaPhuong() {
    if (searchField === 1) {
      return (
       <FormControl sx={{ m: 1, minWidth: 300}}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district2"
          value={chosenXaPhuong}
          onChange={handleXaPhuong}
        >
            <MenuItem value={0} key={0}>
             Chọn Xã Phường
            </MenuItem>
          {xaphuong
            .map((xaphuong) => (
               showXaPhuong(xaphuong)
            ))
          }
        </Select>
      </FormControl>
      )
    }

    
  }
  //show filter TuyenThu
  function showfilterTuyenThu() {
    if (searchField === 2) {
      return (
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district3"
          value={chosenTuyenThu}
          onChange={handleTuyenThu}
        >
          <MenuItem value={0} key={0}>
            Chọn tuyến thu
          </MenuItem>
          {tuyenthu
            .map((tuyenthu) => (
              showTuyenThu(tuyenthu)
            ))
          }
        </Select>
      </FormControl>
    );
    }
    
  }
  //show filter TrangThai
  function showfilterTrangThai() {
    if (searchField === 3) {
      return (
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district3"
          value={chosenTrangThai}
          onChange={handleTrangThai}
        >
          <MenuItem value={0}>Trạng thái</MenuItem>
          <MenuItem value={1}>Đã thu</MenuItem>
          <MenuItem value={2}>Chưa thu</MenuItem>
        </Select>
      </FormControl>
      )
    }
    
  }
  //show filter TenKhachHang
    function showfilterTenKhachHang() {
    if (searchField === 4) {
      return (
        <FormControl sx={{ m: 1, minWidth: 300 }}>
           <InputLabel htmlFor="outlined-adornment-search">Tên khách hàng</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type="text"
                        onChange={handleChangeSearchInputKH}
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
      )
    }
    
  }
  //show filter LoaiKhachHang
  function showfilterLoaiKhachHang() {
    if (searchField === 5) {
      return (
        <FormControl sx={{ m: 1, minWidth: 300 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="select-district3"
          value={chosenLoaiKhachHang}
          onChange={handleLoaiKhachHang}
        >
          <MenuItem value={0} key={0}>
            Chọn Loại Khách Hàng
          </MenuItem>
          {loaikhachhang
            .map((loaikhachhang) => (
              showLoaiKhachHang(loaikhachhang)
            ))
          }
        </Select>
      </FormControl>
      )
    }
    
  }

    //page
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showTablePagination, setShowTablePagination] = React.useState(true);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleShowTablePagination = function () {
        if (chosenQuanHuyen === 0 && chosenXaPhuong === 0 && chosenLoaiKhachHang === 0 && chosenTuyenThu === 0 && chosenTrangThai ===0 && chosenTenKhachHang === '') {
            if (showTablePagination)
                return (
                    <TablePagination
                        rowsPerPageOptions={[10, 50, { value: -1, label: 'Tất Cả' }]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                );
        } else {
            return (
                <TablePagination
                    rowsPerPageOptions={[10, 50, { value: -1, label: 'Tất Cả' }]}
                    component="div"
                    count={changeshow.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            );
        }
    }
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 170,textAlign:'center' }}>
          <Select
            labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={searchField}
          onChange={handleSearch}
        >
            <MenuItem value={0}>---Lọc---</MenuItem>
            <MenuItem value={1}>Địa chỉ</MenuItem>
            <MenuItem value={2}>Tuyến Thu</MenuItem>
            <MenuItem value={3}>Trạng Thái</MenuItem>
            <MenuItem value={4}>Tên Khách Hàng</MenuItem>
            <MenuItem value={5}>Loại Khách Hàng</MenuItem>
          </Select>
      </FormControl>
      {/* QuanHuyen */}
        {/* {showfilterQuanHuyen()} */}
      {/* Xa Phuong */}
        {showfilterXaPhuong()}
      {/* Tuyen Thu */}
        {showfilterTuyenThu()}
      {/* TT */}
        {showfilterTrangThai()}
      {/* Ten Khach Hang */}
        {showfilterTenKhachHang()}
      {/* Loai Khach Hang */}
        {showfilterLoaiKhachHang()}
      <br></br>
      <hr></hr>
      <br></br>
      {/* list */}
      <div><h2>Danh sách phiếu thu</h2></div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Mã Phiếu thu</StyledTableCell>
            <StyledTableCell align="left">Mã khách hàng</StyledTableCell>
            <StyledTableCell align="left">Tên khách hàng</StyledTableCell>
            <StyledTableCell align="left">Loại khách hàng</StyledTableCell>
            <StyledTableCell align="left">Trạng thái</StyledTableCell>
            <StyledTableCell align="left">Tên kỳ thu</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
             <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            chosenQuanHuyen !== 0 || chosenXaPhuong !== 0 || chosenLoaiKhachHang !== 0 || chosenTuyenThu !== 0 || chosenTrangThai !==0 ||chosenTenKhachHang !== ''? 
              showPhieuThu(changeshow)
              :
              showPhieuThu(rows)
          }
        </TableBody>
          </Table>
        </TableContainer>
      {handleShowTablePagination()}
    </Paper>
    </div>
  )
}

  export default ReceiptList;