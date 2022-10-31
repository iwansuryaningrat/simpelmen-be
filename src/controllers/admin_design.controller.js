import db from "../models/index.js";
const Users = db.users;
const Op = db.Sequelize.Op;
const Products = db.products;
const Orders = db.orders;
const OrderDetails = db.order_details;
const Order_Products = db.order_products;
const Order_Status = db.order_status;
const Product_Finishing = db.product_finishings;
const Product_Material = db.product_materials;
const Product_Category = db.product_categories;
const Delivery_Details = db.delivery_details;
const Retributions = db.retributions;
const Province = db.province;
const City = db.city;
const SubDistrict = db.subdistrict;
import async from "async";

import mailgun from "mailgun-js";


import jwt from "jsonwebtoken";

// Load .env file
import * as dotenv from "dotenv";


dotenv.config();

const showAllOrder = (req, res) => {
    Orders.findAll({
        include: [
            {
                model: OrderDetails,
                as: "order_details",
                include: [
                    {
                        model: Order_Products,
                        as: "order_products",
                    },
                ],
            },
            {
                model: Order_Status,
                as: "order_statuses",
                where: {
                    order_status_admin_code: 4,
                },
            },
        ],
    })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders.",
        });
        });
    }

const ApproveOrderDesain = (req, res) => {
    const id = req.params.id;
    Order_Status.update(
        {
            order_status_admin_code: 6,
        },
        {
            where: {
                order_status_order_id: id,
            },
        }
    )
    .then(() => {
        Order_Status.create({
            order_status_admin_code: 6,
            description: "Tahap Desain Selesai", 
            order_id: id,
        })
        .then((data) => {
            Orders.update(
                {
                    order_status: req.body.order_status,
                },
                {
                    where: {
                        order_id: id,
                    },
                }
            )
            .then(() => {
                res.send({
                    message: "Order was updated successfully.",
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Order with id=" + id,
                });
            });
        }
        )
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Order with id=" + id,
            });
        }
        );
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error updating Order with id=" + id,
        });
    });
};

const UpdateOrderNotApproveDesain = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.SECRET);
    const user_role_id = decoded.user_role_id;
    const id = req.params.id;

    if (user_role_id != 6) {
        res.status(403).send({
        message: "Forbidden",
        });
    } else {
        Order_Status.create({
            order_status_admin_code: 7,
            description: "Desain Belum Disetujui",
            order_id: id,
        })
        .then((data) => {
            Orders.update(
                {
                    order_status: req.body.order_status,
                },
                {
                    where: {
                        order_status_order_id: id,
                    },
                }
            )
            .then(() => {
                res.send({
                    message: "Order was updated successfully.",
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Order with id=" + id,
                });
            });
        }
        )
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Order with id=" + id,
            });
        }
        );
    }
};
    
    

export { showAllOrder, ApproveOrderDesain, UpdateOrderNotApproveDesain };