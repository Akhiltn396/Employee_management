import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



function EmpChangePwd() {
  const [isLoginFirst,setIsLoginFirst] = useState(true)
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  useEffect(() => {

    axios.get('http://localhost:3000/admin/employeeregister')
      .then(result => {
        //setIsLoginFirst(response.data[0].isLoginFirst);
        console.log(result.data[0].isLoginFirst);
       // console.log(JSON.stringify()  );
        setIsLoginFirst(result.data[0].isLoginFirst)

      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  //console.log("log "+isLoginFirst);
const handleSubmit =async (e)=>{
  e.preventDefault()
try {
  await axios.put('http://localhost:3000/employeepassupdate', {  empid,password,isLoginFirst},{
    headers: { Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODE4MjI5MDQsImV4cCI6MTY4MjY4NjkwNH0.whOG_p_iof-Znq0KgxrayNsOVcNW3giXkxIJHoYL9es" },
  })

setIsLoginFirst(false)

 navigate('/')
} catch (error) {
  console.log(error);
  alert('Error saving data');
}
}

  return (
    <div style={{textAlign:"center"}}>
        <h1>Change Your Password</h1>
        <form onSubmit={handleSubmit}>
<label>
        Employee Id:
        <input type="text" value={empid} onChange={(e) => setEmpid(e.target.value)} />
      </label>
      <br/>
     <label>
        Change Password
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br/>
      <button type='submit'  >Login</button>




</form>



    </div>
  )
}

export default EmpChangePwd
