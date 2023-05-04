
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import './App.css';
import { Provider } from 'react-redux';

import Layout from './components/Layout';
import NoPage from './components/NoPage';
import EmpRegistration from './components/empRegistration';
import React from 'react';
import Home from './components/Home';
import EmpQR from './components/empQR';
import EmpLogin from './components/empLogin';
import EmpChangePwd from './components/empChangePwd';
import Login from './components/Login';
import SingleEmployeeDetails from './components/admin/SingleEmployeeDetails';
import EmployeesDetsilsdashboard from './components/admin/employeesdashboard';
import { createStore,applyMiddleware  } from 'redux';
import rootReducer from './react-redux/reducers';
import thunk from "redux-thunk"


const store = createStore(rootReducer,applyMiddleware(thunk));

function App() {

  return (
    <>
     <Provider store={store}>
     <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="admin/employeeregister" element={<EmpRegistration />} />

          <Route path="admin/employeeqr" element={<EmpQR />} />
          <Route path="admin/dashboard/employeedetails" element={<EmployeesDetsilsdashboard />} />
          <Route path="admin/dashboard/employeedetails/:id" element={<SingleEmployeeDetails />} />
          <Route path="employeelogin" element={<EmpLogin />} />
          <Route path="employeepasswordchange" element={<EmpChangePwd />} />
          <Route path="login" element={<Login />} />

        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  </BrowserRouter>

     </Provider>
    </>



  );
}

export default App;
