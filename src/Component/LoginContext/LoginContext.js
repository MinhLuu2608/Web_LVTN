import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BreakCookie, cookie, CreateCookie, GetCookie , resetCookie } from "../Cookie/CookieFunc";
import { useLocation  } from "react-router-dom";

const LoginContext = createContext();

function LoginProvider ({children}) {
  

    const Checklogin  = useNavigate();

    
    GetCookie(document.cookie)
    const [login,setLogin] = useState(cookie);



    const [infostaff ,setInfostaff] = useState([{
        IDNhanVien: 1,
        MaNhanVien: "NV0001",
        HoTen: "Nguyễn Văn Ba",
        Email: "vanba1992@gmail.com",
        GioiTinh: "Nam",
        SoDienThoai: "0917562368",
        NgaySinh: "1992-04-24T00:00:00",
        DiaChi: "Xuân Khánh ,Ninh Kiều, Cần Thơ",
        CCCD: "092300003871"
      }])
    //  Kiểm tra cookie để điều hướng URL
    const [quyen,setQuyen] = useState([{
        TenQuyen : ""
    }])
    
    useEffect(()=> {
    if(login.length !==0 ) {
       Checklogin('home')
    }else {
        Checklogin('')
    }
   },[login])
    
   const updateInfoPrivateStaff = () => {
        axios.get(`http://localhost:5199/api/NhanVien/${cookie}`)
        .then(res=>res.data)
        .then(res=> setInfostaff(res))
   }



    const SetCookie = (value) => {
        setLogin(value)
    }
        const value = {
            login,
            SetCookie,
            setInfostaff,
            infostaff,
            setQuyen,
            quyen,
            updateInfoPrivateStaff,
        }
    return(
        <LoginContext.Provider value={value}>
              {children}
        </LoginContext.Provider>
    )
}


export {LoginContext , LoginProvider}