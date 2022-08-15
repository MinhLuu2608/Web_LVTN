import * as React from 'react';
import ReceiptDetailOffline from './ReceiptDetailOffline';
import ReceiptDetailOnline from './ReceiptDetailOnline';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import PrintIcon from '@mui/icons-material/Print';

export default function ReceiptDetailModal({ receiptID, isExport }) {

    const [open, setOpen] = React.useState(false)
    const [ngaythu, setNgayThu] = React.useState('')
    const [ngaytao, setNgayTao] = React.useState('')

    const [tinhTrang, setTinhTrang] = React.useState('')
    const [receipt, setReceipt] = React.useState({})

    async function getData(url) {
        await fetch(url)
            .then(async (respone) => await respone.json())
            .then(async function (receiptInfo) {
                setTinhTrang(receiptInfo.tinhTrang)
                setReceipt(receiptInfo.info[0])
            })
    }

    React.useEffect(() => {
        getData("http://localhost:5199/api/phieuthu/info/" + receiptID)
    }, [receiptID])


    const getFormattedDate = (date) => {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return day + '-' + month + '-' + year;
    }
    const handleOpen = () => {
        setOpen(true);
        setNgayTao(getFormattedDate(new Date(receipt.NgayTao)));
        if (receipt.NgayThu != null) {
            setNgayThu(getFormattedDate(new Date(receipt.NgayThu)));
        } else {
            return "open fail";
        }
    }

    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton onClick={handleOpen}>
                {
                    isExport === true
                        ?
                        <Tooltip sx={{ color: 'var(--color2)' }} title="In hoá đơn">
                            <PrintIcon />
                        </Tooltip>
                        :
                        <Tooltip sx={{ color: 'var(--color7)' }} title="Chi tiết">
                            <VisibilityIcon />
                        </Tooltip>

                }
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    {tinhTrang === "Thanh toán online"
                        ?
                        <ReceiptDetailOnline receipt={receipt} handleClose={handleClose} isExport={isExport} />
                        :
                        <ReceiptDetailOffline receipt={receipt} handleClose={handleClose} isExport={isExport} />
                    }
                </div>
            </Modal>
        </div >
    )
}