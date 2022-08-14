import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

function Chartjs(props) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  
  const today = new Date()


  const [getyear , setGetyear] = useState([{
     Nam: today.getFullYear()
  }]);
  const [getnumber,setGetnumber] = useState(getyear[getyear.length-1].Nam);
  
  useEffect(()=>{
    axios.get("http://localhost:5199/api/ThongKe/GetNamKyThu")
      .then(res=>res.data)
      .then(res=> {
        setGetyear(res);
      });
  },[])

  var DoanhThuTong = [0,0,0,0,0,0,0,0,0,0,0,0]
  var PhieuThuKy1 = []
  var PhieuThuKy2 = []
  var PhieuThuKy3 = []
  var PhieuThuKy4 = []
  var PhieuThuKy5 = []
  var PhieuThuKy6 = []
  var PhieuThuKy7 = []
  var PhieuThuKy8 = []
  var PhieuThuKy9 = []
  var PhieuThuKy10 = []
  var PhieuThuKy11 = []
  var PhieuThuKy12 = []
  var DoanhThuky1 = 0;
  var DoanhThuky2 = 0;
  var DoanhThuky3 = 0;
  var DoanhThuky4 = 0;
  var DoanhThuky5 = 0;
  var DoanhThuky6 = 0;
  var DoanhThuky7 = 0;
  var DoanhThuky8 = 0;
  var DoanhThuky9 = 0;
  var DoanhThuky10 = 0;
  var DoanhThuky11 = 0;
  var DoanhThuky12 = 0;


  var SoTiencantra = 0;
  
  props.DoanhThu.map(element => {
      let DateEle = new Date(element.NgayTao);
      
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 1){
        PhieuThuKy1.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 2){
        PhieuThuKy2.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 3){
        PhieuThuKy3.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 4){
        PhieuThuKy4.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 5){
        PhieuThuKy5.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 6){
        PhieuThuKy6.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 7){
        PhieuThuKy7.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 8){
        PhieuThuKy8.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 9){
        PhieuThuKy9.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 10){
        PhieuThuKy10.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 11){
        PhieuThuKy11.push(element)
      }
      if(DateEle.getFullYear() === getnumber && DateEle.getMonth()+1 === 12){
        PhieuThuKy12.push(element)
      }
  })

  
  PhieuThuKy1.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky1+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky1+= SoTiencantra
    }

    
  })

  PhieuThuKy2.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky2+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky2+= SoTiencantra
    }
    
  })
  PhieuThuKy3.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky3+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky3+= SoTiencantra
    }
    
  })
  PhieuThuKy4.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky4+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky4+= SoTiencantra
    }
    
  })
  PhieuThuKy5.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky5+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky5+= SoTiencantra
    }
    
  })
  PhieuThuKy6.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky6+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky6+= SoTiencantra
    }
    
  })
  PhieuThuKy7.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky7+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky7+= SoTiencantra
    }
    
  })
  PhieuThuKy8.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky8+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky8+= SoTiencantra
    }
    
  })
  PhieuThuKy9.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky9+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky9+= SoTiencantra
    }
    
  })
  PhieuThuKy10.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky10+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky10+= SoTiencantra
    }
    
  })
  PhieuThuKy11.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky11+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky11+= SoTiencantra
    }
    
  })
  PhieuThuKy12.map(element=> {
    
    if(element.MauSoPhieu === 1 && element.NgayThu!== null) {
      SoTiencantra = 50000
      DoanhThuky12+= SoTiencantra
    }
    if(element.MauSoPhieu === 2 && element.NgayThu!== null) {
      SoTiencantra = 100000
      DoanhThuky12+= SoTiencantra
    }
  })
  
   
  console.log(DoanhThuky1);
  DoanhThuTong[0] = DoanhThuky1
  DoanhThuTong[1] = DoanhThuky2
  DoanhThuTong[2] = DoanhThuky3
  DoanhThuTong[3] = DoanhThuky4
  DoanhThuTong[4] = DoanhThuky5
  DoanhThuTong[5] = DoanhThuky6
  DoanhThuTong[6] = DoanhThuky7
  DoanhThuTong[7] = DoanhThuky8
  DoanhThuTong[8] = DoanhThuky9
  DoanhThuTong[9] = DoanhThuky10
  DoanhThuTong[10] = DoanhThuky11
  DoanhThuTong[11] = DoanhThuky12

  const options = {
    responsive: true,
    plugins: {  
      legend: {
        position: 'top' 
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu theo tháng trong năm ' + getnumber,
      },
    },
  };

  const KyThuTrongMotNam = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const labels = KyThuTrongMotNam

  const data = {
    labels,
    datasets: 
    [
      {
        label: 'Doanh thu',
        data: DoanhThuTong.map(element => element),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Box>
      
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Năm</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={getnumber}
          label="2022"
          onChange={(e)=> {setGetnumber(e.target.value)}}
        >
          {getyear.map(element=> {
            return (
              <MenuItem key={element.Nam} value={element.Nam}>{element.Nam}</MenuItem>
            )
          })}
        </Select>

      </FormControl>
    <Line options={options} data={data} />
    
    </Box>
  );
}

export default Chartjs