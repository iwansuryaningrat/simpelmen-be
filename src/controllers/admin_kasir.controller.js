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
                model: Users,
                as: "users",
                attributes: ["user_id", "user_name", "user_email", "user_ikm"],
            },
            {
                model: Retributions,
                as: "retributions",
                attributes: ["retribution_id", "retribution_pad_status"],
                
            },
            {
                model: Order_Status,
                as: "order_statuses",
                where: {
                    order_status_admin_code: 3,
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

const DpPaymentMethod = (req, res) => {
    const id = req.params.id;
    Orders.update(
        {
            order_payment_method:"DP",
        },
        {
            where: { order_id: id },
        }
    )
    .then(() => {
        Orders.update(
            {
                order_status : req.body.order_status,
            },
            {
                where: { order_id: id },
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
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error updating Order with id=" + id,
        });
    });
}


const LangsungPaymentMethod = (req, res) => {
    const id = req.params.id;
    Orders.update(
        {
            order_payment_method:"Langsung",
        },
        {
            where: { order_id: id },
        }
    )
    .then(() => {
        Orders.update(
            {
                order_status : req.body.order_status,
            },
            {
                where: { order_id: id },
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
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error updating Order with id=" + id,
        });
    });
}

    
const LunasPaymentMethod = (req, res) => {
    const id = req.params.id;
    Orders.update(
        {
            order_payment_status:"Lunas",
        },
        {
            where: { order_id: id },
        }
    )
    .then(() => {
        Order_Status.update(
            {
                order_status_admin_code: 7,
            },
            {
                where: { order_status_order_id: id },
            }
        )
        .then(() => {
            Order_Status.create({
                order_status_admin_code: 7,
                order_status_description: "Pesanan telah dibayar",
                order_status_order_id: id,
            })
            .then(() => {
                res.status(200).send({
                    message: "Orders was updated successfully.",
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Orders with id=" + id,
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Orders with id=" + id,
            });
        });
    }
    )
    .catch((err) => {
        res.status(500).send({
            message: "Error updating Orders with id=" + id,
        });
    }
    );
}

const BelumLunasPaymentMethod = (req, res) => {
    const id = req.params.id;
    Orders.update(
        {
            order_payment_status:"Belum Lunas",
        },
        {
            where: { order_id: id },
        }
    )
    .then(() => {
        Order_Status.update(
            {
                order_status_admin_code: 7,
            },
            {
                where: { order_status_order_id: id },
            }
        )
        .then(() => {
            Order_Status.create({
                order_status_admin_code: 7,
                order_status_description: "Pesanan belum lunas",
                order_status_order_id: id,
            })
            .then(() => {
                res.status(200).send({
                    message: "Orders was updated successfully.",
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Orders with id=" + id,
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Orders with id=" + id,
            });
        });
    }
    )
    .catch((err) => {
        res.status(500).send({
            message: "Error updating Orders with id=" + id,
        });
    }
    );
}
    

const showPAD = (req, res) => {
    Retributions.findAll({
        order: [["retribution_id", "DESC"]],
        attributes:["retribution_id","retribution_jasa_total","retribution_pad_status","createdAt","updatedAt"],
        include: [
            {
                model: Orders,
                as: "orders",
                attributes: ["order_id", "order_user_id","order_code"],
                include: [
                    {
                        model: Users,
                        as: "users",
                        attributes: ["user_ikm"],
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
            message: err.message || "Some error occurred while retrieving PAD.",
        });
        });
    }

export { showAllOrder, DpPaymentMethod, LangsungPaymentMethod, LunasPaymentMethod,BelumLunasPaymentMethod,showPAD };