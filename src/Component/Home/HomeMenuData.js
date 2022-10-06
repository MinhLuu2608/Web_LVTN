const QuyenChung = [


    {
        // Quan Tri vien
        id: 1,
        icon: 'fi fi-rr-address-book',
        title: "QUẢN LÝ",
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
            {
                title: 'Quản lý dịch vụ',
                path: '/home/service'
            },
            {
                title: 'Quản lý đơn hàng dịch vụ',
                path: '/home/order'
            },
            {
                title: 'Thống kê',
                path: '/home/thongke'
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
                title: 'Danh sách hoá đơn',
                path: '/home/empreceipt'
            },
        ]
    },
    {
        // Dịch vụ
        id: 3,
        icon: 'fi fi-rr-list',
        title: "NHÂN VIÊN DỊCH VỤ",
        // Chức năng
        child: [
            {
                title: 'Danh sách đơn hàng cần xử lý',
                path: '/home/processorder'
            },
            {
                title: 'Danh sách đơn hàng đã nhận',
                path: '/home/receivedorder'
            },
        ]
    },
]




export { QuyenChung, };