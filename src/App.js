import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';
import Employee from './Component/Employee/Employee'
import DistrictAndWard from './Component/DistrictAndWard/DistrictAndWard';
import TuyenThuMain from './Component/TuyenThu/TuyenThuMain';
import KyThuMain from './Component/KyThu/KyThuMain';
import EmployeeReceipt from './Component/EmployeeReceipt/EmployeeReceipt';
import HomePrivateStaff from './Component/Home/HomePrivateStaff';
import Customer from './Component/Customer/Customer';
import ReceiptMain from './Component/Receipt/ReceiptMain';
import ServiceMain from './Component/Services/ServiceMain';
import OrderMain from './Component/ServiceOrder/OrderMain';
import ProcessOrderMain from './Component/NeedProcessOrder/OrderMain';

function App() {


  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />
          <Route path='/home' element={<Home />}>
            <Route path='customer' element={<Customer />} />
            <Route path='privatestaff' element={<HomePrivateStaff />} />
            <Route path='customer' element={<Customer collectCustomer={false} />} />
            <Route path='districtandward' element={<DistrictAndWard />} />
            <Route path='empreceipt' element={<EmployeeReceipt />} />
            <Route path='employee' element={<Employee />} />
            <Route path='kythu' element={<KyThuMain />} />
            <Route path='collectcustomer' element={<Customer collectCustomer={true} />} />
            <Route path='tuyenthu' element={<TuyenThuMain />} />
            <Route path='hoadon' element={<ReceiptMain />} />
            <Route path='service' element={<ServiceMain />} />
            <Route path='order' element={<OrderMain />} />
            <Route path='processorder' element={<ProcessOrderMain />} />
            <Route path='receiveorder' element={<ReceiptMain />} />
          </Route>
          <Route path='*' element={<Client />} />

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
