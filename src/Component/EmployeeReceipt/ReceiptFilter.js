import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import FilterAutocomplete from './FilterAutocomplete';

export default function ReceiptFilter({
    thanhToan, kyThu, khachHang, loaiKhachHang, trangThai,
    kyThuList, khachHangList, loaiKhachHangList,
    changeThanhToan, changeKyThu, changeKhachHang, changeLoaiKhachHang, changeTrangThai,
}) {
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
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                    <FilterAutocomplete disable={false} label={"Tên khách hàng"} options={khachHangOptions} changeOption={changeKhachHang} />
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
                    {
                        trangThai === 2 || trangThai === -1
                            ?
                            <FormControl style={{ width: 230 }}>
                                <InputLabel>Hình thức thanh toán</InputLabel>
                                <Select
                                    disabled={true}
                                    value={thanhToan}
                                    label="Hình thức thanh toán"
                                    onChange={event => changeThanhToan(event.target.value)}
                                >
                                    <MenuItem key="1" value={1}>Trực tiếp</MenuItem>
                                    <MenuItem key="2" value={2}>Online</MenuItem>
                                    <MenuItem key="all-ThanhToan" value={-1}>Tất cả</MenuItem>
                                </Select>
                            </FormControl>
                            :
                            <FormControl style={{ width: 230 }}>
                                <InputLabel>Hình thức thanh toán</InputLabel>
                                <Select
                                    disabled={false}
                                    value={thanhToan}
                                    label="Hình thức thanh toán"
                                    onChange={event => changeThanhToan(event.target.value)}
                                >
                                    <MenuItem key="1" value={1}>Trực tiếp</MenuItem>
                                    <MenuItem key="2" value={2}>Online</MenuItem>
                                    <MenuItem key="all-ThanhToan" value={-1}>Tất cả</MenuItem>
                                </Select>
                            </FormControl>

                    }
                </Stack>
            </Stack>
        </Box>
    );
}
