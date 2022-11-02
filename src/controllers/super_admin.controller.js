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
const Product_Sizes = db.product_sizes;
const Roles = db.roles;
const Province = db.province;
const City = db.city;
const SubDistrict = db.subdistrict;
import async from "async";

import mailgun from "mailgun-js";


import jwt from "jsonwebtoken";

// Load .env file
import * as dotenv from "dotenv";
import Order_Details from "../models/order_details.model.js";

dotenv.config();


const RekapPesanaan = (req, res) => {
    Orders.findAll({
    attributes: ["order_id","order_code"],
    include: [
        {
            model: Users,
            as: "users",
            attributes: ["user_ikm"],
        },
        {
            model: Retributions,
            as: "retributions",
            attributes: ["retribution_id","retribution_jasa_total"],
        },
        {
            model: Order_Status,
            as: "order_statuses",
            attributes: ["order_status_admin_code"],
            where: {
                order_status_id: {
                    [Op.eq]: db.sequelize.literal(`(SELECT MAX(order_status_id) FROM order_statuses WHERE order_status_order_id = orders.order_id)`),
                },
            },
            include: [
                {
                    model: Roles,
                    as: "roles",
                    attributes: ["role_name"],
                },
            ],
        },
    ],
    order: [["order_id", "DESC"]],
})
    .then((data) => {
    res.send(data);
    }
    )
    .catch((err) => {
    res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
    });
    }
    );
}


export { RekapPesanaan };