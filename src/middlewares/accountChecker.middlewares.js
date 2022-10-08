import jwt from "jsonwebtoken";
import db from "../models/index.js";
const Users = db.users;

const checkEmail = (req, res, next) => {
  const email = req.body.email;

  Users.findOne({
    where: {
      user_email: email,
    },
  })
    .then((data) => {
      if (data) {
        return res.status(406).send({
          message: "Email already exists",
        });
      }

      next();
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

export { checkEmail };
