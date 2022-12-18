import db from "../models/index.js";
const Users = db.users;
const Op = db.Sequelize.Op;
const Products = db.products;
const Orders = db.orders;
const OrderDetails = db.order_details;
const Order_Status = db.order_status;
const Product_Finishing = db.product_finishings;
const Product_Material = db.product_materials;
const Product_Category = db.product_categories;
const Delivery_Details = db.delivery_details;
const Jenis_Products = db.jenis_products;
import fs from "fs";
import multer from "multer";

import * as dotenv from "dotenv";

dotenv.config();


const showStatusOrder = (req, res, next) => {
    const user_id = req.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id,
            order_id: {
                [Op.notIn]: db.sequelize.literal(`(SELECT order_status_order_id FROM order_statuses WHERE order_status_admin_code = 8)`),
            },
        },
        include: [
            {
                model: Order_Status,
                as: "order_statuses",
                where: {
                    order_status_id: {
                        [Op.eq]: db.sequelize.literal(`(SELECT MAX(order_status_id) FROM order_statuses WHERE order_status_order_id = orders.order_id)`),
                    },
                },
            },
            {
            
                model: OrderDetails,
                as: "order_details",
                include: [
                    {
                        model: Products,
                        as: "products",
                        attributes: {
                            exclude: ["product_image"],
                        },
                        include: [
                            {
                                model: Product_Finishing,
                                as: "product_finishings",
                            },
                            {
                                model: Product_Material,
                                as: "product_materials",
                            },
                            {
                                model: Product_Category,
                                as: "product_categories",
                            },
                            {
                                model: Jenis_Products,
                                as: "jenis_products",
                            },

                        ],
                    },
                    {
                        model: Product_Finishing,
                        as: "product_finishings",
                        attributes: ["product_finishing_name"],
                    },
                    {
                        model: Product_Material,
                        as: "product_materials",
                        attributes: ["product_material_name"],
                    }
                ],
            },
        ],
        order: [
            ['order_id', 'DESC']
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Orders.",
            });
        });
};


const acceptOrder = (req, res) => {
    const user_id = req.user_id;
    const order_id = req.params.id;

    Orders.findOne({
        where: {
            order_id: order_id,
            order_user_id: user_id,
        },
    })
        .then((data) => {
            if (data == null) {
                return res.status(401).send({
                    message: "You are not authorized to accept this order",
                });
            }
            else {
                Delivery_Details.findOne({
                    where: {
                        delivery_detail_order_id: order_id,
                    },
                })
                    .then((data) => {
                        Delivery_Details.update(
                            {
                                delivery_detail_status: 1,
                            },
                            {
                                where: {
                                    delivery_detail_order_id: order_id
                                },
                            }
                        )
                            .then((data) => {
                                Order_Status.create({
                                    order_status_admin_code: 6,
                                    order_status_description: "Pesanan telah diterima",
                                    order_status_order_id: order_id,
                                })
                                    .then((data) => {
                                        res.send(data);
                                    })
                                    .catch((err) => {
                                        res.status(500).send({
                                            message: err.message || "Some error occurred while creating the Order_Status.",
                                        });
                                    });
                            })
                            .catch((err) => {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while updating the Delivery_Details.",
                                });
                            });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while retrieving the Delivery_Details.",
                        });
                    });
            }
        })
};

//upload file image with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
});

const uploadImage = (req, res,next) => {
    const user_id = req.user_id;
    const order_id = req.params.id;
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }
    Orders.findOne({
        where: {
            order_id: order_id,
            order_user_id: user_id,
        },
    })
        .then((data) => {
            if (data == null) {
                return res.status(401).send({
                    message: "You are not authorized to upload image to this order",
                });
            }
            else {
                OrderDetails.update(
                    {
                        order_details_design_image: file.filename,
                    },
                    {
                        where: {
                            order_details_order_id: order_id,
                        },
                    }
                )
                    .then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while updating the OrderDetails.",
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the Orders.",

            });
        });
};


export { showStatusOrder , acceptOrder, uploadImage };