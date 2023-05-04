const jwt = require("jsonwebtoken");

const generateToken = (id) =>{
    return jwt.sign({id},"anykeys",{expiresIn:"10d"})
}
console.log(generateToken());

module.exports=  generateToken