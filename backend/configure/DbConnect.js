const mongoose=require('mongoose')

module.exports.Dbconnect=async ()=>{
   try {
    await mongoose.connect('mongodb://localhost:27017/emp-login')
    console.log('db connceted');
   } catch (error) {
    console.log('db failed',error);
   }
}
