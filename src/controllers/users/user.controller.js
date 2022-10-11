import jwt from "jsonwebtoken";
import db from "../../models/index.js";
const User = db.users;
const Province = db.province;
const City = db.city;
const SubDistrict = db.subdistrict;

const showProfile = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    try {
        User.findOne({
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
            ],
        }).then((user) => {
            res.status(200).send(user);
        }
        );
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving users.",
        });
    }           
};

const updateProfile = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user_id = decoded.user_id;
    //if update password verify old password first
    if (req.body.user_password) {
        User.findOne({
            where: {
                user_id: user_id,
            },
        }).then((user) => {
            if (user.user_password === req.body.verify_password) {
                User.update(
                    {
                        user_name: req.body.user_name,
                        user_email: req.body.user_email,
                        user_ikm: req.body.user_ikm,
                        user_contact: req.body.user_contact,
                        user_address: req.body.user_address,
                        subdistrict_id: req.body.user_district_id,
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
            } else {
                res.status(400).send({
                    message: "password is wrong",
                });
            }
        });
    }
}
const getPronvince = (req, res) => {
    try {
        Province.findAll().then((province) => {
            res.status(200).send(province);
        });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getCity = (req, res) => {
    City.findAll({
        where: {
            province_id: req.body.province_id,
        },
    }).then((city) => {
        res.status(200).send({
            message: "Success",
            data: city,
        });
    });
};

const getSubDistrict = (req, res) => {
    SubDistrict.findAll({
        where: {
            city_id: req.body.city_id,
        },
    }).then((subdistrict) => {
        res.status(200).send({
            message: "Success",
            data: subdistrict,
        });
    });
};

export { showProfile, updateProfile, getCity, getSubDistrict, getPronvince };


//notes : edit password with authenticate password