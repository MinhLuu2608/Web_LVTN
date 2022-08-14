import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
function TurnoverStatistical() {
  
    useEffect(()=> {
        axios.get('http://localhost:5199/api/ThongKe/GetTurnover')
            .then(res=>res.data)
            .then(res=> SetDatatemporary(res))
        axios.get('http://localhost:5199/api/ThongKe/GetQuanHuyen')
          .then(res => res.data)
          .then(res => setQuanHuyen(res));
          axios.get('http://localhost:5199/api/ThongKe/GetNVTHU')
          .then(res => res.data)
          .then(res => setNhanVien(res));
    },[])

   
    
  
    
    
    // useSTate chứa dữ liệu tạm thời để lọc
    const [datatemporary, SetDatatemporary] = useState([{
        HoTen: "",
        IDLoaiKhachHang: 0,
        MaNhanVien: "",
        MaTuyenThu: "",
        NgayTao : "",
        TenQuanHuyen: "",
        TenTuyenThu: "",
        TenXaPhuong: "",
        HoTenKH : "",
    }])
  
    const minday = new Date(datatemporary[0].NgayTao)
    const NgayNhoNhat = getFormattedDate(minday);
    const Today = new Date();
    const NgayMacDinh = getFormattedDate(Today);
 
    const [datasearch, setDatasearch] = useState({
      QuanHuyenNumber: 'noquanhuyen',
      XaPhuongNumber: 'noxaphuong',
      NhanVienNumber : 'nonhanvien',
      NgayBatDau: '',
      NgayKetThuc: NgayMacDinh
    })
    
    function getFormattedDate(date) {
      var year = date.getFullYear();
  
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
  
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
  
      return year + '-' + month + '-' + day;
    }
    // Loại bỏ dấu tiếng việt
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
    var Labelname = '';
    const listlabelname =
      [
        'Nhập tên nhân viên cần tìm ...',
        'Nhập tên tuyến thu cần tìm ...',
        'Nhập tên khách hàng cần tìm ...'
      ]
    const [chooseTypeSearch, setChooseTypeSearch] = useState(0);
    Labelname = listlabelname[chooseTypeSearch];
    const [searchNamestaff, setSearchNamestaff] = useState('');
     
    // các usestate chứa dữ liệu 
    const [QuanHuyen, setQuanHuyen] = React.useState([{
      IDQuanHuyen: 0,
      TenQuanHuyen: ''
    }]);
    const [XaPhuong, setXaPhuong] = React.useState([{
      IDXaPhuong: 0,
      TenXaPhuong: '',
      IDQuanHuyen: 0,
      TenQuanHuyen: ''
    }]);
    const [NhanVien, setNhanVien] = React.useState([{
      HoTen: 0,
      TenNhanVien: '',
    }]);
    var rows = []
    var TongTien  = 0;
    var TongTienLoc = 0;
    const [numberrender , setNumberrender] = useState(true)
    const [renderarray , setRenderarray] = useState([{
      HoTen: "",
      HoTenKH : "",
      IDLoaiKhachHang: 0,
      MaNhanVien: "",
      MaTuyenThu: "",
      NgayTao : "",
      NgayThu : "",
      TenQuanHuyen: "",
      TenTuyenThu: "",
      TenXaPhuong: "",
    }])
    
  
    if(numberrender === true) {
      
      datatemporary.map(element => {
       
        const chuoinhanvien = removeAccents(element.HoTen)
        const chuoituyenthu = removeAccents(element.TenTuyenThu)
        const chuoikhachhang = removeAccents(element.HoTenKH)
        if(element.IDLoaiKhachHang === 1 ) {
          const money = 50000;
          TongTien+= money
        }
        if(element.IDLoaiKhachHang === 2) {
          const money = 100000;
          TongTien+=money
        }
        
        if(searchNamestaff.length !== 0 && chooseTypeSearch ===0 &&  chuoinhanvien.toLocaleLowerCase().includes(searchNamestaff)){
          rows.push(element);
        }
        if(searchNamestaff.length !== 0 && chooseTypeSearch ===1 &&  chuoituyenthu.toLocaleLowerCase().includes(searchNamestaff)){
          rows.push(element);
        }
        if(searchNamestaff.length !== 0 && chooseTypeSearch ===2 &&  chuoikhachhang.toLocaleLowerCase().includes(searchNamestaff)){
          rows.push(element);
        }
        if(searchNamestaff.length === 0) {
          rows.push(element);
        }

      })
    }else{
      
      renderarray.map(element => {
        const chuoinhanvien = removeAccents(element.HoTen)
        const chuoituyenthu = removeAccents(element.TenTuyenThu)
        const chuoikhachhang = removeAccents(element.HoTenKH)
        if(element.IDLoaiKhachHang === 1 ) {   
          TongTien+= 50000
        }
        if(element.IDLoaiKhachHang === 2) {
          TongTien+=100000
        }
        
        if(searchNamestaff.length !== 0 && chooseTypeSearch ===0 &&  chuoinhanvien.toLocaleLowerCase().includes(searchNamestaff)){
          rows.push(element);
        }
        if(searchNamestaff.length !== 0 && chooseTypeSearch ===1 &&  chuoituyenthu.toLocaleLowerCase().includes(searchNamestaff)){
          rows.push(element);
        }
        if(searchNamestaff.length !== 0 && chooseTypeSearch ===2 &&  chuoikhachhang.toLocaleLowerCase().includes(searchNamestaff)){
          rows.push(element);
        }
        if(searchNamestaff.length === 0) {
          rows.push(element);
        }
      })
    }
    
   

    useEffect(()=> {
      
      if(searchNamestaff.length !== 0) {
        TongTien = 0
        if(numberrender === true ) {
          datatemporary.map(element => {
            if(element.IDLoaiKhachHang === 1 ) {
              TongTien+= 50000
            }
            if(element.IDLoaiKhachHang === 2) {
              TongTien+=100000
            }
          })
        }else{
          TongTien = 0
            renderarray.map(element => {           
                if(element.IDLoaiKhachHang === 1 ) {
                
                  TongTien+= 50000
                }
                if(element.IDLoaiKhachHang === 2) {
                
                  TongTien+=100000 
                }
              
            })
        }       
      }
    },[searchNamestaff])

    var ArrayExcel = []
    var Money = 0;
    rows.map(element => {
        
        const getdate = new Date(element.NgayThu)
        const ngaythu = getFormattedDate(getdate);
        let sotien = ''
        let tien = 0
        if(element.IDLoaiKhachHang === 1) {
          tien = 50000
          sotien = 50000
        }
        if(element.IDLoaiKhachHang === 2 ) {
          tien = 100000
          sotien = 100000
        }
        Money+= tien;
      let chosenExportCustomer = {
        "Mã tuyến Thu" : element.MaTuyenThu,
        "Họ tên tuyến thu" : element.TenTuyenThu,
        "Họ tên nhân viên" : element.HoTen,
        "Họ tên khách hàng" : element.HoTenKH,
        "Quận huyện" : element.TenQuanHuyen,
        "Xã phường" : element.TenXaPhuong,
        "Ngày thu" : ngaythu,
        "Giá tiền" : sotien,
      }
      ArrayExcel.push(chosenExportCustomer);
    })
     
      
    const ExportExcel = () => {
      var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(ArrayExcel);
      XLSX.utils.book_append_sheet(wb,ws, "Thống kê tất cả khách hàng");
      XLSX.writeFile(wb,"Myexcel.xlsx")
    }
   







    useEffect(() => {
      if (datasearch.QuanHuyenNumber !== 'noquanhuyen') {
        axios.get(`http://localhost:5199/api/ThongKe/getXaPhuongTheoQuanHuyen/${datasearch.QuanHuyenNumber}`)
          .then(res => res.data)
          .then(res => {
            setXaPhuong(res)
            
          });
  
        axios.get(`http://localhost:5199/api/ThongKe/Getstaffqh/${datasearch.QuanHuyenNumber}`)
          .then(res => res.data)
          .then(res => {
            setNhanVien(res)
           
          }
          );
  
          setDatasearch({ ...datasearch, NhanVien: 'nonhanvien' })
          setDatasearch({ ...datasearch, XaPhuongNumber: 'noxaphuong' })
      } else {
        setXaPhuong([{
          IDXaPhuong: 0,
          TenXaPhuong: '',
          IDQuanHuyen: 0,
          TenQuanHuyen: ''
        }])
        
  
        axios.get(`http://localhost:5199/api/ThongKe/Getstaffqh/${datasearch.QuanHuyenNumber}`)
          .then(res => res.data)
          .then(res => {
            setNhanVien(res)
          }
          );
          setDatasearch({ ...datasearch, XaPhuongNumber: 'noxaphuong' })
          setDatasearch({ ...datasearch, NhanVienNumber: 'nonhanvien' })
        }
     
  
    }, [datasearch.QuanHuyenNumber])
  

      const search = () => {
          axios.get(`http://localhost:5199/api/ThongKe/getTurnover/${datasearch.NgayBatDau}/${datasearch.NgayKetThuc}/${datasearch.QuanHuyenNumber}/${datasearch.XaPhuongNumber}/${datasearch.NhanVienNumber}/`)
          .then(res=>res.data)
          .then(res => setRenderarray(res))

          setNumberrender(false);
      }

      
      const resetSearch = () => {
        datasearch.QuanHuyenNumber = 'noquanhuyen'
        datasearch.NhanVienNumber = 'nonhanvien'
        datasearch.XaPhuongNumber = 'noxaphuong'
        if (datasearch.NgayBatDau === 'NaN-NaN-NaN' || datasearch.NgayBatDau === '' || datasearch.NgayBatDau !== NgayNhoNhat) {
          setDatasearch({ ...datasearch, NgayBatDau: NgayNhoNhat })
        }
        setRenderarray([]);
       setNumberrender(true);
      }
    
    const [value, setValue] = React.useState(2);
   //   Số trang
   const [page, setPage] = React.useState(0);
   //   Hiển thị số hàng trong 1 trang
   const [rowsPerPage, setRowsPerPage] = React.useState(50);
   // Số dòng hàng cuối
   const emptyRows =
     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
   //   SEt lại số trang để chuyển trang
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };
   // chưa rõ
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
   };
 
   // style head table
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
     [`&.${tableCellClasses.head}`]: {
       backgroundColor: 'var(--color3)',
       color: theme.palette.common.white,
       height: 65
     },
     [`&.${tableCellClasses.body}`]: {
       fontSize: 20,
     },
   }));
 
   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
   function a11yProps(index) {
     return {
       id: `simple-tab-${index}`,
       'aria-controls': `simple-tabpanel-${index}`,
     };
   }
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

    useEffect(() => {
      if (datasearch.NgayBatDau === 'NaN-NaN-NaN' || datasearch.NgayBatDau === '') {
        setDatasearch({ ...datasearch, NgayBatDau: NgayNhoNhat })
      }
    })



    

   


   




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
  

  useEffect(()=> {
    if (datasearch.NgayBatDau === 'NaN-NaN-NaN' || datasearch.NgayBatDau === '') {
      setDatasearch({ ...datasearch, NgayBatDau: NgayNhoNhat })
    }
  })
 
 

  return (
    <div>
          {/* Box tổng */}
      <Box display={'flex'} width={'100%'} height={'220px'} boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' marginTop={'30px'}
      borderRadius={'10px'} padding={'20px'} flexDirection='column'>
            {/* Thanh Tìm text */}
          <Box display={'flex'} width={'600px'} height={'58px'} justifyContent={'space-between'}>

                <FormControl sx={{ height: '100%', width: '30%' }}>
                <InputLabel id="demo-simple-select-label" sx={{ height: '100%' }}>Tìm theo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={chooseTypeSearch}
                  label="Tìm theo b"
                  onChange={(e) => { setChooseTypeSearch(e.target.value) }}
                >
                  <MenuItem value={0}>Tên nhân viên</MenuItem>
                  <MenuItem value={1}>Tên tuyến thu</MenuItem>
                  <MenuItem value={2}>Tên khách hàng</MenuItem>
                </Select>
              </FormControl>
              {/* search text */}
              <TextField sx={{ height: '100%', width: '65%' }} id="outlined-basic" label={Labelname}
                onChange={(e) => { setSearchNamestaff(removeAccents(e.target.value.toLowerCase())) }}
              />

          </Box>  
            {/* Các lựa chọn lọc theo ngày đến ngày xã phường quận huyện ... */}
            <Box display={'flex'} width='100%' height={'100%'} flexDirection={'column'} marginTop={2} justifyContent={'space-around'}>
              
                  <Box width={'100%'} display='flex' alignItems={'center'}>
                          {/* Từ ngày đến ngày */}
                        <Box width={'100%'} display='flex' alignItems={'center'}>
                        

                        <Box display={'flex'} alignItems='center' >
                        <TextField type={'date'} value={datasearch.NgayBatDau}
                          onChange={(e) => { setDatasearch({ ...datasearch, NgayBatDau: e.target.value }) }}
                          label="Bắt đầu" sx={{ marginRight: '12px' }}
          
                          InputProps={{ inputProps: { min: NgayNhoNhat, max: datasearch.NgayKetThuc } }}
                        />
                        <ArrowRightAltIcon />
                        <TextField type={'date'} value={datasearch.NgayKetThuc}
                          onChange={(e) => { setDatasearch({ ...datasearch, NgayKetThuc: e.target.value }) }}
                          label="Kết thúc" sx={{ marginLeft: '12px' }}
                          InputProps={{ inputProps: { min: datasearch.NgayBatDau, max: NgayMacDinh } }}
                        />
          
          
                      </Box>

                        <FormControl sx={{ m: 1, minWidth: 140, marginLeft: 2 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Quận huyện</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={datasearch.QuanHuyenNumber}
                          onChange={(e) => { setDatasearch({ ...datasearch, QuanHuyenNumber: e.target.value }) }}
                          autoWidth
                          label="Quận huyện b"
                        >

                          <MenuItem value={'noquanhuyen'}>
                            <em>Chọn quận huyện</em>
                          </MenuItem>

                          {QuanHuyen.map(element => {
                            return (
                              <MenuItem key={element.IDQuanHuyen} value={element.TenQuanHuyen}> {element.TenQuanHuyen} </MenuItem>
                            )
                          })}

                        </Select>
                      </FormControl>

                      {datasearch.QuanHuyenNumber !== 'noquanhuyen' ? 
                      <FormControl sx={{ m: 1, minWidth: 130 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Xã phường</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={datasearch.XaPhuongNumber}
                          onChange={(e) => { setDatasearch({ ...datasearch, XaPhuongNumber: e.target.value }) }}
                          autoWidth
                          label="Xã phường b"
                        >
          
                          <MenuItem value={'noxaphuong'}>
                            <em>Chọn xã phường</em>
                          </MenuItem>
                          {XaPhuong.map(element => {
                            return (
                              <MenuItem key={element.IDXaPhuong} value={element.TenXaPhuong}> {element.TenXaPhuong} </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl> : ''}


                      <FormControl sx={{ m: 1, minWidth: 130 }}>
                      <InputLabel id="demo-simple-select-autowidth-label">Nhân Viên</InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={datasearch.NhanVienNumber}
                        onChange={(e) => { setDatasearch({ ...datasearch, NhanVienNumber: e.target.value }) }}
                        autoWidth
                        label="Nhân viên b"
                      >
        
                        <MenuItem value={'nonhanvien'}>
                          <em>Chọn nhân viên</em>
                        </MenuItem>
                        {NhanVien.map((element,index) => {
                          return (
                            <MenuItem key={index} value={element.HoTen}> {element.HoTen} </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>

                        <IconButton onClick={resetSearch}>
                        <ReplayIcon />
                      </IconButton>
                            
                        </Box>
                   


                        
                  
                  </Box>   
                  <Box width={'100%'} display='flex' justifyContent={'space-between'}>
                      <Box>
                      
                      </Box>
                      <Box height={"100%"} width={350} display={'flex'} justifyContent='space-around' alignItems={'center'}>

                      <Button variant="outlined" color='success' endIcon={<SearchIcon />} sx={{ height: '100%', marginLeft: 2 }}
                        onClick={search}
                      >
                        Tìm kiếm
                      </Button>
                      <Button variant='outlined' color='success'
                      onClick={ExportExcel}
                      > Xuất file excel </Button>
                      </Box>

                  </Box>
                  

            </Box>    
      </Box>
      <Typography variant='h5'
        sx=
        {{
          width: '100%', height: 70,
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          color: 'var(--color3)',
          display: 'flex',
          paddingLeft: 3,
          alignItems: 'center'
        }}>DANH SÁCH DOANH THU THEO TUYẾN THU</Typography>


      <Box witdh={'100%'} height={800}>

        <TableContainer component={Paper} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>

          <Table sx={{ maxWidth: '100%' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID Tuyến Thu</StyledTableCell>
                <StyledTableCell >Tên tuyến thu</StyledTableCell>
                <StyledTableCell >Mã số NV </StyledTableCell>
                <StyledTableCell >Tên nhân viên</StyledTableCell>
                <StyledTableCell >Tên khách hàng</StyledTableCell>  
                <StyledTableCell >Quận Huyện</StyledTableCell>
                <StyledTableCell >Xã phường</StyledTableCell>
                <StyledTableCell >Doanh Thu</StyledTableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row,index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                      {row.MaTuyenThu}
                  </TableCell>
                  <TableCell  >
                  {row.TenTuyenThu}
                  </TableCell>
                  <TableCell  > 
                  {row.MaNhanVien}
                  </TableCell>
                  <TableCell  >
                  {row.HoTen}
                  </TableCell>
                  <TableCell  >
                  {row.HoTenKH}
                  </TableCell>
                  <TableCell component="th" scope="row" >
                  {row.TenQuanHuyen}
                  </TableCell>
                  <TableCell component="th" scope="row" >
                  {row.TenXaPhuong}
                  </TableCell>

                  <TableCell sx={{ color: 'var(--color7)' }} align={'center'} style={{ width: '8%' }} >
                    {row.IDLoaiKhachHang === 1 ? '50.000 ₫' : '100.000 ₫'}
                  </TableCell>
             
                    

                </TableRow>
              ))}
               


              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter >
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 50, 100, 200, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page"
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

      </Box>

              
    </div>



  )
}

export default TurnoverStatistical