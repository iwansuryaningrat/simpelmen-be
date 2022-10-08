import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isActivated = (req, res, next) => {
  let token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (decoded.active == 0) {
      return res.status(401).send({
        message: "Email not activated or Token expired!",
      });
    }
    next();
  });
};

export { verifyToken, isActivated };
