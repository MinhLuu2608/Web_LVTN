import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';

export default function ReceivedOrderFilter({ searchTenKH, searchTinhTrangXuLy, changeTenKH, changeTinhTrangXuLy }) {

    return (
        <Box sx={{ minWidth: 120 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <TextField
                    value={searchTenKH}
                    style={{ width: 500 }}
                    label="Tên khách hàng"
                    variant="outlined"
                    onChange={changeTenKH}
                />
                <FormControl style={{ width: 200 }}>
                    <InputLabel>Tình trạng xử lý</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={searchTinhTrangXuLy}
                        label="Tình trạng xử lý"
                        onChange={event => changeTinhTrangXuLy(event.target.value)}
                    >
                        <MenuItem value={"Đã tiếp nhận"}>Đã tiếp nhận</MenuItem>
                        <MenuItem value={"Đã hoàn thành"}>Đã hoàn thành</MenuItem>
                        <MenuItem value={"Đã bị huỷ"}>Đã bị huỷ</MenuItem>
                        <MenuItem key="allLoai" value={"-1"}>Tất cả</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Box>
    );
}
