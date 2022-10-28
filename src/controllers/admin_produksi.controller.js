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
                    order_status_admin_code: 6,
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

const showOrderByID = (req, res) => {
    const id = req.params.id;

    Orders.findOne({
        where: { order_id: id },
        include: [
            {
                model: OrderDetails,
                as: "order_details",
                include: [
                    {
                        model: Order_Products,
                        as: "order_products",
                        include: [
                            {
                                model: Products,
                                as: "products",
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
                                    }
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    })
        .then((data) => {
        if (data) {
            res.send(data);
        } else {
            res.send({
            message: `Cannot find Order with id=${id}.`,
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error retrieving Order with id=" + id,
        });
        });
    }

const UpdateOrderBelumProduksi = (req, res) => {
    const id = req.params.id;
    Order_Status.create({
        order_status_admin_code: 6,
        description: "Belum Diproduksi",
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
};

const UpdateOrderDalamProduksi = (req, res) => {
    const id = req.params.id;
    Order_Status.create({
        order_status_admin_code: 6,
        description: "Dalam Produksi",
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
};

const UpdateOrderSelesaiProduksi = (req, res) => {
    const id = req.params.id;
    Order_Status.update(
        {
            order_status_admin_code: 5,
        },
        {
            where: {
                order_id: id,
            },
        }
    )
    .then(() => {
        Order_Status.create({
            order_status_admin_code: 5,
            description: "Pesanan Masuk Gudang", 
            order_id: id,
        })
        //then update order_status
        .then(() => {
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
    }
    );
};
            
export { showAllOrder, showOrderByID, UpdateOrderBelumProduksi, UpdateOrderDalamProduksi, UpdateOrderSelesaiProduksi };