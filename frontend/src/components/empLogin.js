import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";



import axios from 'axios';



function EmpLogin() {
  const navigate = useNavigate();
    const [empid, setEmpid] = useState('');
    const [password, setPassword] = useState('');
    const [acc,setAcc] = useState('')
    const [isLoggedIn,setIsLoggedIn] = useState(true)
    const [isLoginFirst,setIsLoginFirst] = useState()
    const [user,setUser] = useState()
    const [error,setError] = useState('');



    useEffect(() => {

      axios.get(`http://localhost:3000/admin/employeeregister`)
        .then(result => {
          //setIsLoginFirst(response.data[0].isLoginFirst);
          console.log(result.data);
          //console.log(result.data[0].isLoginFirst);
         // console.log(JSON.stringify()  );
          setIsLoginFirst(result.data[0].isLoginFirst)

        })
        .catch(error => {
          console.log(error);
        });
    }, [setIsLoginFirst]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!empid || !password) {
          setError('All fields are required');
          return;
        }

        try {
         const response = await axios.post('http://localhost:3000/employeelogin', {  empid,password}, {
          headers: { Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODE4MjI5MDQsImV4cCI6MTY4MjY4NjkwNH0.whOG_p_iof-Znq0KgxrayNsOVcNW3giXkxIJHoYL9es" },

        });
        setUser(response.data.id)
         console.log(response.data.isLoginFirst);
         console.log(response.data.status);

            if(response.data.status==="success"){
              setAcc("Your account creation is"+" "+JSON.stringify(response.data.status).replace(/"/g, ''))
              if (response.data.isLoginFirst==='true') {
                navigate('/employeepasswordchange');
              }else{
                navigate('/')
              }

            }else{
                setAcc("Invalid Login Credentials")
            }

        } catch (err) {
          console.log(err);
          alert('Error saving data');
        }
      };

  return (
    <div style={{textAlign:"center"}}>
            {error && <h1>{error}</h1>}

<form onSubmit={handleSubmit}>
{
        acc&&<h1>{acc}</h1>
    }
<label>
        Employee Id:
        <input type="text" value={empid} onChange={(e) => setEmpid(e.target.value)} />
      </label>
      <br/>
     <label>
        Employee Password
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br/>
      <button type='submit' >Login</button>







</form>






    </div>
  )
}

export default EmpLogin


