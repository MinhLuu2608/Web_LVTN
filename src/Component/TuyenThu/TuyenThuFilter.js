import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import FilterNhanVien from './FilterNhanVien';

export default function TuyenThuFilter({ trangThai, nhanVien, quanHuyen, xaPhuong, nhanVienList, quanHuyenList, xaPhuongList, changeTrangThai, changeNhanVien, changeQuanHuyen, changeXaPhuong }) {
    let nhanVienOptions = nhanVienList.map((nhanVien, index) => (
        {
            id: nhanVien.IDNhanVien,
            label: nhanVien.HoTen
        }
    ));
    nhanVienOptions.push({
        id: -1,
        label: "Tất cả"
    });

    return (
        <Box sx={{ minWidth: 120 }}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                    <FormControl style={{ width: 200 }}>
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={trangThai}
                            label="Trạng thái"
                            onChange={event => changeTrangThai(event.target.value)}
                        >
                            <MenuItem value={-1}>Chưa triển khai</MenuItem>
                            <MenuItem value={1}>Đang triển khai</MenuItem>
                            <MenuItem value={2}>Đã kết thúc</MenuItem>
                            <MenuItem value={0}>Tất cả</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        
                        trangThai !== -1
                            ? <FilterNhanVien nhanVien={nhanVien} nhanVienOptions={nhanVienOptions} changeNhanVien={changeNhanVien} />
                            : <></>
                    }
                </Stack>
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
                    <FormControl style={{ width: 250 }}>
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
            </Stack>
        </Box>
    );
}
