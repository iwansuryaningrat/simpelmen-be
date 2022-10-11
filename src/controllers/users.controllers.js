import db from "../models/index.js";
const Users = db.users;
const Op = db.Sequelize.Op;
import bcrypt from "bcrypt";

// Create and Save a new User
const createUser = (req, res) => {
  const { user_name, user_email, user_password, user_role } = req.body;

  // Validate request
  if (!user_name || !user_email || !user_password || !user_role) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Encrypt password
  const hashPassword = bcrypt.hashSync(user_password, 8);

  // Create a User
  const user = {
    user_name,
    user_email,
    user_password: hashPassword,
    user_role,
  };

  // Save User in the database
  Users.create(user)
    .then((data) => {
      res.send({
        message: "User was created successfully.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
const findAll = (req, res) => {
  const { user_status } = req.query;
  var condition = user_status ? { user_status: user_status } : null;

  Users.findAll({ where: condition })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      res.send({
        message: "Users were retrieved successfully.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id or email
const findOne = (req, res) => {
  const { user_id, user_email } = req.query;
  var condition = user_id
    ? { user_user_id: id }
    : email
    ? { user_email: user_email }
    : null;

  Users.findOne({ where: condition })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      res.send({
        message: "User was retrieved successfully.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

export { createUser, findAll, findOne };
