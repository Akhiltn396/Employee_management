const getTokenFromHeader = (req) =>{
    const headerObj = req.headers;
    const token = headerObj.authorization.split(" ")[1] //calling tokens without bearer in header thunder client
  // console.log(token);
   //console.log(typeof(headerObj.authorization.split(" ")[1]));
    if(token !== undefined){
        return token
    }else{
        return {
            status:"failed",
            message:"There is no token attached to the header"
        }
    }
}
module.exports = getTokenFromHeader