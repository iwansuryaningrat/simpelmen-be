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
import fs from "fs";

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
                model: Order_Status,
                as: "order_statuses",
                where: {
                    order_status_admin_code: 6,
                },
            },
            {
                model: Users,
                as: "users",
                attributes: ["user_id","user_ikm"],
            }
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
                        {
                            model: Product_Finishing,
                            as: "product_finishings",
                            attributes: ["product_finishing_name"],
                        },
                        {
                            model: Product_Material,
                            as: "product_materials",
                            attributes: ["product_material_name"],
                        }
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
        order_status_description: "Belum Diproduksi",
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

const UpdateOrderDalamProduksi = (req, res) => {
    const id = req.params.id;
    Order_Status.create({
        order_status_admin_code: 6,
        order_status_description: "Dalam Produksi",
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

const UpdateOrderSelesaiProduksi = (req, res) => {
    const id = req.params.id;
    Order_Status.update(
        {
            order_status_admin_code: 5,
        },
        {
            where: {
                order_status_order_id: id,
            },
        }
    )
    .then(() => {
        Order_Status.create({
            order_status_admin_code: 5,
            order_status_description: "Pesanan Masuk Gudang", 
            order_status_order_id: id,
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
                Orders.findOne({
                where: {
                    order_id: id,
                },
                include: [
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
                    {
                        model: Users,
                        as:"users",
                    }
                ],
                })
                .then((data) => {
                    const mg = mailgun({
                        apiKey: process.env.MAILGUN_API_KEY,
                        domain: process.env.MAILGUN_DOMAIN,
                    });
                    const html = fs.readFileSync("./src/views/order_notif.html", "utf8");
                    const dataEmail = {
                        from: "admincs@gmail.com",
                        to: data.users.user_email,
                        subject: "Order Diterima",
                        html:
                        html.replace("{order_code}", data.order_code)
                            .replace("{item.products.product_name}", data.order_details.map((item) => {
                                return item.products.product_name
                            }).join(","))
                            .replace("{item.order_detail_quantity}", data.order_details.map((item) => {
                                return item.order_detail_quantity
                            }).join(","))
                            .replace("{message}", "Pesanan Anda telah selesai diproduksi dan akan segera dikemas"),
                    };
                    mg.messages().send(dataEmail, function (error, body) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(body);
                        }
                    });
                    res.send(data);
                })

                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving orders.",
                    });
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Order.",
                });
            });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Order with id=" + order_id,
                });
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order.",
            });
        });
    }
            
export { showAllOrder, showOrderByID, UpdateOrderBelumProduksi, UpdateOrderDalamProduksi, UpdateOrderSelesaiProduksi };