import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

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

const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { khachhang: ws }, SheetNames: ["khachhang"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const khachhang = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(khachhang, fileName + fileExtension);
};

export default function ExportFileExcel({ customers, handleResetPage }) {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        exportToCSV(handleExportCustomer(customers), 'khachhang');
        handleResetPage();
        handleClose()
    };

    function getFormattedDate(date) {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return day + '/' + month + '/' + year;
    }

    const handleExportCustomer = function (Customers) {
        var chosenExportCustomers = [];
        if (Customers.length > 0) {
            Customers
                .map(function (customer) {
                    var ngayKetThuc
                    if (customer.NgayKetThuc !== null) {
                        ngayKetThuc = getFormattedDate(new Date(customer.NgayKetThuc))
                    } else {
                        ngayKetThuc = ""
                    }
                    var trangthai
                    if (customer.TrangThai === 1) {
                        trangthai = "??ang s??? d???ng"
                    } else {
                        trangthai = "T???m d???ng s??? d???ng"
                    }
                    var chosenExportCustomer = {
                        "ID Kh??ch H??ng": customer.IDKhachHang,
                        "M?? Kh??ch H??ng": customer.MaKhachHang,
                        "H??? T??n Kh??ch H??ng": customer.HoTenKH,
                        "C??n C?????c C??ng D??n": customer.CCCD,
                        "Lo???i Kh??ch H??ng": customer.TenLoai,
                        "?????a Ch???": customer.DiaChi,
                        "X?? Ph?????ng": customer.TenXaPhuong,
                        "Qu???n Huy???n": customer.TenQuanHuyen,
                        "Ng??y T???o Kh??ch H??ng": getFormattedDate(new Date(customer.NgayTao)),
                        "Tr???ng Th??i": trangthai,
                        "Ng??y ng???ng s??? d???ng": ngayKetThuc
                    }
                    chosenExportCustomers.push(chosenExportCustomer)
                }
                )
        }
        return (chosenExportCustomers)
    }

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'var(--color7)' }}>Xu???t File Excel</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="post-request-error-handling" variant="h5" style={{ paddingBottom: 20 }}>
                        X??c Nh???n Xu???t File Excel
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-evenly" marginTop={3}>
                        <Button variant="contained" onClick={handleSubmit}>X??c Nh???n</Button>
                        <Button variant="contained" onClick={handleClose}>Hu???</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}