const QuyenChung = [


    {
        // Quan Tri vien
        id: 1,
        icon: 'fi fi-rr-address-book',
        title: "QUẢN TRỊ VIÊN",
        // Chức năng
        child: [
            {
                title: 'Quản lý nhân viên',
                path: '/home/employee'
            },
            {
                title: 'Quản lý khách hàng',
                path: '/home/customer'
            },
            {
                title: 'Quản lý tỉnh thành',
                path: '/home/districtandward'
            },
            {
                title: 'Quản lý Kỳ thu',
                path: '/home/kythu'
            },
            {
                title: 'Quản lý hoá đơn',
                path: '/home/hoadon'
            },
            {
                title: 'Quản lý tuyến thu',
                path: '/home/tuyenthu'
            },
        ]
    },
    {
        // Thu tien
        id: 2,
        icon: 'fi fi-rr-dollar',
        title: "NHÂN VIÊN THU TIỀN",
        // Chức năng
        child: [
            {
                title: 'Danh sách khách hàng',
                path: '/home/collectcustomer'
            },
            {
                title: 'Danh sách phiếu thu',
                path: '/home/empreceipt'
            },
        ]
    },
    {
        // Báo cáo thống kê
        id: 3,
        icon: 'fi fi-rr-chart-pie',
        title: "BÁO CÁO THỐNG KÊ",
        // Chức năng
        child: [
            {
                title: 'Doanh thu',
                path: '/home/turnover'
            },
            {
                title: 'Thống kê khách hàng',
                path: '/home/statistical'
            },
        ]

    },


]




export { QuyenChung, };