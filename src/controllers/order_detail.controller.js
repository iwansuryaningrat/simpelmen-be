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
import Order_Details from "../models/order_details.model.js";

dotenv.config();

const makeOrderCode = (order_id) => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const romanMonth = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
    ];
    const order_code = `${order_id}/BIKDK/${romanMonth[month - 1]}/${year}`;
    return order_code;
};

const addCart = (req, res, next) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    const user_email = decoded.user_email;
    const product_id = req.params.id;
    const { order_total_price, order_quantity , order_note , order_price , order_design , order_payment_method , order_payment_status , order_product_id, panjang_1, panjang_2,lebar_1,lebar_2,tinggi_1,tinggi_2 } = req.body;
    db.sequelize.transaction(function (t) {
        return Orders.create({
            order_user_id: user_id,
            order_code : makeOrderCode(1),
            order_total_price: order_total_price,
            order_quantity: order_quantity,
            order_note: order_note,
            order_price: order_price,
            order_design: order_design,
            order_payment_method: order_payment_method,
            order_payment_status: order_payment_status,
        }, { transaction: t })
        .then(function (order) {
            return Order_Products.create({
                order_product_order_id: order.order_id,
                order_product_product_id: product_id,
            },{ transaction: t })
            .then((data) => {
                return OrderDetails.create({
                    order_detail_order_id: order.order_id,
                    order_detail_order_product_id: data.order_product_id,
                    p1: panjang_1,
                    p2: panjang_2,
                    l1: lebar_1,
                    l2: lebar_2,
                    t1: tinggi_1,
                    t2: tinggi_2,
                },{ transaction: t })
            })
            .then((data) => {
                return Order_Status.create({
                    order_status_order_id: order.order_id,
                    order_status_user_id: user_id,
                    order_status_admin_code: "8",
                    order_status_description: "Di Keranjang",
                },{ transaction: t })
            })
        })
    }).then(function (result) {
        res.status(200).send({
            message: "Order Created",
        });
    }).catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order.",
        });
    });
};

//create Order_Details , Order_Products , Orders , Order_Status in one transaction and make order_code with order_id and product_category and function makeOrderCode
// const addCart = (req, res, next) => {
//     const token = req.headers["x-access-token"];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user_id = decoded.user_id;
//     const user_email = decoded.user_email;
//     const product_id = req.params.id;
//     const { order_total_price, order_quantity , order_note , order_price , order_design , order_payment_method , order_payment_status , order_product_id, panjang_1, panjang_2,lebar_1,lebar_2,tinggi_1,tinggi_2 } = req.body;
//     db.sequelize.transaction(function (t) {
//         return Orders.create({
//             order_user_id: user_id,
//             order_total_price: order_total_price,
//             order_quantity: order_quantity,
//             order_note: order_note,
//             order_price: order_price,
//             order_design: order_design,
//             order_payment_method: order_payment_method,
//             order_payment_status: order_payment_status,
//         }, { transaction: t })
//         .then(function (order) {
//             return Order_Products.create({
//                 order_product_order_id: order.order_id,
//                 order_product_product_id: product_id,
//             },{ transaction: t })
//             .then((data) => {
//                 return OrderDetails.create({
//                     order_detail_order_id: order.order_id,
//                     order_detail_order_product_id: data.order_product_id,
//                     p1: panjang_1,
//                     p2: panjang_2,
//                     l1: lebar_1,
//                     l2: lebar_2,
//                     t1: tinggi_1,
//                     t2: tinggi_2,
//                 },{ transaction: t })
//             })
//             .then((data) => {
//                 return Order_Status.create({
//                     order_status_order_id: order.order_id,
//                     order_status_user_id: user_id,
//                     order_status_admin_code: "8",
//                     order_status_description: "Order Created",
//                 },{ transaction: t })
//             })
//             .then((data) => {
//                 return Products.findOne({
//                     where: {
//                         product_id: product_id,
//                     },
//                 })
//                 .then((product) => {
//                     return Orders.update({
//                         order_code: makeOrderCode(order.order_id),
//                     },{
//                         where: {
//                             order_id: order.order_id,
//                         },
//                     })
//                 })
//             }
//             )
//         })
//     }).then(function (result) {
//         res.status(200).send({
//             message: "Order Created",
//         });
//     }).catch(function (err) {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the Order.",
//         });
//     });
// };


