const mongoose = require('mongoose');
const crypto = require('crypto');


const EmpSchema=new mongoose.Schema({
    empid:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    img:
    {
        name: String,

        data: Buffer,
        contentType: String
    },
    address:{type:String,required:true} ,
    mobilenumber:{type:Number,required:true},
    emergencymobilenumber:{type:Number,required:true},
    aadharcardnum:{type:Number,required:true},
    password: {
        type: String,
        required: true,
      },
      isLoginFirst:{type:String,required:true,default:true},
      loginTime: { type: Date,timezone: 'Asia/Kolkata'
    },
      logoutTime: { type: Date,timezone: 'Asia/Kolkata'
    },


})

module.exports=mongoose.model('Employees',EmpSchema)