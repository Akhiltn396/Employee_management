import React, { useState,useEffect } from 'react';
import axios from 'axios';

const EmpRegistration = () => {
    const [empid, setEmpid] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [img, setImg] = useState('');
  const [address, setAddress] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [emergencymobilenumber, setEmergencyMobilenumber] = useState('');
  const [aadharcardnum, setAadharcardnum] = useState('');
  const [error,setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empid ||!name || !email || !img || !address || !mobilenumber || !emergencymobilenumber || !aadharcardnum) {
      setError('All fields are required');
      return;
    }
    try {
      await axios.post('http://localhost:3000/admin/employeeregister', {  empid,name,email,img,address,mobilenumber,emergencymobilenumber,aadharcardnum});


      alert('Data saved successfully');

    } catch (err) {
      console.log(err);
      alert('Error saving data');
    }
  };






  return (
    <div style={{textAlign:"center"}}>
      {error && <h1>{error}</h1>}
    <form onSubmit={handleSubmit}>

    <label>
        Employee Id:
        <input type="text" value={empid} onChange={(e) => setEmpid(e.target.value)} />
      </label>
      <br/>
     <label>
        Username:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br/>

      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br/>
      <label>
        Image:
        <input type="file" onChange={(e)=>setImg(e.target.files[0])} />
      </label>
      <br/>


      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <br/>

      <label>
        Mobile Number:
        <input type="text" value={mobilenumber} onChange={(e) => setMobilenumber(e.target.value)} />
      </label>
      <br/>
      <label>
        Emergency Mobile Number:
        <input type="text" value={emergencymobilenumber} onChange={(e) => setEmergencyMobilenumber(e.target.value)} />
      </label>
      <br/>

      <label>
        Adhar Card Number:
        <input type="text" value={aadharcardnum} onChange={(e) => setAadharcardnum(e.target.value)} />
      </label>
      <br/>








      <button type="submit">Register Employee</button>



    </form>

    </div>
  );
};

export default EmpRegistration;
