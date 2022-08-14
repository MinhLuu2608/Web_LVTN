
import * as React from 'react'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FilterAutocomplete from './FilterAutocomplete'
import Select from '@mui/material/Select';

export default function ReceiptFilterStatus({ disable, tuyenThu, changeTuyenThu, tuyenThuList,
    thanhToan, changeThanhToan, nhanVienOptions, changeNhanVien }) {

    return (
        <>
            <FormControl style={{ width: 230 }}>
                <InputLabel>Hình thức thanh toán</InputLabel>
                <Select
                    disabled={disable}
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
                thanhToan === 2 || thanhToan === -1
                    ?
                    <>
                        <FormControl style={{ width: 270 }}>
                            <InputLabel>Tuyến thu</InputLabel>
                            <Select
                                disabled
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
                        <FilterAutocomplete disable={true} label={"Tên nhân viên"} options={nhanVienOptions} changeOption={changeNhanVien} />
                    </>
                    :
                    <>
                        <FormControl style={{ width: 270 }}>
                            <InputLabel>Tuyến thu</InputLabel>
                            <Select
                                disabled={disable}
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
                        <FilterAutocomplete disable={disable} label={"Tên nhân viên"} options={nhanVienOptions} changeOption={changeNhanVien} />
                    </>
            }
        </>
    )
}