const findAllCart = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id
        },
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
                                model: Product_Category,
                                as: "product_categories",
                            },
                            {
                                model: Product_Material,
                                as: "product_materials",
                            },
                            {
                                model: Product_Finishing,
                                as: "product_finishings",
                            },
                        ], 
                    },
                ],
            },
            {
                model: OrderDetails,
                as: "order_details",
            },
            {
                model: Order_Status,
                as: "order_statuses",
                attributes: ["order_status_admin_code"],
                where: {
                    order_status_admin_code: "8"
                }
            },
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
}

const CheckoutOrder = async (req, res) => {
    const { order_id } = req.query;
    if (!order_id) {
        res.status(400).send({
            message: "Order ID is required",
        });
        return;
    }
    const delivery_detail = await Delivery_Details.findOne({
        where: {
            delivery_detail_order_id: order_id,
        },
    });
    if (delivery_detail) {
        res.status(400).send({
            message: "Error Checkout Order",
        });
        return;
    }
    const { delivery_detail_name,delivery_detail_ikm, delivery_detail_email, delivery_detail_contact, delivery_detail_method, delivery_detail_address, delivery_detail_district,delivery_detail_postal_code, delivery_detail_shipping_cost,delivery_detail_courier,delivery_detail_receipt,delivery_detail_estimate } = req.body;
    const order_id_string = order_id.toString();
    const order_id_array_string = order_id_string.split(",");
    const order_id_array = order_id_array_string.map(Number);
    for (let i = 0; i < order_id_array.length; i++) {
        await db.sequelize.transaction(function (t) {
            return Delivery_Details.create({
                delivery_detail_order_id: order_id_array[i],
                delivery_detail_name: delivery_detail_name,
                delivery_detail_ikm: delivery_detail_ikm,
                delivery_detail_email: delivery_detail_email,
                delivery_detail_contact: delivery_detail_contact,
                delivery_detail_method: delivery_detail_method,
                delivery_detail_address: delivery_detail_address,
                delivery_detail_district: delivery_detail_district,
                delivery_detail_postal_code: delivery_detail_postal_code,
                delivery_detail_shipping_cost: delivery_detail_shipping_cost,
                delivery_detail_courier: delivery_detail_courier,
                delivery_detail_receipt: delivery_detail_receipt,
                delivery_detail_estimate: delivery_detail_estimate,
            }, { transaction: t }).then(function (delivery) {
                return Order_Status.update(
                    {
                        order_status_admin_code: "2",
                        order_status_description: "Watting for Approve Admin Customer Service",
                    },
                    {
                        where: {
                            order_status_order_id: order_id_array[i],
                        },
                    }
                )
            })
            .then(function (order) {
                return Retributions.create({
                    retribution_order_id: order_id_array[i],
                    retribution_status: "0",
                })
            })
        }).then(function (result) {
            res.status(200).send({
                message: "Order has been check Admin Customer Service.",
            });
        }).catch(function (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order.",
            });
        });
    }
};


// const findUserCheckout = (req, res) => {
//     const token = req.headers["x-access-token"];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user_id = decoded.user_id;
//     Users.findOne({
//         where: {
//             user_id: user_id,
//         },
//         attributes: {
//             exclude: ["user_password","user_role_id","user_status","user_created_at","user_updated_at"],
//         },
//         include: [
//             {
//                 model: SubDistrict,
//                 as: "subdistricts",
//                 include: [
//                     {
//                         model: City,
//                         as: "cities",
//                         include: [
//                             {
//                                 model: Province,
//                                 as: "provinces",
//                             },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     })
//         .then((data) => {
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving Users.",
//             });
//         });
// };

const removeCart = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    const order_id = req.params.id;
    if (!order_id) {
        res.status(400).send({
            message: "Order ID is required",
        });
        return;
    }
    Orders.findOne({
        where: {
            order_id: order_id,
        },
    })
        .then((data) => {
            if (data.order_user_id !== user_id) {
                res.status(400).send({
                    message: "Error Remove Cart",
                });
                return;
            }
            db.sequelize.transaction(function (t) {
                return Order_Status.destroy(
                    {
                        where: {
                            order_status_order_id: order_id,
                        },
                    },
                    { transaction: t }
                ).then(function (order_status) {
                    return OrderDetails.destroy(
                        {
                            where: {
                                order_detail_order_id: order_id,
                            },
                        },
                        { transaction: t }
                    );
                }).then(function (order_detail) {
                    return Order_Products.destroy(
                        {
                            where: {
                                order_product_order_id: order_id,
                            },
                        },
                        { transaction: t }
                    );
                }).then(function (order_product) {
                    return Orders.destroy(
                        {
                            where: {
                                order_id: order_id,
                            },
                        },
                        { transaction: t }
                    );
                });
            })
                .then(function (result) {
                    res.status(200).send({
                        message: "Order has been remove",
                    });
                })
                .catch(function (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Order.",
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users.",
            });
        });
};
const showTracking = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id,
        },
        attributes: {
            exclude: ["order_user_id","order_status_id","order_created_at","order_updated_at"],
        },
        include: [
            {
                model: Order_Status,
                as: "order_statuses",
                attributes: {
                    exclude: ["order_status_order_id","order_status_admin_code","order_status_created_at","order_status_updated_at"],
                },
            },
            {
                model: Order_Products,
                as: "order_products",
                attributes: {
                    exclude: ["order_product_order_id","order_product_product_id","order_product_created_at","order_product_updated_at"],
                },
                include: [
                    {
                        model: Products,
                        as: "products",
                        attributes: {
                            exclude: ["product_category_id","product_image"],
                        },
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
                message: err.message || "Some error occurred while retrieving Users.",
            });
        });
};

