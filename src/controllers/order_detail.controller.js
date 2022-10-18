import db from "../models/index.js";
const Users = db.users;
const Op = db.Sequelize.Op;
const Products = db.products;
const Orders = db.orders;
const OrderDetails = db.order_details;
const Order_Products = db.order_products;


import jwt from "jsonwebtoken";

// Load .env file
import * as dotenv from "dotenv";

dotenv.config();

//create Order_Details , Order_Products , Orders in one transaction
const createOrder = (req, res, next) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    const { order_total_price, order_quantity , order_note , order_price , order_design , order_payment_method , order_payment_status , order_product_id, panjang_1, panjang_2,lebar_1,lebar_2,tinggi_1,tinggi_2  } = req.body;
    db.sequelize.transaction((t) => {
        return Orders.create({
            order_user_id: user_id,
            order_total_price: order_total_price,
            order_quantity: order_quantity,
            order_note: order_note,
            order_price: order_price,
            order_design: order_design,
            order_payment_method: order_payment_method,
            order_payment_status: order_payment_status,
        }, { transaction: t })
            .then((data) => {
                req.order_id = data.order_id;
                return Order_Products.create({
                    order_product_order_id: req.order_id,
                    order_product_product_id: order_product_id,
                }, { transaction: t })
                    .then((data) => {
                        return OrderDetails.create({
                            order_detail_order_product_id: data.order_product_id,
                            p1: panjang_1,
                            p2: panjang_2,
                            l1: lebar_1,
                            l2: lebar_2,
                            t1: tinggi_1,
                            t2: tinggi_2,
                        }, { transaction: t })
                    })
            })
    })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order.",
            });
        });
}

const showOrder = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id
        },
        include: [
            {
                model: Order_Products,
                as: "order_products",
                include: [
                    {
                        model: Products,
                        as: "products",
                    },
                    {
                        model: OrderDetails,
                        as: "order_details",

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
}


export { createOrder ,showOrder};


