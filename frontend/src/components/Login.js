import axios from 'axios';
import React, { useState,useEffect } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';


function Login() {
    const [empid, setEmpid] = useState('');
    const [QrPassword, setQrPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [loginTime, setLoginTime] = useState('');
    const [logoutTime, setLogoutTime] = useState('');
    const [loginTimes, setLoginTimes] = useState(null);
    const [logoutTimes, setLogoutTimes] = useState('');
    const [calculatedTime, setcalculatedTime] = useState('');
    const dispatch = useDispatch();


const buttonHandle =() =>{
  try {
    axios.get(`http://localhost:3000/admin/calc-total-time`)
  .then(result => {


   // console.log(JSON.stringify()  );
  const index = result.data.currentTime.findIndex(user => user.name === userId);

  const value = Math.abs(index);
  //  console.log(value);
  //  console.log(result.data.currentTime[value].loginTime);
  //  console.log(result.data.currentTime[value].logoutTime);
  setLoginTime(result.data.currentTime[value].loginTime)
   setLogoutTime(result.data.currentTime[value].logoutTime)


  //  console.log(result.data[index].);

  })
  .catch(error => {
    console.log(error);
  });
   const hour = moment(loginTime).hours();
    const minute = moment(loginTime).minutes();
    const second = moment(loginTime).seconds();
    const calcLogin = `${hour}:${minute}:${second}`
    setLoginTimes(calcLogin)

    console.log(calcLogin);
    console.log(`${hour}:${minute}:${second}`);
console.log(loginTimes);
    const hours = moment(logoutTime).hours();
    const minutes = moment(logoutTime).minutes();
    const seconds = moment(logoutTime).seconds();
    console.log(`${hours}:${minutes}:${seconds}`);
    const calcLogout = `${hours}:${minutes}:${seconds}`
    setLogoutTimes(calcLogout)



    // const calculatedTime = moment.duration(calcLogout.diff(calcLogin))
    // console.log(calculatedTime);
    const startTime = moment(calcLogin, 'HH:mm:ss');
const endTime = moment(calcLogout, 'HH:mm:ss');
const diffInMilliseconds = endTime.diff(startTime);
const diffDuration = moment.duration(diffInMilliseconds);

const diffHours = diffDuration.hours();
const diffMinutes = diffDuration.minutes();
const diffSeconds = diffDuration.seconds();

console.log(`The time difference between ${startTime.format('HH:mm:ss')} and ${endTime.format('HH:mm:ss')} is ${diffHours}:${diffMinutes}:${diffSeconds}`);
setcalculatedTime(`The time difference between ${startTime.format('HH:mm:ss')} and ${endTime.format('HH:mm:ss')} is ${diffHours} hr ${diffMinutes} min ${diffSeconds} sec`)
console.log(loginTimes);

// console.log(`Time difference: ${calculatedTime()} hours`);
  } catch (error) {
    console.log(error);
  }

}

const handleLogin = async (e) =>{
    e.preventDefault()


   try {
    await axios.post('http://localhost:3000/login', {  empid,QrPassword},{

})

alert("Login Succesfull")

console.log(loginTimes);

   } catch (error) {
    console.log(error);
   }
}
const handleLogout =async (e) =>{
    e.preventDefault()
    try {
     await axios.post('http://localhost:3000/logout', {  empid},{

 })
 alert("Logout Succesfull")
    } catch (error) {
     console.log(error);
    }

}
  return (
    <div>
      <h1>Login</h1>
        <div>
        <label>
        Employee Id:
        <input type="text" value={empid} onChange={(e) => setEmpid(e.target.value)} />
      </label>
      <br/>
     <label>
        QR Password
        <input type="text" value={QrPassword} onChange={(e) => setQrPassword(e.target.value)} />
      </label>
      <br/>

        <button onClick={handleLogin}>Login</button>
        </div>
        <h1>Logout</h1>

        <div>
        <label>
        Employee Id:
        <input type="text" value={empid} onChange={(e) => setEmpid(e.target.value)} />
      </label>
      <button onClick={handleLogout}>Logout</button>



        </div>
        <h1>Calculate login and logout difference</h1>
        <label>
          Enter Employee Id:
          <input type="text" value={userId} onChange={event => setUserId(event.target.value)} />
        </label>
        <button type="submit" onClick={buttonHandle}>Get Last Login Time</button>
<h3>Login Time is {loginTimes}</h3>
<h3>Logout Time is{logoutTimes}</h3>
<h1> {calculatedTime}</h1>




    </div>
  )
}

export default Login
