
const getTokenFromHeader = require("./getTokenFromHeader");
const verifyToken = require("./verifyToken");


const isLogin = (req,res,next) =>{
    //get token from the header
    const token = getTokenFromHeader(req);

    //verify
     const decodedUser=verifyToken(token)
     //console.log(decodedUser);

     //save user into req object
     req.user =  decodedUser.id
     //console.log(req.user);

     if(!decodedUser){
        return next( 'Invalid/Expired Token,PLease Login Again',404)
     }
     next()

}
module.exports=isLogin