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
function CustomerStatistical() {

  useEffect(() => {

    axios.get('http://localhost:5199/api/ThongKe/GetCustomer')
      .then(res => res.data)
      .then(res => SetDatatemporary(res));
    axios.get('http://localhost:5199/api/ThongKe/GetKyThu')
      .then(res => res.data)
      .then(res => setKythu(res));
    axios.get('http://localhost:5199/api/ThongKe/GetQuanHuyen')
      .then(res => res.data)
      .then(res => setQuanHuyen(res));
    axios.get('http://localhost:5199/api/ThongKe/GetTuyenThu')
      .then(res => res.data)
      .then(res => setTuyenThu(res));

  }, [])

  // giữ tạm thời để lọc
  const [datatemporary, SetDatatemporary] = useState([{
    DiaChi: "",
    HoTenKH: "",
    MaKhachHang: "",
    Nam: 0,
    NgayThu: "",
    NgayTao: "",
    TenKyThu: "",
    TenQuanHuyen: "",
    TenTuyenThu: "",
    TenXaPhuong: "",
    Thang: 0,
    TrangThai: 0,
  }])
  // Các useState giữ dữ liệu để làm điều kiện render ra
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
  const [KyThu, setKythu] = React.useState([{
    IDKyThu: 0,
    Nam: 0,
    TenKyThu: "",
    Thang: 0,
  }]);
  const [TuyenThu, setTuyenThu] = React.useState([{
    IDTuyenThu: 0,
    MaTuyenThu: "",
    TenTuyenThu: ""
  }]);


  const minday = new Date(datatemporary[0].NgayTao)
  const NgayNhoNhat = getFormattedDate(minday);
  const Today = new Date();
  const NgayMacDinh = getFormattedDate(Today);


  const [datasearch, setDatasearch] = useState({
    QuanHuyenNumber: 'noquanhuyen',
    XaPhuongNumber: 'noxaphuong',
    KyThuNumber: 'nokythu',
    TuyenThuNumber: 'notuyenthu',
    NgayBatDau: '',
    NgayKetThuc: NgayMacDinh
  })

  if(datasearch.QuanHuyenNumber === 'noquanhuyen'){
    datasearch.XaPhuongNumber = 'noxaphuong'
  }

  // format date
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

  // UseState nắm giữ giá trị trong mảng usestate giữ dữ liệu ở trên
  const [Rendernumber, setRendernumber] = useState(true);

  // Mảng lưu giữ giá trị mới
  const [rendersearch, setRendersearch] = useState([{
    DiaChi: "",
    HoTenKH: "",
    MaKhachHang: "",
    Nam: 0,
    NgayTao: "",
    NgayThu: "",
    TenKyThu: "",
    TenQuanHuyen: "",
    TenTuyenThu: "",
    TenXaPhuong: "",
    Thang: 0,
    TrangThai: 0,
  }])

  var Labelname = '';
  const listlabelname =
    [
      'Nhập tên khách hàng cần tìm ...',
    ]
  const [chooseTypeSearch, setChooseTypeSearch] = useState(0);
  Labelname = listlabelname[chooseTypeSearch];
  const [searchNameCustomer, setSearchNameCustomer] = useState('');
  const [valuesearch, setValuesearch] = useState(2);
  const [value, setValue] = React.useState(2);
  var rows = [];
  var rowsexport = []
  // render cai mang nao ra man hinh gom 2 loai chua loc va da loc
  if (Rendernumber === true) {
    datatemporary.map(element => {

      if (element.NgayThu !== null) {
        const getDate = new Date(element.NgayThu)
        element.NgayThu = getFormattedDate(getDate);
      }
      const chuoikhongdau = removeAccents(element.HoTenKH)

      if (searchNameCustomer.length === 0) {
        if (value === 2) {
          rows.push(element);
        }
        if (value === 1 && element.NgayThu === null) {
          rows.push(element);
        }
        if (value === 0 && element.NgayThu !== null) {
          rows.push(element);
        }
      }
      if (searchNameCustomer.length !== 0) {
        if (value === 2 && chuoikhongdau.toLocaleLowerCase().includes(searchNameCustomer)) {
          rows.push(element);
        }
        if (value === 1 && element.NgayThu === null && chuoikhongdau.toLocaleLowerCase().includes(searchNameCustomer)) {
          rows.push(element);
        }
        if (value === 0 && element.NgayThu !== null && chuoikhongdau.toLocaleLowerCase().includes(searchNameCustomer)) {
          rows.push(element);
        }
      }
    })
  }
  if (Rendernumber === false) {
    rendersearch.map(element => {

      if (element.NgayThu !== null) {
        const getDate = new Date(element.NgayThu)
        element.NgayThu = getFormattedDate(getDate);
      }

      const chuoikhongdau = removeAccents(element.HoTenKH)

      if (searchNameCustomer.length === 0) {
        if (value === 2) {
          rows.push(element);
        }
        if (value === 1 && element.NgayThu === null) {
          rows.push(element);
        }
        if (value === 0 && element.NgayThu !== null) {
          rows.push(element);
        }
      }
      if (searchNameCustomer.length !== 0) {
        if (value === 2 && chuoikhongdau.toLocaleLowerCase().includes(searchNameCustomer)) {
          rows.push(element);
        }
        if (value === 1 && element.NgayThu === null && chuoikhongdau.toLocaleLowerCase().includes(searchNameCustomer)) {
          rows.push(element);
        }
        if (value === 0 && element.NgayThu !== null && chuoikhongdau.toLocaleLowerCase().includes(searchNameCustomer)) {
          rows.push(element);
        }
      }

    })
  }

  rows.reverse();

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

  useEffect(() => {
    if (datasearch.NgayBatDau === 'NaN-NaN-NaN' || datasearch.NgayBatDau === '') {
      setDatasearch({ ...datasearch, NgayBatDau: NgayNhoNhat })
    }
  })

  useEffect(() => {
    if (datasearch.QuanHuyenNumber !== 'noquanhuyen') {
      axios.get(`http://localhost:5199/api/ThongKe/getXaPhuongTheoQuanHuyen/${datasearch.QuanHuyenNumber}`)
        .then(res => res.data)
        .then(res => {
          setXaPhuong(res)
        });

      axios.get(`http://localhost:5199/api/ThongKe/getTuyenThuTheoQuanHuyen/${datasearch.QuanHuyenNumber}`)
        .then(res => res.data)
        .then(res => {
          setTuyenThu(res)  
        }
        );

        setDatasearch({ ...datasearch, TuyenThuNumber: 'notuyenthu' })
        setDatasearch({ ...datasearch, XaPhuongNumber: 'noxaphuong' })
    } else {
      setXaPhuong([{
        IDXaPhuong: 0,
        TenXaPhuong: '',
        IDQuanHuyen: 0,
        TenQuanHuyen: ''
      }])
      setDatasearch({ ...datasearch, XaPhuongNumber: 'noxaphuong' })

      axios.get('http://localhost:5199/api/ThongKe/GetTuyenThu')
        .then(res => res.data)
        .then(res => setTuyenThu(res));

        setDatasearch({ ...datasearch, TuyenThuNumber: 'notuyenthu' })
      }
   

  }, [datasearch.QuanHuyenNumber])

  const Search = () => {

    if (valuesearch === 2) {
      axios.get(`http://localhost:5199/api/ThongKe/GetCustomerall/${datasearch.NgayBatDau}/${datasearch.NgayKetThuc}/${datasearch.QuanHuyenNumber}/${datasearch.XaPhuongNumber}/${datasearch.KyThuNumber}/${datasearch.TuyenThuNumber}`)
        .then(res => res.data)
        .then(res => setRendersearch(res))
      setRendernumber(false)
    }
    if (valuesearch === 1) {
      axios.get(`http://localhost:5199/api/ThongKe/GetCustomerChuaThu/${datasearch.NgayBatDau}/${datasearch.NgayKetThuc}/${datasearch.QuanHuyenNumber}/${datasearch.XaPhuongNumber}/${datasearch.KyThuNumber}/${datasearch.TuyenThuNumber}`)
        .then(res => res.data)
        .then(res => setRendersearch(res))
      setRendernumber(false)
    }
    if (valuesearch === 0) {
      axios.get(`http://localhost:5199/api/ThongKe/GetCustomerDaThu/${datasearch.NgayBatDau}/${datasearch.NgayKetThuc}/${datasearch.QuanHuyenNumber}/${datasearch.XaPhuongNumber}/${datasearch.KyThuNumber}/${datasearch.TuyenThuNumber}`)
        .then(res => res.data)
        .then(res => setRendersearch(res))
      setRendernumber(false)
    }

    setPage(0)

  }

  const resetSearch = () => {
    setValuesearch(2);
    setRendernumber(true)
    datasearch.QuanHuyenNumber = 'noquanhuyen'
    datasearch.KyThuNumber = 'nokythu'
    datasearch.TuyenThuNumber = 'notuyenthu'
    datasearch.XaPhuongNumber = 'noxaphuong'
    if (datasearch.NgayBatDau === 'NaN-NaN-NaN' || datasearch.NgayBatDau === '' || datasearch.NgayBatDau !== NgayNhoNhat) {
      setDatasearch({ ...datasearch, NgayBatDau: NgayNhoNhat })
    }
    datasearch.NgayKetThuc = NgayMacDinh
    setRendersearch([])

  }

  if (value !== 2 && valuesearch !== 2) {
    setValue(2);
  }
  useEffect(() => {
    if (value !== 2 && valuesearch !== 2) {
      Search()
    }

  }, [valuesearch])


  var ArrayExcel = [];

  rows.map(element => {

    var trangthai = '';
    var ngaythu = '';
    const getdate = new Date(element.NgayTao)
    const NgayTao = getFormattedDate(getdate)
    if(element.NgayThu === null) {
      ngaythu = 'Chưa thu'
    }else {
      ngaythu = element.NgayThu
    }
    if(element.TrangThai === 1) {
      trangthai = 'Đang sử dụng'
    }else {
      trangthai = 'Tạm dừng sử dụng'
    }

    let chosenExportCustomer = {
      "Mã Khách Hàng" : element.MaKhachHang,
      "Họ tên Khách hàng" : element.HoTenKH,
      "Quận huyện" : element.TenQuanHuyen,
      "Xã phường" : element.TenXaPhuong,
      "Địa chỉ" : element.DiaChi,
      "Tên Tuyến thu" : element.TenTuyenThu,
      "Tên Kỳ Thu" : element.TenKyThu,
      "Ngày thu" : ngaythu,
      "Ngày tạo" : NgayTao,
      "Trạng Thái" : trangthai,
    
    }
    ArrayExcel.push(chosenExportCustomer);
  })
  
  


  const ExportExcel = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(ArrayExcel);
    XLSX.utils.book_append_sheet(wb,ws, "Thống kê tất cả khách hàng");
    XLSX.writeFile(wb,"Myexcel.xlsx")
  }

  return (
    <div>
      <Box display={'flex'} width={'100%'} height={'220px'} boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' marginTop={'30px'}
        borderRadius={'10px'} padding={'20px'} flexDirection='column'
      >
        <Box display={'flex'} width={'600px'} height={'58px'} justifyContent={'space-between'} >
         
          <FormControl sx={{ height: '100%', width: '30%' }}>
            <InputLabel id="demo-simple-select-label" sx={{ height: '100%' }}>Tìm theo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chooseTypeSearch}
              label="Tìm theo b"
              onChange={(e) => { setChooseTypeSearch(e.target.value) }}
            >
              <MenuItem value={0}>Tên khách hàng</MenuItem>
            </Select>
          </FormControl>
          {/* search text */}
          <TextField sx={{ height: '100%', width: '65%' }} id="outlined-basic" label={Labelname}
            onChange={(e) => { setSearchNameCustomer(removeAccents(e.target.value.toLowerCase())) }}
          />

        </Box>

        <Box display={'flex'} width='100%' height={'100%'} flexDirection={'column'} marginTop={2} justifyContent={'space-around'}>


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
            {/* Quận huyện */}
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

            {/* Xã phường */}

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

            {/* Kỳ thu */}
            <FormControl sx={{ m: 1, minWidth: 130 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Kỳ Thu</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={datasearch.KyThuNumber}
                onChange={(e) => { setDatasearch({ ...datasearch, KyThuNumber: e.target.value }) }}
                autoWidth
                label="Kỳ thu b"
              >
                <MenuItem value={'nokythu'}>
                  <em>Chọn kỳ thu</em>
                </MenuItem>

                {KyThu.map(element => {
                  return (
                    <MenuItem key={element.IDKyThu} value={element.TenKyThu}> {element.TenKyThu} </MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            {/* Tuyến thu */}
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Tuyến thu</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={datasearch.TuyenThuNumber}
                onChange={(e) => { setDatasearch({ ...datasearch, TuyenThuNumber: e.target.value }) }}
                autoWidth
                label="tuyến thu b"
              >
                <MenuItem value={'notuyenthu'}>
                  <em>Chọn tuyến thu</em>
                </MenuItem>

                {TuyenThu.map(element => {
                  return (
                    <MenuItem key={element.IDTuyenThu} value={element.TenTuyenThu}> {element.TenTuyenThu} </MenuItem>
                  )
                })}
              </Select>
            </FormControl>


            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Trạng thái phiếu</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={valuesearch}
                onChange={(e) => { setValuesearch(e.target.value) }}
                autoWidth
                label="Trạng thái phiếu b"
              >

                <MenuItem value={2}> Tất cả </MenuItem>
                <MenuItem value={1}> Chưa thu </MenuItem>
                <MenuItem value={0}> Đã thu </MenuItem>
              </Select>
            </FormControl>

            <IconButton onClick={resetSearch}>
              <ReplayIcon />
            </IconButton>




          </Box>

          <Box width={'100%'} display='flex' justifyContent={'space-between'}>

            <Box >

              {valuesearch === 2
                ?
                <Box display='flex' alignItems={'center'} height={'100%'}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Đã thu" {...a11yProps(0)} />
                    <Tab label="Chưa thu" {...a11yProps(1)} />
                    <Tab label="Tất cả" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                :
                <Box display='flex' alignItems={'center'} height={'100%'}>
                </Box>
              }


            </Box>
            <Box height={"100%"} width={350} display={'flex'} justifyContent='space-around' alignItems={'center'}>

              <Button variant="outlined" color='success' endIcon={<SearchIcon />} sx={{ height: '80%', marginLeft: 2 }}
                onClick={Search}
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
        }}>DANH SÁCH KHÁCH HÀNG</Typography>


      <Box witdh={'100%'} height={800}>

        <TableContainer component={Paper} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>

          <Table sx={{ maxWidth: '100%' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>MSKH</StyledTableCell>
                <StyledTableCell >Họ tên</StyledTableCell>
                <StyledTableCell >Quận huyện</StyledTableCell>
                <StyledTableCell >Xã phường</StyledTableCell>
                <StyledTableCell >Tên tuyến thu</StyledTableCell>
                <StyledTableCell >Tên kỳ thu</StyledTableCell>
                <StyledTableCell >Ngày thu</StyledTableCell>
                <StyledTableCell >Trạng thái</StyledTableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.MaKhachHang}
                  </TableCell>
                  <TableCell  >
                    {row.HoTenKH}
                  </TableCell>
                  <TableCell  >
                    {row.TenQuanHuyen}

                  </TableCell>
                  <TableCell  >
                    {row.TenXaPhuong}

                  </TableCell>
                  <TableCell component="th" scope="row" >
                    {row.TenTuyenThu}
                  </TableCell>
                  <TableCell component="th" scope="row" >
                    {row.TenKyThu}
                  </TableCell>

                  <TableCell sx={{ color: 'var(--color7)' }} >
                    {row.NgayThu}
                  </TableCell>
                  {row.NgayThu === null ? <TableCell sx={{ color: 'var(--color9)' }} > Chưa thu </TableCell> :
                    <TableCell sx={{ color: 'var(--color7)' }} >
                      Đã thu
                    </TableCell>
                  }

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

export default CustomerStatistical