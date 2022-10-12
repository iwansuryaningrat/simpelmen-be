import jwt from "jsonwebtoken";
import db from "../models/index.js";
const Users = db.users;

// Load .env file
import * as dotenv from "dotenv";
dotenv.config();

const isLogin = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.user_email;
    req.role = decoded.user_role_id;
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Token is not valid",
      errorMessages: err.message,
    });
  }
};

const isActivated = (req, res, next) => {
  const { email } = req.body;

  console.log(email);

  Users.findOne({
    where: {
      user_email: email,
    },
  }).then((data) => {
    if (data.user_status === true) {
      next();
    } else {
      return res.status(401).send({
        message: "User is not activated",
      });
    }
  });
};

export { isLogin, isActivated };
