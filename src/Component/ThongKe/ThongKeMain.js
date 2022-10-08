import React from "react"
import Typography from '@mui/material/Typography'
import ThongKeDoanhThu from "./ThongKeDoanhThu"
import ThongKeKhachHang from "./ThongKeKhachHang";

export default function ThongKeMain() {
    return (
        <>
            <Typography
                variant="p"
                sx={{ fontSize: 30, color: "var(--color2)", fontWeight: "bold" }}
                align="center"
            >
                Thống kê
            </Typography>

            <ThongKeDoanhThu />
            <ThongKeKhachHang />

        </>
    );
}
