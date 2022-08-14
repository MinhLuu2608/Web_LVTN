import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

export default function KyThuFilter({ month, year, years, changeMonth, changeYear }) {

    return (
        <Box sx={{ minWidth: 120 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <FormControl style={{ width: 200 }}>
                    <InputLabel>Tháng</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={month}
                        label="Tháng"
                        onChange={event => changeMonth(event.target.value)}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem key="allMonths" value={-1}>Tất cả</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ width: 200 }}>
                    <InputLabel>Năm</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={year}
                        label="Năm"
                        onChange={event => changeYear(event.target.value)}
                    >
                        {
                            years.map(year => (
                                <MenuItem key={year.Nam} value={year.Nam}> {year.Nam} </MenuItem>
                            ))
                        }
                        <MenuItem key="allYears" value={-1}>Tất cả</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Box>
    );
}
