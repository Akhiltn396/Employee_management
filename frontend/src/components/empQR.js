import axios from 'axios';
import React, { useEffect, useState} from 'react'

function EmpQR() {
  const [QrPassword,setQrPassword] = useState('')
  const [isDelayed, setIsDelayed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const countdownTimer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(countdownTimer);
  }, [timeLeft]);
  useEffect(() => {

    axios.get(`http://localhost:3000/admin/employeeqr`)
      .then(result => {
        //setIsLoginFirst(response.data[0].isLoginFirst);
        console.log(result.data);
       // console.log(JSON.stringify()  );


      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleSubmit = async (e) =>{
    try {
      e.preventDefault()
      const response = await axios.post('http://localhost:3000/admin/employeeqr', { QrPassword}, {

      });

        setQrPassword(response.data.qr.QrPassword)
        //Delaying button click for 30 seconds
        if (!isDelayed) {
          // Handle button click here
          setIsDelayed(true);
          setTimeout(() => setIsDelayed(false), 30000); // delay for 30 seconds
          setTimeLeft(30)
        }

      //console.log(response.data.qr.QrPassword);
    } catch (error) {

    }

  }


  return (
    <div className='qr-main' style={{textAlign:"center"}}>
      <form onSubmit={handleSubmit} >

        <h1>This is your QR</h1>
{
  isDelayed? <h1>{QrPassword}</h1>:<h1>Click button to generate code</h1>
}

        {
          isDelayed&&<h3>Wait for {timeLeft} seconds for generating next code</h3>
        }

        <button type='submit'  disabled={isDelayed} >Click Here for Login Code</button>
</form>
    </div>
  )
}

export default EmpQR
