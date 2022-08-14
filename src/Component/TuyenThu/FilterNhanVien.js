import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FilterNhanVien({ nhanVienOptions, changeNhanVien }) {
    
    return (
        <div>
            <Autocomplete
                disableClearable
                options={nhanVienOptions}
                onChange={(event, newValue) => {
                    changeNhanVien(newValue.id);
                }}
                defaultValue={{
                    id: -1,
                    label: "Tất cả"
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Tên nhân viên" />}
            />
        </div>
    );
}
