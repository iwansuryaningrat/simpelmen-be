import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.user;
const Op = db.Sequelize.Op;
const adminBoard = (req, res) => {
    res.status(200).send("SuperAdmin");
  };

const showAllAdmin = (req, res) => {
    User.findAll({
        where: {
            role: {
                [Op.not]: "user"
            }
        }
    }).then((users) => {
        res.status(200).send(users);
    });
};

const DeleteAdmin = (req, res) => {
    User.destroy({
        where: {
            user_id: req.params.id
        }
    }).then((users) => {
        res.status(200).send({
            message: "Delete Success",
            data: users
        });
    });
};

const updateAdmin = (req, res) => {
    User.update({
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        active: req.body.active
    }, {
        where: {
            user_id: req.params.id
        }
    }).then((users) => {
        res.status(200).send({
            message: "Update Success",
            data: users
        });
    }
    );

};
export { adminBoard, showAllAdmin, DeleteAdmin, updateAdmin };