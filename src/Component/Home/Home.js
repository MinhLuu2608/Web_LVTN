import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../../CSS/home.css'
import { QuyenChung } from './HomeMenuData'
import logo from '../../image/Logo.jpg';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import HomeHeader from './HomeHeader';
import { GetCookie, cookie, BreakCookie, resetCookie } from '../Cookie/CookieFunc';
import { LoginContext } from '../LoginContext/LoginContext';
import axios from 'axios';
function Home() {

  var location = useLocation()


  const globaltext = React.useContext(LoginContext)
  const Checklogin = useNavigate();
  GetCookie(document.cookie)
  React.useEffect(() => {

    if (document.cookie === null) {
      Checklogin('')
    } else {
      const today = new Date();
      var hour;
      var minutes;
      var lonhon60 = today.getMinutes() + 15
      if (lonhon60 > 60) {
        hour = today.getHours() + 1
        minutes = (today.getMinutes() + 15) - 60
      } else {
        hour = today.getHours()
        minutes = today.getMinutes() + 15
      }
      if (cookie !== '') {
        resetCookie(cookie, today)
      }
    }

  }, [location])



  // Chiều dài của menu
  const drawerWidth = 260;
  // đặt lại nội dung sau khi mở
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );

  // Đặt lại chiều dài của AppBar
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  //  CSS cho item bên trong menu
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  // UseState dùng để đóng mở form
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  const [mountBox, setMountBox] = useState(false);


  const [infostaff, setInfostaff] = useState([{
    IDNhanVien: 0,
    MaNhanVien: "",
    HoTen: "",
    Email: "",
    GioiTinh: "",
    SoDienThoai: "",
    NgaySinh: "",
    DiaChi: "",
    CCCD: ""
  }])

  const [mastership, setMastership] = useState([{
    IDNhanVien: 0,
    IDQuyen: 0
  }])
  // Xử lý logic


  const ArrayMasterShip = [];
  const ArrayMapMasterShip = [];
  mastership.map(element => {
    ArrayMasterShip.push(element.IDQuyen);
    return element;
  })


  if (ArrayMasterShip.length === 0) {
    BreakCookie(cookie)
    alert("Nhân viên không có quyền")
    window.location.reload();
  }


  for (let i = 0; i < QuyenChung.length; i++) {
    for (let j = 0; j < ArrayMasterShip.length; j++) {
      if (QuyenChung[i].id === ArrayMasterShip[j]) {
        ArrayMapMasterShip.push(QuyenChung[i]);
      }
    }
  }


  React.useEffect(() => {
    axios.get(`http://localhost:5199/api/Login/getinfobyID/${cookie}`)
      .then(res => res.data)
      .then(res => {
        setInfostaff(res);
        globaltext.setInfostaff(res);
        axios.get(`http://localhost:5199/api/Login/getmastership/${cookie}`)
          .then(res => res.data)
          .then(res => {
            setMastership(res)
            axios.get(`http://localhost:5199/api/Login/getquyen/${cookie}`)
              .then(res => res.data)
              .then(res => {
                globaltext.setQuyen(res)
              })
          }

          )
      })
  }, [])

  return (
    <Box sx={{ display: 'flex', width: "100%", height: "100%" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        {/* Header */}
        <Toolbar
          sx={
            {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--color3)',

            }
          }
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Công ty môi trường ENVI
          </Typography>
          {/* Avatar */}
          <div style={{ display: 'flex' }}>




            <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRagbYnTTxSnZDFEKCTsewsoiGdPymC_P-PYqElA1b57xMOEvGiI2rOghDqh7vQ_DNVZkE&usqp=CAU" />
            {/* Tên nhân viên */}

            <Typography variant="h6" noWrap component="div"
              sx={{
                marginLeft: 2,
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'uppercase',
                fontWeight: 100,
                fontSize: 17
              }}
            >
              {infostaff[0].HoTen}
            </Typography>

            <Box
              sx={
                {
                  width: 'auto',
                  height: 'auto',
                  position: 'relative',
                }
              }
            >
              <IconButton onClick={() => { setMountBox(!mountBox) }}
                sx={{ marginLeft: 2 }}
              >
                <MenuIcon
                  sx={{ color: 'white' }}
                />
              </IconButton>

              {mountBox && <HomeHeader />}

            </Box>

          </div>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },

        }}
        variant="persistent"
        anchor="left"
        open={open}
      >

        <DrawerHeader
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '35px',
            paddingRight: '10px'
          }}>
          <img src="" alt='Logo' style={{ width: '50px' }} />

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {
          ArrayMapMasterShip.map(item => (
            // List
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              key={item.id}
            >
              {/* UL */}
              <ListItem disablePadding
                sx={{ color: "var(--color2)" }}
              >

                {/* Icon */}
                <ListItemIcon
                  sx={{
                    marginLeft: '15px',
                  }}>
                  <i className={item.icon}></i>
                </ListItemIcon>

                {/* Text */}
                <ListItemText primary={item.title} />
              </ListItem>
              {/* LI */}
              {item.child.map(itemchild => (
                <Link to={itemchild.path} className="Home__Link" key={itemchild.title}>
                  <ListItem disablePadding >
                    <ListItemButton>
                      <ListItemText inset primary={itemchild.title} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
              <Divider />

            </List>

          ))
        }
      </Drawer>
      {/* Content */}

      <Main open={open} >
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}

export default Home