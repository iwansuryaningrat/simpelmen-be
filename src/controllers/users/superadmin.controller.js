import jwt from "jsonwebtoken";
import db from "../../models/index.js";
const User = db.users;
const Op = db.Sequelize.Op;

const showAllAdmin = (req, res) => {
  try {
    User.findAll({
      where: {
        user_role_id: {
          [Op.ne]: 8,
        },
      },
    }).then((users) => {
      res.status(200).send(users);
    });
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const DeleteAdmin = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        user_id: req.params.user_id,
      },
    });
    res.status(200).send({
      message: "Delete Success",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateAdmin = (req, res) => {
  try {
    User.update(
      {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_ikm: req.body.user_ikm,
        user_contact: req.body.user_contact,
        user_address: req.body.user_address,
        user_district: req.body.user_district,
        user_city: req.body.user_city,
        user_province: req.body.user_province,
        user_postal_code: req.body.user_postal_code,
        user_password: req.body.user_password,
        user_picture: req.body.user_picture,
        user_status: req.body.user_status,
        user_verify: req.body.user_verify,
        user_role_id: req.body.user_role_id,
      },
      {
        where: {
          user_id: req.params.user_id,
        },
      }
    ).then((users) => {
      res.status(200).send({
        message: "Update Success",
        data: users,
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const showProfile = (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;
  try {
    User.findOne({
      where: {
        user_id: user_id,
      },
    }).then((users) => {
      res.status(200).send(users);
    });
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const updateProfile = (req, res) => {
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user_id = decoded.user_id;
  try {
    User.update(
      {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_ikm: req.body.user_ikm,
        user_contact: req.body.user_contact,
        user_address: req.body.user_address,
        user_district: req.body.user_district,
        user_city: req.body.user_city,
        user_province: req.body.user_province,
        user_postal_code: req.body.user_postal_code,
        user_password: req.body.user_password,
        user_picture: req.body.user_picture,
      },
      {
        where: {
          user_id: user_id,
        },
      }
    ).then((users) => {
      res.status(200).send({
        message: "Update Success",
        data: users,
      });
    });
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export {
  showAllAdmin,
  DeleteAdmin,
  updateAdmin,
  showProfile,
  updateProfile,
};