const ShowAllOrder = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id,
        },
        attributes: {
            exclude: ["order_user_id","order_status_id","order_created_at","order_updated_at"],
        },
    })
    .then((data) => {
        if (data.length === 0) {
            res.status(404).send({
                message: "Order Not Found",
            });
        } else {
            res.send(data);
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users.",
        });
    });
};


// const DetailOrder = (req, res) => {
//     const token = req.headers["x-access-token"];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user_id = decoded.user_id;
//     const order_id = req.params.id;

//     //if order_user_id !== user_id then return error

//     Orders.findOne({
//         where: {
//             order_id: order_id,
//         },
//         attributes: {
//             exclude: ["order_user_id","order_status_id","order_created_at","order_updated_at"],
//         },
//         include: [
//             {
//                 model: Order_Status,
//                 as: "order_statuses",
//                 attributes: {
//                     exclude: ["order_status_order_id","order_status_admin_code","order_status_created_at","order_status_updated_at"],
//                 },
//             },
//             {
//                 model: Order_Products,
//                 as: "order_products",
//                 attributes: {
//                     exclude: ["order_product_order_id","order_product_product_id","order_product_created_at","order_product_updated_at"],
//                 },
//                 include: [
//                     {
//                         model: Products,
//                         as: "products",
//                     },
//                 ],
//             },
//             {
//                 model: OrderDetails,
//                 as: "order_details",
//                 attributes: {
//                     exclude: ["order_detail_order_product_id","order_detail_created_at","order_detail_updated_at"],
//                 },
//             },
//             {
//                 model: Users,
//                 as: "users",
//                 attributes: {
//                     exclude: ["user_password","user_role_id","user_status","user_created_at","user_updated_at"],
//                 },
//             }
//         ],
//     })
//         .then((data) => {
//             if (data.length === 0) {
//                 res.status(404).send({
//                     message: "Order Not Found",
//                 });
//             }
//             res.send(data);
//         })
//         .catch((err) => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving Users.",
//             });
//         });
// };

//show detail order and middleware for detail order
const DetailOrder = (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;
    const order_id = req.params.id;
    Orders.findOne({
        where: {
            order_id: order_id,
        },
    }).then((data) => {
        if (data.order_user_id !== user_id) {
            res.status(404).send({
                message: "Order Not Found",
            });
        } else {
            Orders.findOne({
                where: {
                    order_id: order_id,
                },
                attributes: {
                    exclude: ["order_user_id","order_status_id","order_created_at","order_updated_at"],
                },
                include: [
                    {
                        model: Order_Status,
                        as: "order_statuses",
                        attributes: {
                            exclude: ["order_status_order_id","order_status_admin_code","order_status_created_at","order_status_updated_at"],
                        },
                    },
                    {
                        model: Order_Products,
                        as: "order_products",
                        attributes: {
                            exclude: ["order_product_order_id","order_product_product_id","order_product_created_at","order_product_updated_at"],
                        },
                        include: [
                            {
                                model: Products,
                                as: "products",
                            },
                        ],
                    },
                    {
                        model: OrderDetails,
                        as: "order_details",
                        attributes: {
                            exclude: ["order_detail_order_product_id","order_detail_created_at","order_detail_updated_at"],
                        },
                    },
                    {
                        model: Users,
                        as: "users",
                        attributes: {
                            exclude: ["user_password","user_role_id","user_status","user_created_at","user_updated_at"],
                        },
                    }
                ],
            })
                .then((data) => {
                    if (data.length === 0) {
                        res.status(404).send({
                            message: "Order Not Found",
                        });
                    }
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving Users.",
                    });
                });
        }
    });
};




export { addCart,findAllCart,CheckoutOrder ,removeCart,showTracking,ShowAllOrder,DetailOrder};