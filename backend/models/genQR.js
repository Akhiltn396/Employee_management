const mongoose = require('mongoose');


const QrSchema=new mongoose.Schema({

        QrPassword: {
            type: String,
            expires: 30000
        }

      },{
        timestamps:true
    });





module.exports=mongoose.model('QR',QrSchema)
