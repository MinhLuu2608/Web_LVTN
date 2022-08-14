import React from 'react'
import ReceiptList from './ReceiptList';
import "../../CSS/App.css";
import Typography from '@mui/material/Typography';
function EmployeeReceipt() {
  return (
    <div>
      <Typography variant="p"
                sx={
                    {
                        fontSize: 30,
                        color: "var(--color2)",
                        fontWeight: "bold"
                    }
                }
            >
                Danh sách phiếu thu
            </Typography>
      <br></br>
      <ReceiptList />
    </div>
  )
}

export default EmployeeReceipt