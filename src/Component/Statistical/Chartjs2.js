
import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
import axios from "axios";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function Chartjs2(props) {


    const [KyThu , setKyThu] = useState(props.KyThu)
    const [GetKyThu , setGetKyThu] = useState(props.KyThu[props.KyThu.length-1].IDKyThu)
    const [getYearKythu , setGetYearKythu] = useState(props.KyThu[props.KyThu.length-1].Nam)  
 


    useEffect(()=> {
      if(GetKyThu.length !== 0 && getYearKythu !== 0) {
        axios(`http://localhost:5199/api/ThongKe/getngaytheothangcua1kythu/${getYearKythu}/${GetKyThu}`)
                .then(res => res.data)
                .then(res=> setSoPhieuMoiNgayTrongKy(res))
      }


    },[GetKyThu])


    function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + '-' + month + '-' + day;
  }

   
    const chan = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30,
      ];
      const thang2 = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28,
      ];
      const le = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ];
      var labels = []

    const today = new Date()
    if (KyThu[GetKyThu-1].Thang === today.getMonth() + 1) {
        if (
          KyThu[GetKyThu-1].Thang === 1 ||
          KyThu[GetKyThu-1].Thang === 3 ||
          KyThu[GetKyThu-1].Thang === 5 ||
          KyThu[GetKyThu-1].Thang === 7 ||
          KyThu[GetKyThu-1].Thang === 8 ||
          KyThu[GetKyThu-1].Thang === 10 ||
          KyThu[GetKyThu-1].Thang === 12
        ) {
          labels = le.slice(0, today.getDate());
        }
        if (KyThu[GetKyThu-1].Thang === 2) {
          labels = thang2.slice(0, today.getDate());
        }
        if (KyThu[GetKyThu-1].Thang === 4 || KyThu[GetKyThu-1].Thang === 6 || KyThu[GetKyThu-1].Thang === 9 || KyThu[GetKyThu-1].Thang === 11) {
          labels = chan.slice(0, today.getDate());
        }
      } else {
        if (
          KyThu[GetKyThu-1].Thang === 1 ||
          KyThu[GetKyThu-1].Thang === 3 ||
          KyThu[GetKyThu-1].Thang === 5 ||
          KyThu[GetKyThu-1].Thang === 7 ||
          KyThu[GetKyThu-1].Thang === 8 ||
          KyThu[GetKyThu-1].Thang === 10 ||
          KyThu[GetKyThu-1].Thang === 12
        ) {
          labels = le;
        }
        if (KyThu[GetKyThu-1].Thang === 2) {
          labels = thang2;
        }
        if (KyThu[GetKyThu-1].Thang === 4 || KyThu[GetKyThu-1].Thang === 6 || KyThu[GetKyThu-1].Thang === 9 || KyThu[GetKyThu-1].Thang === 11) {
          labels = chan;
        }
      }

     const [SoPhieuMoiNgayTrongKy , setSoPhieuMoiNgayTrongKy] = useState([{
          HoTen: "",
          IDLoaiKhachHang: 0,
          MaNhanVien: "",
          MaTuyenThu: "",
          NgayTao: "",
          NgayThu: "",
          TenQuanHuyen: "",
          TenTuyenThu: "",
          TenXaPhuong: "",
     }])


    
      var a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      var tongtien = 0
      SoPhieuMoiNgayTrongKy.map(element => {
        
        const getdate = new Date(element.NgayThu);

          if(element.IDLoaiKhachHang === 1) {
              tongtien = 50000
            }
            if(element.IDLoaiKhachHang === 2) {
              tongtien = 100000
            }
           
          a[getdate.getDate()-1] += tongtien
   
      })
     
      console.log()
     
      

    const options = {
        responsive: true,
        plugins: {  
          legend: {
            position: 'top' 
          },
          title: {
            display: true,
            text: 'Biểu đồ doanh thu của ngày trong Kỳ thu ' + GetKyThu + " Năm " + getYearKythu,
          },
        },
      };

    const data = {
        labels,
        datasets: 
        [
          {
            label: 'Doanh thu',
            data: a.map(element => element),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

  return (

    <Box>
      
    <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Kỳ thu</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={GetKyThu}
          label="Kỳ thu"
          onChange={(e)=> {setGetKyThu(e.target.value)}}
        >
          {KyThu.map(element=> {
            return (
              <MenuItem key={element.IDKyThu} value={element.IDKyThu}>{element.TenKyThu}</MenuItem>
            )
          })}
        </Select>

      </FormControl>
    <Line options={options} data={data} />
    
    </Box>
  )
}

export default Chartjs2