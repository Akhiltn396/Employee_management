import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


function EmployeesDetsilsdashboard() {
    const [data, setData] = useState([]);
    console.log(data);


    useEffect(() => {

        axios.get(`http://localhost:3003/admin/dashboard/employeedetails`)
          .then(result => {
            console.log(result.data[0].empid);
            setData(result.data)

          })
          .catch(error => {
            console.log(error);
          });
      }, []);

  return (
    <div>
        <h1>Employees Details</h1>
         <ul>
         {Array.isArray(data) && data.map(item => (
        <div key={item._id}>

            <h2><Link to={`${item._id}`}>{item.name}</Link></h2>
            <h4>Id: {item.empid}</h4>
            <hr />
        </div>

      ))}
      </ul>

    </div>
  )
}

export default EmployeesDetsilsdashboard
