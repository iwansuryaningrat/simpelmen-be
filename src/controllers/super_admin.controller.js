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

const DetailRekapPesanan = (req, res) => {
    const id = req.params.id;
    Orders.findOne({
        where: {
            order_id: id,
        },
        include: [
            {
                model: Users,
                as: "users",
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
            },
            {
                model: Delivery_Details,
                as: "delivery_details",
            },
            {
                model: OrderDetails,
                as: "order_details",
                include: [
                    {
                        model: Products,
                        as: "products",
                        attributes: {exclude: ["product_created_at","product_updated_at","product_image"]},
                        include: [
                            {
                                model: Product_Finishing,
                                as: "product_finishings",
                                attributes: ["product_finishing_name"],
                            },
                            {
                                model: Product_Material,
                                as: "product_materials",
                                attributes: ["product_material_name"],
                            },
                            {
                                model: Product_Category,
                                as: "product_categories",
                                attributes: ["product_category_name"],
                            },
                            {
                                model: Product_Sizes,
                                as: "product_sizes",
                            },
                        ],
                    },
                ],
            },
        ],
    })
    .then((data) => {
        res.status(200).send({
            message: "Success get data",
            data: data,
        });

    })
    .catch((err) => {
        res.status(500).send({
            message: "Error retrieving detail order with id=" + id,
        });
    });
}


export { RekapPesanaan, DetailRekapPesanan };