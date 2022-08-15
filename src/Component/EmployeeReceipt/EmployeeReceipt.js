import React from 'react'
import "../../CSS/App.css";
import Typography from '@mui/material/Typography';
import ReceiptMain from './ReceiptMain';
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
      <ReceiptMain />
    </div>
  )
}

export default EmployeeReceipt