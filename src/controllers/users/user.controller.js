import jwt from "jsonwebtoken";
import db from "../../models/index.js";
const User = db.users;

const showProfile = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
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
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
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
}

export { showProfile, updateProfile };
