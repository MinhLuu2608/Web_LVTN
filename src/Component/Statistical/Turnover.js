import { Box ,Grid , Card, Typography, CardContent, Select, MenuItem, InputLabel, FormControl, Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ErrorIcon from '@mui/icons-material/Error';
import '../../CSS/turnover.css'
import axios from 'axios';
import Chartjs from './Chartjs';
import ChartRound from './ChartRound';
import Chartjs2 from './Chartjs2';

function Turnover() {
  
  const [kythu, setKythu] = React.useState([{
    IDKyThu: 0,
    Nam: 0,
    TenKyThu: "MacDinh",
    Thang: 0
  }]);
  const [NumberKythu , setNumberKythu] = useState(0)

  const [DoanhThu , setDoanhthu] = useState([{
    IDKhachHang: 0,
    IDKyThu: 0,
    IDNhanVien: 0,
    IDPhieu: 0,
    IDTuyenThu: 0,
    MaSoPhieu: "",
    MauSoPhieu: 0,
    NgayTao: "",
    NgayThu: "",
  }]);
  

  


  // Ky nay
  const a = []
  // Ky truoc cua a
  const b = []
  // tat ca phieu thu chua thu
  var sophieuno = 0;
  DoanhThu.map(element => {
      if(element.IDKyThu === NumberKythu) {
        a.push(element);
      }
      if(element.IDKyThu === NumberKythu-1){
        b.push(element)
      }
      if(element.NgayThu === null &&  element.IDKyThu !== kythu.length) {
        sophieuno++;
      }
  })

  var SoPhieuThu = a.length;
  var Doanhthu = 0;
  var Dathu = 0;
  var Chuathu = 0;
  var SoPhieuThub = b.length;
  var Doanhthub = 0;
  var Dathub = 0;
  var Chuathub = 0;

 
  
  a.map(element=> {
      if(element.NgayThu !== null) {
          if(element.MauSoPhieu === 1){
            Doanhthu += 50000      
            Dathu++
          }else{
            Doanhthu += 100000  
            Dathu++
          }
      }else{
        Chuathu++
      }
  })
  if(b.length!==0){
     b.map(element => {
          if(element.NgayThu !== null) {
            if(element.MauSoPhieu === 1){
              Doanhthub += 50000      
              Dathub++
            }else{
              Doanhthub += 100000  
              Dathub++
            }
        }else{
          Chuathub++
        }
     })
  }
  var phantramDoanhthu = 0;
  var phantramSophieuthu = 0;
  phantramDoanhthu = (Doanhthu - Doanhthub)/Doanhthub * 100;
  phantramSophieuthu = (SoPhieuThu - SoPhieuThub)/SoPhieuThub * 100

  
  if(phantramDoanhthu === Infinity){
    phantramDoanhthu = -99999999
  }
  if(phantramSophieuthu === Infinity){
    phantramSophieuthu = -99999999
  }


  const handleChange = (event) => {
    setNumberKythu(event.target.value);
  };
  useEffect(()=> {
    axios.get("http://localhost:5199/api/ThongKe")
      .then(res=> res.data)
      .then(res=> {  
        setKythu(res)
        setNumberKythu(res.length)
      })
    axios.get("http://localhost:5199/api/ThongKe/GetPhieuThu")  
    .then(res=> res.data)
    .then(res=> {  
      setDoanhthu(res)
    })
  },[])

  

  const [mountchart, setMountchart] = useState(0);
  return (
    <Box  width ="100%" height="100%">

      <Box width={"100%"} height={"60px"} display = "flex" 
      sx={{alignItems:"center" , justifyContent:"space-between",marginBottom:2}}
      >
      <Typography variant='h6' sx={{color : "var(--color2)" , fontSize : 25}}>
      THỐNG KÊ DOANH THU
      </Typography>

        <Box display = "flex" 
        sx={{alignItems:"center" , justifyContent:"flex-end"}}>
          
          <Typography variant='h6' sx={{marginRight:2}}>KỲ THU :</Typography>  
          <FormControl> 
          <InputLabel id="demo-simple-select-label">2022</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={NumberKythu}
            label= "2022"
            onChange={handleChange}
            sx={{width:250}}
          >  

          {kythu.map(element=> {
              return(
                <MenuItem key={element.IDKyThu} value={element.IDKyThu}>{element.TenKyThu}</MenuItem>
              )
          })}
          </Select>
          </FormControl>

        
          </Box>
      </Box>

      <Grid container spacing={3}>
      {/* XANH LÁ */}
      <Grid item xs={3}>
          <Card sx={{ minWidth: '25%' , height : 235,backgroundColor:"var(--color10)",color : "var(--colortext10)",borderRadius:5}}>
            {/* Tháng này và  icon */}  
          <CardContent
              sx={{
              display: "flex",
              flexDirection : "column",
              height : 120
              }}
              >
              <Typography gutterBottom variant="p" component="div"
              sx={{
                textAlign: "right",
                fontSize : 14,
                marginBottom : 1
              }}
              >
               {NumberKythu === 0 ? kythu[NumberKythu].TenKyThu : kythu[NumberKythu-1].TenKyThu}
              </Typography> 
              <Box 
              display={"flex"} 
              sx= 
              {{
                alignItems :"center",
                alignSelf:"center",
                justifyContent  : "center",
                backgroundImage: "linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)",
                borderRadius : "100%",
                width: 60,
                height: 60
              }}
              >
                <PointOfSaleIcon sx={{fontSize: 28}}/>
              </Box>
          </CardContent>
          {/* Tiền và tên thống kê  */}
          <CardContent
          sx= {{display:"flex",alignItems:"center",justifyContent:'center',flexDirection:"column"}}
          >

              <Typography variant='h4' sx={{fontSize:"1.875rem"}}>
                {Doanhthu}
              </Typography>
              <Typography variant='p' sx={{fontSize:"0.875rem",marginTop:"10px"}}>
                Doanh thu
              </Typography>
              <Typography variant='p' sx={{fontSize:"0.875rem",marginTop:"3px",textAlign:"left",width:"100%"}}>
              {phantramDoanhthu === -99999999 ? "Không có kỳ trước" : phantramDoanhthu.toFixed(2) < 0 ? "Giảm " + (phantramDoanhthu*-1).toFixed(2) + "% so với kỳ trước" : "Tăng " + phantramDoanhthu.toFixed(2)+ "% so với kỳ trước"}
             </Typography>
          </CardContent>
          </Card>
      </Grid>
      {/* XANH DƯƠNG */}
      <Grid item xs={3}>
          <Card sx={{ minWidth: '25%' , height : 235,backgroundColor:"var(--color11)",color : "var(--colortext11)",borderRadius:5}}>
            {/* Tháng này và  icon */}  
          <CardContent
          sx={{
          display: "flex",
          flexDirection : "column",
          height : 120
          }}
          >
          <Typography gutterBottom variant="p" component="div"
          sx={{
            textAlign: "right",
            fontSize : 14,
            marginBottom : 1
          }}
          >
          {NumberKythu === 0 ? kythu[NumberKythu].TenKyThu : kythu[NumberKythu-1].TenKyThu}
          </Typography> 
          <Box 
          display={"flex"} 
          sx= 
          {{
            alignItems :"center",
            alignSelf:"center",
            justifyContent  : "center",
            backgroundImage: "linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%);",
            borderRadius : "100%",
            width: 60,
            height: 60
          }}
          >
            <AutoAwesomeMotionIcon sx={{fontSize: 28}}/>
          </Box>
      </CardContent>
      {/* Tiền và tên thống kê  */}
      <CardContent
      sx= {{display:"flex",alignItems:"center",justifyContent:'center',flexDirection:"column"}}
      >

          <Typography variant='h4' sx={{fontSize:"1.875rem"}}>
            {SoPhieuThu}
          </Typography>
          <Typography variant='p' sx={{fontSize:"0.875rem",marginTop:"10px"}}>
            Phiếu thu
          </Typography>
          <Typography variant='p' sx={{fontSize:"0.875rem",marginTop:"3px",textAlign:"left",width:"100%"}}>
          {phantramSophieuthu === -99999999 ? "Không có kỳ trước" : phantramSophieuthu.toFixed(2) < 0 ? "Giảm " + (phantramSophieuthu*-1).toFixed(2) + "% so với kỳ trước" : "Tăng " + phantramSophieuthu.toFixed(2)+ "% so với kỳ trước"}
          </Typography>

      </CardContent>

          </Card>
      </Grid>
      {/* VÀNG */}
      <Grid item xs={3}>
                <Card sx={{ minWidth: '25%' , height : 235,backgroundColor:"var(--color12)",color : "var(--colortext12)",borderRadius:5}}>
                {/* Tháng này và  icon */}  
          <CardContent
          sx={{
          display: "flex",
          flexDirection : "column",
          height : 120
          }}
          >
          <Typography gutterBottom variant="p" component="div"
          sx={{
            textAlign: "right",
            fontSize : 14,
            marginBottom : 1
          }}
          >
          {NumberKythu === 0 ? kythu[NumberKythu].TenKyThu : kythu[NumberKythu-1].TenKyThu}
          </Typography> 
          <Box 
          display={"flex"} 
          sx= 
          {{
            alignItems :"center",
            alignSelf:"center",
            justifyContent  : "center",
            backgroundImage: "linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%);",
            borderRadius : "100%",
            width: 60,
            height: 60,
        
          }}
          >
            <DoneOutlineIcon sx={{fontSize: 28}}/>
          </Box>
      </CardContent>
      {/* Tiền và tên thống kê  */}
      <CardContent
      sx= {{display:"flex",alignItems:"center",justifyContent:'center',flexDirection:"column"}}
      >

          <Typography variant='h4' sx={{fontSize:"1.875rem"}}>
            {Dathu}
          </Typography>
          <Typography variant='p' sx={{fontSize:"0.875rem",marginTop:"10px"}}>
            Phiếu đã thu
          </Typography>
         
      </CardContent>

            </Card>
      </Grid>
      {/* ĐỎ */}
      <Grid item xs={3}>
              <Card sx={{ minWidth: '25%' , height : 235,backgroundColor:"var(--color13)",color : "var(--colortext13)",borderRadius:5}}>
              {/* Tháng này và  icon */}  
          <CardContent
          sx={{
          display: "flex",
          flexDirection : "column",
          height : 120
          }}
          >
          <Typography gutterBottom variant="p" component="div"
          sx={{
            textAlign: "right",
            fontSize : 14,
            marginBottom : 1
          }}
          >
          {NumberKythu === 0 ? kythu[NumberKythu].TenKyThu : kythu[NumberKythu-1].TenKyThu}
          </Typography> 
          <Box 
          display={"flex"} 
          sx= 
          {{
            alignItems :"center",
            alignSelf:"center",
            justifyContent  : "center",
            backgroundImage: "linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%);",
            borderRadius : "100%",
            width: 60,
            height: 60
          }}
          >
            <ErrorIcon sx={{fontSize: 28}}/>
          </Box>
      </CardContent>
      {/* Tiền và tên thống kê  */}
      <CardContent
      sx= {{display:"flex",alignItems:"center",justifyContent:'center',flexDirection:"column"}}
      >

          <Typography variant='h4' sx={{fontSize:"1.875rem"}}>
            {Chuathu}
          </Typography>
          <Typography variant='p' sx={{fontSize:"0.875rem",marginTop:"10px"}}>
            Phiếu chưa thu
          </Typography>
          <Typography variant='p' sx={{fontSize:"0.875rem",marginTop:"3px",textAlign:"left",width:"100%"}}>
            {"Tổng số phiếu nợ còn : " + sophieuno}
          </Typography>
      </CardContent>

          </Card>
      </Grid>
      </Grid>

        <Box width={"100%"} height={"100%"} display = "flex" justifyContent={"space-between"} 
        sx={{
          marginTop : 5,
          
          paddingBottom : 5
        }}
        >
            <Box sx = {{ width : "65%", height:680, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' , display:"flex",flexDirection:"column",padding:5}}>
                <Box
                sx={{
                  width : "100%",
                  height : 50,
                  display: "flex",
                  justifyContent : "space-between"

                }}
                >
                <Typography variant='h5'> Biểu đồ </Typography>
                <FormControl >
                  <InputLabel id="demo-simple-select-label">Thống kê</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mountchart}
                    label="Thống kê"
                    onChange={(e)=>{setMountchart(e.target.value)}}
                    sx={{width:200}}
                  >
                    <MenuItem value={0}>Theo năm</MenuItem>
                    <MenuItem value={1}>Theo kỳ</MenuItem>
                    
                  </Select>
                </FormControl>

              </Box>
              {mountchart === 0 ?  <Chartjs
                DoanhThu  = {DoanhThu}
                KyThu = {kythu}
                />
              : <Chartjs2
              DoanhThu  = {DoanhThu}
              KyThu = {kythu}
                />
              }
             
            </Box>

            <Box sx={{width: "32%",height : 680, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}}>
              <Typography variant='h5' sx={{marginTop : 5 , marginBottom : 3,fontWeight:"bold"}}> Biểu đồ tổng các thành phần của công ty </Typography>
              <ChartRound 
              DoanhThu  = {DoanhThu}
                KyThu = {kythu}
              />
              <Typography variant='h6' sx= {{marginTop:3,marginLeft:2}}>Tổng số phiếu thu : {DoanhThu.length}</Typography>

            </Box>

        </Box>
    
    </Box>
  )
}

export default Turnover