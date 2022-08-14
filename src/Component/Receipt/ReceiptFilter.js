import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import FilterAutocomplete from './FilterAutocomplete';

export default function ReceiptFilter({
    thanhToan, kyThu, khachHang, loaiKhachHang, tuyenThu, trangThai, nhanVien, quanHuyen, xaPhuong,
    kyThuList, khachHangList, loaiKhachHangList, tuyenThuList, nhanVienList, quanHuyenList, xaPhuongList,
    changeThanhToan, changeKyThu, changeKhachHang, changeLoaiKhachHang, changeTuyenThu, changeTrangThai, changeNhanVien, changeQuanHuyen, changeXaPhuong
}) {
    let nhanVienOptions = nhanVienList.map((nhanVien) => (
        {
            id: nhanVien.IDNhanVien,
            label: nhanVien.HoTen
        }
    ));
    nhanVienOptions.push({
        id: -1,
        label: "Tất cả"
    });

    let khachHangOptions = khachHangList.map((khachHang) => (
        {
            id: khachHang.IDKhachHang,
            label: khachHang.HoTenKH
        }
    ))
    khachHangOptions.push({
        id: -1,
        label: "Tất cả"
    })

    return (
        <Box sx={{ minWidth: 120 }}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                    <FormControl style={{ width: 200 }}>
                        <InputLabel>Quận huyện</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={quanHuyen}
                            label="Quận huyện"
                            onChange={event => changeQuanHuyen(event.target.value)}
                        >
                            {
                                quanHuyenList.map(quanHuyen => (
                                    <MenuItem key={quanHuyen.IDQuanHuyen} value={quanHuyen.IDQuanHuyen}> {quanHuyen.TenQuanHuyen} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-QuanHuyen" value={-1}>Tất cả</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: 270 }}>
                        <InputLabel>Tuyến thu</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={tuyenThu}
                            label="Tuyến thu"
                            onChange={event => changeTuyenThu(event.target.value)}
                        >
                            {
                                tuyenThuList.map(tuyenThu => (
                                    <MenuItem key={tuyenThu.IDTuyenThu} value={tuyenThu.IDTuyenThu}> {tuyenThu.TenTuyenThu} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-TuyenThu" value={-1}>Tất cả</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: 180 }}>
                        <InputLabel>Xã phường</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={xaPhuong}
                            label="Xã phường"
                            onChange={event => changeXaPhuong(event.target.value)}
                        >
                            {
                                xaPhuongList.map(xaPhuong => (
                                    <MenuItem key={xaPhuong.IDXaPhuong} value={xaPhuong.IDXaPhuong}> {xaPhuong.TenXaPhuong} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-XaPhuong" value={-1}>Tất cả</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} >
                    <FormControl style={{ width: 250 }}>
                        <InputLabel>Kỳ thu</InputLabel>
                        <Select
                            value={kyThu}
                            label="Kỳ thu"
                            onChange={event => changeKyThu(event.target.value)}
                        >
                            {
                                kyThuList.map(kyThu => (
                                    <MenuItem key={kyThu.IDKyThu} value={kyThu.IDKyThu}> {kyThu.TenKyThu} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-Loai" value={-1}>Tất cả</MenuItem>
                        </Select>
                    </FormControl>
                    <FilterAutocomplete label={"Tên khách hàng"} options={khachHangOptions} changeOption={changeKhachHang} />
                    <FormControl style={{ width: 200 }}>
                        <InputLabel>Loại khách hàng</InputLabel>
                        <Select
                            value={loaiKhachHang}
                            label="Loại khách hàng"
                            onChange={event => changeLoaiKhachHang(event.target.value)}
                        >
                            {
                                loaiKhachHangList.map(loaiKhachHang => (
                                    <MenuItem key={loaiKhachHang.IDLoaiKhachHang} value={loaiKhachHang.IDLoaiKhachHang}> {loaiKhachHang.TenLoai} </MenuItem>
                                ))
                            }
                            <MenuItem key="all-Loai" value={-1}>Tất cả</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={3} >
                    <FormControl style={{ width: 230 }}>
                        <InputLabel>Hình thức thanh toán</InputLabel>
                        <Select
                            value={thanhToan}
                            label="Hình thức thanh toán"
                            onChange={event => changeThanhToan(event.target.value)}
                        >
                            <MenuItem key="1" value={1}>Trực tiếp</MenuItem>
                            <MenuItem key="2" value={2}>Online</MenuItem>
                            <MenuItem key="all-ThanhToan" value={-1}>Tất cả</MenuItem>
                        </Select>
                    </FormControl>
                    {

                        thanhToan === 2
                            ? <></>
                            : <FilterAutocomplete label={"Tên nhân viên"} options={nhanVienOptions} changeOption={changeNhanVien} />
                    }
                    <FormControl style={{ width: 200 }}>
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            value={trangThai}
                            label="Trạng thái"
                            onChange={event => changeTrangThai(event.target.value)}
                        >
                            <MenuItem key="1" value={1}>Đã thu</MenuItem>
                            <MenuItem key="2" value={2}>Chưa thu</MenuItem>
                            <MenuItem key="all-Loai" value={-1}>Tất cả</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
        </Box>
    );
}
