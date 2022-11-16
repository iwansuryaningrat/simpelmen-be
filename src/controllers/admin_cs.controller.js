import db from "../models/index.js";
const Users = db.users;
const Op = db.Sequelize.Op;
const Products = db.products;
const Orders = db.orders;
const OrderDetails = db.order_details;
const Order_Status = db.order_status;
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

// Load .env file
import * as dotenv from "dotenv";

dotenv.config();

const findAllOrder = (req, res) => {    
    Order_Status.findAll({
        where: {
            order_status_admin_code: "2",
        },
        include: [
            {
                model: Orders,
                as: "orders",
                include: [
                    {
                        model: Users,
                        as: "users",
                    },
                    {
                        model: OrderDetails,
                        as: "order_details",
                        include: [
                            {
                                model: Products,
                                as: "products",
                            },
                        ],
                    },
                ],
            },
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

const updateOrder = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const order_id = req.params.order_id;
    Order_Status.update(
        {
            order_status_admin_code: "3",
        },
        {
            where: {
                order_status_order_id: order_id,
            },
        }
    )
        .then((data) => {
            //make new data
            Order_Status.create({
                order_status_order_id: order_id,
                order_status_admin_code: "3",
                order_status_description: "Order Accepted",
            })
        })
        //order status updated and send email to user
        .then(() => {
            Orders.findOne({
                where: {
                    order_id: order_id,
                },
                include: [
                    {
                        model: Users,
                        as: "users",
                    },
                ],
            })
                .then((data) => {
                    const mg = mailgun({
                        apiKey: process.env.MAILGUN_API_KEY,
                        domain: process.env.MAILGUN_DOMAIN,
                    });
                    const dataEmail = {
                        from: "admin@cs.com",
                        to: data.users.user_email,
                        subject: "Order Accepted",
                        text: "Your order has been accepted",
                    };
                    mg.messages().send(dataEmail, function (error, body) {
                        console.log(body);
                    }
                    );
                })
        })
        .then(() => {
            res.send({
                message: "Order Accepted",
            });
        }
        )
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating Order.",
            });
        }
        );
};




export { findAllOrder, updateOrder };
