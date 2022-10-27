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
                order_id: id,
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
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order_Status.",
            });
        });
    }
    )
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the Order_Status.",
        });
    }
    );
};

const UpdateOrderNotApproveDesain = (req, res) => {
    const id = req.params.id;
    Order_Status.create({
        order_status_admin_code: 7,
        description: "Desain Belum Disetujui",
        order_id: id,
    })
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order_Status.",
        });
    });
}


export { showAllOrder, ApproveOrderDesain, UpdateOrderNotApproveDesain };