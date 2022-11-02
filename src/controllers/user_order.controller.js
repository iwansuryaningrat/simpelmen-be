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
const Jenis_Products = db.jenis_products;
const Retributions = db.retributions;
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


const showStatusOrder = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id,
        },
        include: [
            //order_status latest status
            {
                model: Order_Status,
                as: "order_statuses",
                where: {
                    order_status_id: {
                        //latest id
                        [Op.eq]: db.sequelize.literal(`(SELECT MAX(order_status_id) FROM order_statuses WHERE order_status_order_id = orders.order_id)`),
                    },
                },
            },
            {
                model: Order_Products,
                as: "order_products",
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
                        model: OrderDetails,
                        as: "order_details",
                    },
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

export { showStatusOrder };