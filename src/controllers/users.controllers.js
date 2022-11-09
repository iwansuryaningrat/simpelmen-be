import db from "../models/index.js";
const Users = db.users;
const Op = db.Sequelize.Op;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SubDistrict = db.subdistrict;
const City = db.city;
const Province = db.province;
const Role = db.roles;
// Load .env file
import * as dotenv from "dotenv";

dotenv.config();


// Create and Save a new User
const createUser = (req, res) => {
  const { user_name, user_email, user_password, user_role_id } = req.body;

  // Validate request
  if (!user_name || !user_email || !user_password || !user_role_id) {
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
    user_role_id,
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

const findAll = (req, res) => {
  Users.findAll({
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["role_name"],
      },
    ],
  })
  .then((data) => {
    if (data.length > 0) {
      res.send({
        message: "Data found",
        data,
      });
    }
    else {
      res.send({
        message: "Data not found",
      });
    }
  })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "cant retrieve data users or data users is empty",
      });
    }
    );
};

const findOne = (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Users.findOne({
    where: {
      user_id: id,
    },
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["role_name"],
      },
    ],
  })
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

// Update a User by the id in the request
const updateUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "User id can not be empty!",
    });
  }

  Users.update(req.body, {
    where: { user_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        return res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while updating the User.",
      });
    });
};

// Deactivate a User with the specified id in the request
const deactivateUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "User id can not be empty!",
    });
  }

  Users.update(
    { user_status: false },
    {
      where: { user_id: id },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deactivated successfully.",
        });
      } else {
        return res.send({
          message: `Cannot deactivate User with id=${id}!`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while deactivating the User.",
      });
    });
};

// Change password of a User with the specified id in the request
const changePassword = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "User id can not be empty!",
    });
  }

  const { user_password_old, user_password_new } = req.body;

  // Validate request
  if (!user_password_old || !user_password_new) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Users.findOne({ where: { user_id: id } })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      const passwordIsValid = bcrypt.compareSync(
        user_password_old,
        data.user_password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }

      if (user_password_old === user_password_new) {
        return res.status(400).send({
          message: "New password cannot be the same as old password!",
        });
      }

      // Encrypt password
      const hashPassword = bcrypt.hashSync(user_password_new, 8);

      Users.update(
        { user_password: hashPassword },
        {
          where: { user_id: id },
        }
      )
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "User password was changed successfully.",
            });
          } else {
            return res.send({
              message: `Cannot change password of User with id=${id}!`,
            });
          }
        })
        .catch((err) => {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while changing password.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

const userProfile = (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;

  Users.findOne({
    where: {
      user_id: user_id,
    },
    include: [
      {
        model: SubDistrict,
        as: "subdistricts",
        include: [
          {
            model: City,
            as: "cities",
            include: [
              {
                model: Province,
                as: "provinces",
              },
            ],
          },
        ],
      },
      {
        model: Role,
        as: "roles",
      }
    ],
  })
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
    }
    )
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    }
    );

};

const updateProfile = (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;

  //update profile
  Users.update(req.body, {
    where: { user_id: user_id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        return res.send({
          message: `Cannot update User with id=${user_id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while updating the User.",
      });
    });
};

const showAllRole = (req, res) => {
  //find all role if not found "role not found"
  Role.findAll()
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Role not found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving role.",
      });
    });
};

const role = (req, res) => {
  Role.findAll()
    .then((data) => {
      res.send({
        message: "Role was retrieved successfully.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving role.",
      });
    });
};

export {
  createUser,
  findAll,
  findOne,
  updateUser,
  deactivateUser,
  changePassword,
  userProfile,
  updateProfile,
  showAllRole,
  role,
};
