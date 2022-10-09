import jwt from "jsonwebtoken";
import db from "../models/index.js";
const Users = db.users;

const isLogin = (req, res, next) => {
  const token = req.header("x-access-token");

  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user_email = decoded.user_email;
    req.user_role_id = decoded.user_role_id;
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Token is not valid",
    });
  }
};

const isActivated = (req, res, next) => {
  const token = req.headers["x-access-token"];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (!decoded.active) {
      return res.status(401).send({
        message: "Email not activated or Token expired!",
      });
    }
    next();
  });
};

export { isLogin, isActivated };
