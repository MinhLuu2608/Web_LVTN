import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';

export default function OrderFilter({ searchTenKH, changeTenKH, }) {

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
            </Stack>
        </Box>
    );
}
