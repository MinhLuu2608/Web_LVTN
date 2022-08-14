import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);
function ChartRound(props) {

    const [NhanVien,setNhanVien] = useState(0)
    const [KhachHang,setKhachHang] = useState(0)
    const [TuyenThu,setTuyenThu] = useState(0)

        useEffect(()=> {
            axios.get("http://localhost:5199/api/ThongKe/GetCountNhanVien")
                .then(res=>res.data)
                .then(res=>{setNhanVien(res)})
            axios.get("http://localhost:5199/api/ThongKe/GetCountTuyenThu")
                .then(res=>res.data)
                .then(res=>{setTuyenThu(res)})  
            axios.get("http://localhost:5199/api/ThongKe/GetCountKhachHang")
                .then(res=>res.data)
                .then(res=>{setKhachHang(res)})
        },[])

        

    const data = {
        labels: ['Nhân viên', 'Khách hàng', 'Kỳ thu', 'Tuyến thu'],
        datasets: [
          {
            label: '# of Votes',
            data: [NhanVien, KhachHang, props.KyThu.length, TuyenThu],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
             
            ],
            borderWidth: 2,
          },
        ],
      };


  return (

    
    <Pie data={data}/>
  )
}

export default ChartRound