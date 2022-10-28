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


const showAllOrder = (req, res) => {
    //order find all
    Orders.findAll({
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
                                //attributes: ["product_id", "product_name", "product_price", "product_stock", "product_description", "product_image", "product_category_id", "product_material_id", "product_finishing_id"],
                                attributes : [ "product_name", "product_price", "product_category", "product_material", "product_finishing" ],
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
                        ],
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
        order_status_description: "Order Ditolak",
        order_status_order_id: order_id,
    })
        .then(() => {
            Orders.update(
                {
                    order_status_code: req.body.order_status,
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
                message: err.message || "Some error occurred while creating the Order_Status.",
            });
            }
            );
        }
        )
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order_Status.",
        });
        }
        );
    }
    
    

    //     .then((data) => {
    //     Order_Status.create({
    //         order_status_admin_code: 3,
    //         order_status_description: "Menerima Konfirmasi PO CS",
    //         order_status_order_id: order_id,
    //     })
    //         .then((data) => {
    //         res.send(data);
    //         })
    //         .catch((err) => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating the Order_Status.",
    //         });
    //         });
    //     })
    //     .catch((err) => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while updating the Order_Status.",
    //     });
    //     });
    // }

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
                                model: Order_Products,
                                as: "order_products",
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
                                ],
                            },
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
                                model: Order_Products,
                                as: "order_products",
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
                                ],
                            },
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

//update retributon status to accepted
const acceptRetribution = (req, res) => {
    const retribution_id = req.params.retribution_id;
    Retributions.update(
        {
            retribution_status: "Disetujui",
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

const rejectRetribution = (req, res) => {
    const retribution_id = req.params.retribution_id;
    Retributions.update(
        {
            retribution_status: "Ditolak",
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




export { showAllOrder, OrderDecline, OrderAccept , showAllRetribution, updateRetribution , showRetributonById , removeRetribution, acceptRetribution, rejectRetribution };