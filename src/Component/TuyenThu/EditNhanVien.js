import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function EditNhanVien({ defaultIDNhanVien, defaultLabelNhanVien, nhanVienList, changeNhanVien }) {


    let nhanVienOptions = nhanVienList.map((nhanVien, index) => (
        {
            id: nhanVien.IDNhanVien,
            label: nhanVien.HoTen
        }
    ));
    nhanVienOptions.push({
        id: -1,
        label: "None"
    });

    return (
        <div>
            <Autocomplete
                disableClearable
                options={nhanVienOptions}
                onChange={(event, newValue) => {
                    changeNhanVien(newValue.id);
                }}
                defaultValue={ defaultIDNhanVien === null ? {
                    id: -1,
                    label: "None"
                } : {
                    id: defaultIDNhanVien,
                    label: defaultLabelNhanVien
                } }
                sx={{ width : 500}}
                renderInput={(params) => <TextField {...params} label="Tên nhân viên" />}
                isOptionEqualToValue={(option, value) => option.id === value.id}
            />
        </div>
    );
}
