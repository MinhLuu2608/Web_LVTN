import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

export default function ServiceFilter({ searchLoaiDichVu, searchTinhTrangDV, changeLoaiDichVu, changeTinhTrangDV }) {

    return (
        <Box sx={{ minWidth: 120 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <FormControl style={{ width: 200 }}>
                    <InputLabel>Loại dịch vụ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={searchLoaiDichVu}
                        label="Loại dịch vụ"
                        onChange={event => changeLoaiDichVu(event.target.value)}
                    >
                        <MenuItem value={1}>Trong nhà</MenuItem>
                        <MenuItem value={2}>Ngoài trời</MenuItem>
                        <MenuItem key="allLoai" value={-1}>Tất cả</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ width: 200 }}>
                    <InputLabel>Tình trạng dịch vụ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={searchTinhTrangDV}
                        label="Tình trạng dịch vụ"
                        onChange={event => changeTinhTrangDV(event.target.value)}
                    >
                        <MenuItem value={1}>Còn hoạt động</MenuItem>
                        <MenuItem value={0}>Ngừng hoạt động</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Box>
    );
}
