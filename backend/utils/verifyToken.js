const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  //console.log(tokens);
  return jwt.verify(token, "anykeys", (err, decoded) => {
    //console.log(decoded.id);

    if (err) {
      return false;
    } else {

      return decoded;

    }
  });
};
module.exports = verifyToken;
