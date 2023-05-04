import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getData } from '../../react-redux/action';


function SingleEmployeeDetails({data,getData}) {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();

    useEffect(() => {
      getData();
    }, []);
  useEffect(() => {
    axios.get(`http://localhost:3003/admin/dashboard/employeedetails/${id}`)
      .then(response => {

        setEmployee(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <h1>Employee Details</h1>
      <p>Name: {employee.name}</p>
      <p>Id: {employee.empid}</p>
      <p>Mobile Number: {employee.mobilenumber}</p>
      {data.map(item => (
        <div key={id}>

           <h1>Login Time{item.loginTime}</h1>
           <h1>Logout Time{item.logoutTime}</h1>


            </div>
      ))}


    </div>
  );
}
const mapStateToProps = state => ({
  data: state.myReducer.data,
});

export default connect(mapStateToProps, { getData })(SingleEmployeeDetails);


