import db from "../../models/index.js";
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
            },
            {
                model: Delivery_Details,
                as: "delivery_details",
            },
            {
                model: Order_Status,
                as: "order_statuses",
                where: {
                    order_status_admin_code: 5,
                },
            },
        ],
        order: [["order_id", "DESC"]],
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


const UpdateOrderDikirim = (req, res) => {
    const id = req.params.id;
    Order_Status.create({
        order_status_admin_code: 5,
        order_status_description: "Pesanan Telah Dikirim",
        order_status_order_id: id,
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
};

const UpdateResiPengiriman = (req, res) => {
    const id = req.params.id;
    Delivery_Details.update({
        delivery_detail_receipt: req.body.delivery_detail_receipt,
        delivery_detail_estimate: req.body.delivery_detail_estimate,
    }, {
        where: {
            delivery_detail_order_id: id,
        },
    })
    .then(() => {
        Delivery_Details.findOne({
            where: {
                delivery_detail_order_id: id,
            },
        })
        .then((data) => {
            if (data.delivery_detail_status == 0) {
                setTimeout(() => {
                    Delivery_Details.update({
                        delivery_detail_status: 1,
                    }, {
                        where: {
                            delivery_detail_order_id: id,
                        },
                    })
                    .then(() => {
                        Order_Status.create({
                            order_status_admin_code: 6,
                            order_status_description: "Pesanan telah sampai",
                            order_status_order_id: id,
                        })
                        .then(() => {
                            Delivery_Details.update({
                                delivery_detail_status: 1,
                            }, {
                                where: {
                                    delivery_detail_order_id: id,
                                },
                            })
                            .then(() => {
                                res.send({
                                    message: "Order was updated successfully.",
                                });
                            })

                        })
                    })
                }, 3600000);
            }
        })
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating Order with id=" + id,
        });
    });
};


const UpdateOrderBelumDikirim = (req, res) => {
    const id = req.params.id;
    Order_Status.create({
        order_status_admin_code: 5,
        order_status_description: "Pesanan sedang dikemas untuk dikirim",
        order_status_order_id: id,
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
};


export { showAllOrder, UpdateOrderDikirim, UpdateResiPengiriman, UpdateOrderBelumDikirim };