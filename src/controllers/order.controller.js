import db from "../models/index.js";
const Users = db.users;
const Op = db.Sequelize.Op;
const Products = db.products;
const Order_Status = db.order_status;
const Order_Products = db.order_products;
const Orders = db.orders;
const Order_Details = db.order_details;

import jwt from "jsonwebtoken";

// Load .env file
import * as dotenv from "dotenv";

dotenv.config();

// Create order and next() to create order details
const createOrder = (req, res, next) => {
    const { user_id, order_total_price } = req.body;
    
    Orders.create({
        order_user_id: user_id,
        order_total_price: order_total_price,
    })
        .then((data) => {
        req.order_id = data.order_id;
        next();
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order.",
        });
        });
    }
