const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isActivated = (req, res, next) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, config.secret, (err, decoded) => {
    if (decoded.active == 0) {
      return res.status(401).send({
        message: "Email not activated or Token expired!"
      });
    }
    next();
  });
};
isAdmin = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], config.secret, (err, decoded) => {
    User.findOne({
      where: {
        id: decoded.id,
        role: decoded.role
      }
    }).then(user => {
      if (user.role === "admin") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
   });
  }
  );
};
isAdminKasir = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], config.secret, (err, decoded) => {
    User.findOne({
      where: {
        id: decoded.id,
        role: decoded.role
      }
    }).then(user => {
      if (user.role === "kasir") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
   });
  }
  );
};
isAdminCS = (req, res, next) => {
  jwt.verify(req.headers["x-access-token"], config.secret, (err, decoded) => {
    User.findOne({
      where: {
        id: decoded.id,
        role: decoded.role
      }
    }).then(user => {
      if (user.role === "cs") {
        next();
      } else {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
   });
  }
  );
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAdminKasir: isAdminKasir,
  isAdminCS: isAdminCS,
  isActivated: isActivated
};
module.exports = authJwt;