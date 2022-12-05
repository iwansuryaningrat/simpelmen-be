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
const Retributions = db.retributions;
const Product_Sizes = db.product_sizes;
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
    //order find all
    Orders.findAll({
        include: [
            {
                model: OrderDetails,
                as: "order_details",
                include: [
                    {
                        model: Products,
                        as: "products",
                        //attributes: ["product_id", "product_name", "product_price", "product_stock", "product_description", "product_image", "product_category_id", "product_material_id", "product_finishing_id"],
                        attributes : [ "product_name", "product_price", "product_category", "product_material", "product_finishing" ],
                    },
                ],
            },
            {
                model: Delivery_Details,
                as: "delivery_details",
            },
            {
                model: Order_Status,
                as: "order_statuses",
                where: {
                    order_status_admin_code: 2,
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

const OrderDecline = (req, res) => {
    const order_id = req.params.id;
    Order_Status.create({
        order_status_admin_code: 2,
        order_status_description: "Pesanan PO dalam proses pengecekan ulang",
        order_status_order_id: order_id,
    })
        .then(() => {
            Orders.update(
                {
                    order_status: req.body.order_status,
                },
                {
                    where: {
                        order_id: order_id,
                    },
                },
            )
                .then((num) => {
                    if (num == 1) {
                        res.send({
                            message: "Order was updated successfully.",
                        });
                    } else {
                        res.send({
                            message: `Cannot update Order with id=${order_id}. Maybe Order was not found or req.body is empty!`,
                        });
                    }
                }
                )
                .catch((err) => {
                    res.status(500).send({
                        message: "Error updating Order with id=" + order_id,
                    });
                }
                );
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order.",
            });
        }
        );
    }

const OrderAccept = (req, res) => {
    const order_id = req.params.id;
    Order_Status.update(
        {
            order_status_admin_code: 3,
        },
        {
            where: {
                order_status_order_id: order_id,
            },
        })
        .then(() => {
        Orders.update(
            {
                order_status: req.body.order_status,
            },
            {
                where: {
                    order_id: order_id,
                },
            })
            .then(() => {
            Order_Status.create({
                order_status_admin_code: 3,
                order_status_description: "Order Diterima",
                order_status_order_id: order_id,
            })
            .then(() => {
                Orders.findOne({
                where: {
                    order_id: order_id,
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
                            .replace("{message}", "Pesanan Anda telah diterima dan sedang dalam proses perhitungan biaya")
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


const showAllRetribution = (req, res) => {
    Retributions.findAll({
        include: [
            {
                model: Orders,
                as: "orders",
                include: [
                    {
                        model: OrderDetails,
                        as: "order_details",
                        include: [
                            {
                                model: Products,
                                as: "products",
                                attributes: ["product_id","product_name","product_description","product_material","product_finishing","product_category"],
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
                    {
                        model: Delivery_Details,
                        as: "delivery_details",
                    },
                    {
                        model: Users,
                        as: "users",
                    }
                ],
            },
        ],
    })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving retributions.",
        });
        });
    }

const updateRetribution = (req, res) => {
    const retribution_id = req.params.retribution_id;
    Retributions.update(req.body, {
        where: { retribution_id: retribution_id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Retribution was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Retribution with id=${retribution_id}. Maybe Retribution was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error updating Retribution with id=" + retribution_id,
        });
        });
    }

const showRetributonById = (req, res) => {
    const retribution_id = req.params.retribution_id;
    Retributions.findAll({
        where: {
            retribution_id: retribution_id,
        },
        include: [
            {
                model: Orders,
                as: "orders",
                include: [
                    {
                        model: OrderDetails,
                        as: "order_details",
                        include: [
                            {
                                model: Products,
                                as: "products",
                                attributes: ["product_id","product_name","product_description","product_material","product_finishing","product_category"],
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
                                        model: Product_Sizes,
                                        as: "product_sizes",
                                    },
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
                    {
                        model: Delivery_Details,
                        as: "delivery_details",
                    },
                    {
                        model: Users,
                        as: "users",
                    }
                ],
            },
        ],
    })
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving retributions.",
        });
        });
    }
//remove retribution by id
const removeRetribution = (req, res) => {
    const retribution_id = req.params.retribution_id;
    Retributions.destroy({
        where: { retribution_id: retribution_id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Retribution was deleted successfully!",
            });
        } else {
            res.send({
            message: `Cannot delete Retribution with id=${retribution_id}. Maybe Retribution was not found!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete Retribution with id=" + retribution_id,
        });
        });
    }

const acceptRetribution = (req, res) => {
    const retribution_id = req.params.retribution_id;
    Retributions.update(
        {
            retribution_status: "1",
        },
        {
            where: {
                retribution_id: retribution_id,
            },
        })
        .then(() => {
            Retributions.findOne({
                where: {
                    retribution_id: retribution_id,
                },
                include: [
                    {
                        model: Orders,
                        as: "orders",
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
                                                model: Product_Sizes,
                                                as: "product_sizes",
                                            },
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
                            {
                                model: Delivery_Details,
                                as: "delivery_details",
                            },
                            {
                                model: Users,
                                as: "users",
                            }
                        ],
                    },
                ],
            })
            .then((data) => {
                    const mg = mailgun({
                        apiKey: process.env.MAILGUN_API_KEY,
                        domain: process.env.MAILGUN_DOMAIN,
                    });
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
                            .replace("{message}", "Pesanan anda telah disetujui dan dalam proses selanjutnya.")
                    };
                    mg.messages().send(dataEmail, function (error, body) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(body);
                        }
                    });
                    res.status(200).json({
                        message: "Success",
                    });
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
    };


const rejectRetribution = (req, res) => {
    const retribution_id = req.params.retribution_id;
    Retributions.update(
        {
            retribution_status: "2",
        },
        {
            where: {
                retribution_id: retribution_id,
            },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Retribution was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Retribution with id=${retribution_id}. Maybe Retribution was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error updating Retribution with id=" + retribution_id,
        });
        });
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

const UpdateStatusPAD = (req, res) => {
    const retribution_id = req.params.id;
    Retributions.update(
        {
            retribution_pad_status: req.body.retribution_pad,
        },
        {
            where: {
                retribution_id: retribution_id,
            },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Retribution was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Retribution with id=${retribution_id}. Maybe Retribution was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error updating Retribution with id=" + retribution_id,
        });
        });
    }

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
        },
    ],
    where: {
        order_id: {
            [Op.notIn]: db.sequelize.literal(`(SELECT order_status_order_id FROM order_statuses WHERE order_status_admin_code = 8)`),
        },
    },
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

const showRetributionByDate = (req, res) => {
    const { start_date, end_date } = req.body;
    Retributions.findAll({
        order: [["retribution_id", "DESC"]],
        attributes: ["retribution_id","retribution_jasa_total","retribution_pad_status","createdAt","updatedAt"],
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
        where: {
            createdAt: {
                [Op.between]: [start_date, end_date],
            },
        },
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



export { showAllOrder, OrderDecline, OrderAccept , showAllRetribution, updateRetribution , showRetributonById , removeRetribution, acceptRetribution, rejectRetribution, showPAD, UpdateStatusPAD , RekapPesanaan, showRetributionByDate};