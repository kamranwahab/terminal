require("dotenv").config();
const jwt = require("jsonwebtoken");


isLoggedIn = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  }

  isAdmin = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      if(decoded.type == 'Admin'){
        req.userData = decoded;
        next();
      }else{
          res.status(401).send("User not Uthorized to Access this route")
      }
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  }

  module.exports = isLoggedIn
  module.exports = isAdmin