import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};



export default function EmployeeFormDelete({ employee, getIDQuyenByIDNhanVien, empRoles, roles, handleResetPage }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    function deleteEmp(id) {
        //console.log('http://localhost:5199/api/nhanvien/' + id);
        //console.log(addEmpRoles);
        fetch('http://localhost:5199/api/nhanvien/' + id, {
            method: 'DELETE'
        })
        .then(alert("Xóa Nhân Viên Thành Công"))
        .then(() => handleClose())
        .then(() =>{
            handleResetPage();
        })
    }
    const [checkNV, setCheckNV] = React.useState(false);
    const [buttonDisplay, setButtonDisplay] = React.useState('default');
    const currentEmpRole = getIDQuyenByIDNhanVien(employee.IDNhanVien, empRoles, roles);
    async function checkTuyenThuNV(){
        await fetch('http://localhost:5199/api/nhanvien/checktuyenthu/' + employee.IDNhanVien)
        .then(response => response.json())
        .then((data) => setCheckNV(data))
        .then(() => handleCheckTuyenThuNV(checkNV))
    }
    
    function handleCheckTuyenThuNV(checkNV){
        if(!checkNV || currentEmpRole.length === 0){
            setButtonDisplay('hidden');
        }else{
            setButtonDisplay('visible');
        }
    }

    checkTuyenThuNV()
    
    return (
        <div>
            <Stack direction="column" spacing={2} alignItems="flex-end" onClick={(!checkNV || currentEmpRole.length === 0) ? undefined : handleOpen} marginBottom={1}>
                <IconButton variant="text" color="error" sx={{visibility: buttonDisplay}}>
                    <Tooltip title="Xoá">
                        <DeleteIcon
                            sx={{ color: 'var(--color9)' }}
                        />
                    </Tooltip>
                </IconButton>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 20 }}>
                        Xác Nhận Xoá Nhân Viên
                    </Typography>
                    <Typography id="post-request-error-handling" variant="h4" style={{ paddingBottom: 40 }}>
                        {employee.HoTen}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-evenly" >
                        <Button variant="contained" onClick={(e) => deleteEmp(employee.IDNhanVien)}>Xác Nhận</Button>
                        <Button variant="contained" onClick={handleClose}>Huỷ</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}