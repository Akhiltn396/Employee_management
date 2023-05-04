const express = require("express")
const app = express()
const Employees = require('./models/empLogin')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
const cors = require('cors');
const dbconnect = require('./configure/DbConnect');
const generateToken = require("./utils/generateToken");
const isLogin = require("./utils/isLogin");
const QR = require("./models/genQR");
var multer = require('multer');
const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());


dbconnect.Dbconnect()


app.post('/admin/employeeregister',async (req, res) => {
   const { empid,name,email,img,address,mobilenumber,emergencymobilenumber,aadharcardnum } = req.body
   console.log(req.body);
   try {


      const password = Math.random().toString().substr(2, 6)
      //Check all fields are included or not
      if(!empid || !name || !email || !address ||!mobilenumber || !emergencymobilenumber || !aadharcardnum){
        res.json({message:"All fields are required"})
    }

     const employe = await Employees.create({
      empid,name,email,address,mobilenumber,emergencymobilenumber,aadharcardnum,password,img
     })
   } catch (error) {
     console.log(error);
   }
   res.json({
     status: "success",

   })
 })
 app.get('/admin/employeeregister', async (req, res) => {
  const {empid,password,isLoginFirst} = req.body;
  try {
    const id = req.params.id
    console.log(id);
    const employee = await Employees.find(id,empid,password,isLoginFirst)


    res.json(employee);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
 app.post('/employeelogin',isLogin, async (req, res) => {


   const { empid, password,name } = req.body

   try {
   // console.log(req.employee)
     let empFound = await Employees.findOne({ empid});

     console.log(empFound.password);
     console.log(password);
     console.log(empFound.name);
     const isLoginFirst = empFound.isLoginFirst



      if ( empFound.password !== password) {
        return res.json({ error: "Invalid password" });
       }
       else {

           res.json({ status: "success" ,
           id:empFound._id,
           isLoginFirst,
           token:generateToken(empFound._id)

         }
           )
    }
  }

    catch (error) {
     console.log(error.message,500);
   }


 })
 app.post('/admin/employeeqr', async (req, res) => {

  try {
    const QrPassword = Math.random().toString().substr(2, 6)

    const qr = await QR.create({QrPassword}

     )

    //  const id = QrPassword._id
     const now = new Date();
     const expirationTime = now.setSeconds(now.getSeconds() - 30); // 30 seconds ago
     const result = await QR.deleteMany({ createdAt: { $lte: expirationTime } });
     console.log(result);

     const emp = await QR.find({QrPassword})
  //    const index = emp.findIndex(user => user.name === QrPassword);


  // const value = Math.abs(index);
  // console.log(value);

      // Wait for 30 seconds before setting the password to "no password"
      setTimeout(() => {
        emp[0].QrPassword = "no password";

        // Save the updated user object to the database
        emp[0].save();
      }, 30000); // 30 seconds in milliseconds



    res.json({
      status:"success",
      qr
    });

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.get('/admin/employeeqr', async (req, res) => {
  const {QrPassword} = req.body;
  try {

    const qr = await QR.find(QrPassword)


    res.json(qr);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.put('/employeepassupdate', isLogin,async (req, res) => {
  const {empid,password } = req.body
  const isLoginFirst =false

  try {
   // console.log(req.user);
   let empFound = await Employees.findOne({ empid });


     const id = empFound._id
     console.log(empFound._id);


     await Employees.findByIdAndUpdate(id,{
     password,isLoginFirst
    })
  } catch (error) {
    console.log(error);
  }
  res.json({
    status: "success",


  })
})
app.post('/login', async (req, res) => {


  const { QrPassword,empid } = req.body

  try {
  // console.log(req.employee);
    let QrFound = await QR.findOne({ QrPassword});

    console.log(QrFound.QrPassword);
    let emp = await Employees.findOne({ empid});
    console.log(emp._id.valueOf());

     if ( QrFound.QrPassword !== QrPassword) {
       return res.json({ error: "Invalid Qr " });
      }


        const id = emp._id.valueOf()

        const loginTime = new Date();

        const employee = await Employees.findByIdAndUpdate(id,{  loginTime });
        console.log(employee);



          res.json({ status: "Logged In Successfully" ,
        }
          )



 }

   catch (error) {
    console.log(error.message,500);
  }


})
app.post('/logout', async (req, res) => {
  const { empid } = req.body;

 try {
  let emp = await Employees.findOne( {empid});

  console.log(emp);

  console.log(emp._id.valueOf());
  //const id = emp._id
  // const time = new Date();
  // console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
  // const timeConverter = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()

  // const logoutTime =  timeConverter
  // d = new Date();
  // utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  // nd = new Date(utc + (3600000*+5.5));
  // console.log(nd);
  // var logoutTime =  nd.toLocaleString();
  // console.log(logoutTime);
  // const employee = await Employees.findByIdAndUpdate(id,{  logoutTime });
  // console.log(employee);
  const id = emp._id.valueOf()

  const logoutTime = new Date();

  const employee = await Employees.findByIdAndUpdate(id,{  logoutTime });
  console.log(employee);

  res.json({ status: "Logged Out Successfully" ,
  logoutTime

  }
    )
 } catch (error) {
  console.log(error);
 }
});
app.get('/admin/calc-total-time', async (req, res) => {
const {empid} = req.body
  try {
    const currentTime = await Employees.find(empid);
    console.log(currentTime);


    res.json({

currentTime



  }
    )
  } catch (error) {
    console.log(error);
  }


 })

 app.get('/admin/dashboard/employeedetails',async (req,res)=>{

    const {empid,password,isLoginFirst} = req.body;
  try {
    const id = req.params.id
    console.log(id);
    const employee = await Employees.find(id,empid,password,isLoginFirst)


    res.json(employee);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

  }
)
app.get('/admin/dashboard/employeedetails/:id',async (req,res)=>{


try {
  const id = req.params.id
  console.log(id);
  const employee = await Employees.findById(id)


  res.json(employee);

} catch (error) {
  console.error(error);
  res.sendStatus(500);
}

}
)


app.get('/dashboards', async (req, res) => {
  // const start = new Date(req.params.start);
  // const end = new Date(req.params.end);
  const {empid} = req.body
  try {
    const employees = await Employees.find({
      empid
    });
    console.log(employees);
const logoutTime = employees.logoutTime;
const loginTime = employees.loginTime;


      const duration = logoutTime - loginTime // Duration in hours
      console.log(typeof(duration));
      console.log(duration);
      res.json({ status: "Success" ,


      }
        )
  } catch (error) {
    console.log(error)
  }

    // return {
    //   name: employee.name,
    //   duration: duration.toFixed(2)
    // };


  //res.render('dashboard', { data });
});

app.listen(3003,()=>{
   console.log("server started");
})