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
    if (data == null) {
      return res.status(401).send({
        message: "Account is not yet registered",
      });
    }
    if (data.user_status === true) {
      next();
    }
    else {
      return res.status(401).send({
        message: "User is not activated",
      });
    }
  });
};

//order middlewares if order user id is equal to user id from token then next
const isOrderUser = (req, res, next) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;
  const order_id = req.params.order_id;

  Orders.findOne({
    where: {
      order_id: order_id,
    },
  }).then((data) => {
    if (data.order_user_id === user_id) {
      next();
    }
    else {
      return res.status(401).send({
        message: "You are not authorized to access this order",
      });
    }
  });
};

export { isLogin, isActivated , isOrderUser};
