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
const Jenis_Products = db.jenis_products;
const Province = db.province;
import PDFDocument from 'pdfkit';
const City = db.city;
const SubDistrict = db.subdistrict;
import async from "async";

import mailgun from "mailgun-js";


import jwt from "jsonwebtoken";

// Load .env file
import * as dotenv from "dotenv";

dotenv.config();

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

// const addCart = (req, res, next) => {
//     const user_id = req.user_id;
//     const product_id = req.params.id;
//     const { order_total_price, order_quantity , order_note , order_price , order_design_image , order_design, order_payment_method , order_payment_status,panjang_1, panjang_2,lebar_1,lebar_2,tinggi_1,tinggi_2 , order_discount, order_last_payment_date,order_finishing_id,order_material_id,order_detail_sablon,order_detail_shape} = req.body;
//     db.sequelize.transaction(function (t) {
//         return Orders.create({
//             order_user_id: user_id,
//             order_total_price: order_total_price,
//             order_discount: order_discount,
//             order_note: order_note,
//             order_price: order_price,
//             order_payment_method: order_payment_method,
//             order_payment_status: order_payment_status,
//             order_last_payment_date: order_last_payment_date,
//         }, { transaction: t })
//         .then(function (order) {
//             return Products.findOne({
//                 where: { product_id: product_id },
//             },{ transaction: t })
//                 .then((data) => {
//                     return OrderDetails.create({
//                         order_detail_order_id: order.order_id,
//                         order_detail_product_id: product_id,
//                         order_detail_quantity: order_quantity,
//                         p1: panjang_1,
//                         p2: panjang_2,
//                         l1: lebar_1,
//                         l2: lebar_2,
//                         t1: tinggi_1,
//                         t2: tinggi_2,
//                         order_detail_finishings_id: order_finishing_id,
//                         order_detail_materials_id: order_material_id,
//                         order_detail_design: order_design,
//                         order_detail_design_image: order_design_image,
//                         order_detail_sablon: order_detail_sablon,
//                         order_detail_shape: order_detail_shape
//                     },{ transaction: t })
//                 })
//                 .then((data) => {
//                     return Order_Status.create({
//                         order_status_order_id: order.order_id,
//                         order_status_admin_code: "8",
//                         order_status_description: "Di Keranjang",
//                     },{ transaction: t })
//                 })
//                 .then((data) => {
//                     return Products.findOne({
//                         where: { product_id: product_id },
//                     },{ transaction: t })
//                     .then((data) => {
//                         return Orders.update({
//                             order_code: `${order.order_id}/BIKDK/${data.product_category}/${romanMonth[month - 1]}/${year}`,
//                         },{ where: { order_id: order.order_id }, transaction: t })
//                     })
//                 }
//             )
//         }
//         )
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

const addCart = (req, res, next) => {
    const user_id = req.user_id;
    const product_id = req.params.id;
    const { order_total_price, order_quantity , order_note , order_price , order_design_image , order_design, order_payment_method , order_payment_status,panjang_1, panjang_2,lebar_1,lebar_2,tinggi_1,tinggi_2 , order_discount, order_last_payment_date,order_finishing_id,order_material_id,order_detail_sablon,order_detail_shape} = req.body;
    db.sequelize.transaction(function (t) {
        return Orders.findOne({
            where: { order_user_id: user_id, order_payment_status: null },
            include: [
                {
                    model: Order_Status,
                    as: "order_statuses",
                    where: { order_status_admin_code: "8" },
                },
            ],
        },{ transaction: t })
        .then(function (order) {
            if (order) {
                return OrderDetails.findOne({
                    where: { order_detail_order_id: order.order_id, order_detail_product_id: product_id, order_detail_finishings_id: order_finishing_id},
                },{ transaction: t })
                .then((data) => {
                    if (data) {
                        return OrderDetails.update({
                            order_detail_quantity: data.order_detail_quantity + order_quantity,
                        },{ where: { order_detail_id: data.order_detail_id }, transaction: t })
                    } else {
                        return OrderDetails.create({
                            order_detail_order_id: order.order_id,
                            order_detail_product_id: product_id,
                            order_detail_quantity: order_quantity,
                            p1: panjang_1,
                            p2: panjang_2,
                            l1: lebar_1,
                            l2: lebar_2,
                            t1: tinggi_1,
                            t2: tinggi_2,
                            order_detail_finishings_id: order_finishing_id,
                            order_detail_materials_id: order_material_id,
                            order_detail_design: order_design,
                            order_detail_design_image: order_design_image,
                            order_detail_sablon: order_detail_sablon,
                            order_detail_shape: order_detail_shape
                        },{ transaction: t })
                    }
                })
            } else {
                return Orders.create({
                    order_user_id: user_id,
                    order_total_price: order_total_price,
                    order_discount: order_discount,
                    order_note: order_note,
                    order_price: order_price,
                    order_payment_method: order_payment_method,
                    order_payment_status: order_payment_status,
                    order_last_payment_date: order_last_payment_date,   
                },{ transaction: t })
                .then(function (order) {
                    return Products.findOne({
                        where: { product_id: product_id },
                    },{ transaction: t })
                        .then((data) => {
                            return OrderDetails.create({
                                order_detail_order_id: order.order_id,
                                order_detail_product_id: product_id,
                                order_detail_quantity: order_quantity,
                                p1: panjang_1,
                                p2: panjang_2,
                                l1: lebar_1,
                                l2: lebar_2,
                                t1: tinggi_1,
                                t2: tinggi_2,
                                order_detail_finishings_id: order_finishing_id,
                                order_detail_materials_id: order_material_id,
                                order_detail_design: order_design,
                                order_detail_design_image: order_design_image,
                                order_detail_sablon: order_detail_sablon,
                                order_detail_shape: order_detail_shape
                            },{ transaction: t })
                        })
                        .then((data) => {
                            return Order_Status.create({
                                order_status_order_id: order.order_id,
                                order_status_admin_code: "8",
                                order_status_description: "Di Keranjang",
                            },{ transaction: t })
                        })
                        .then((data) => {
                            return Products.findOne({
                                where: { product_id: product_id },
                            },{ transaction: t })
                            .then((data) => {
                                return Orders.update({
                                    order_code: `${order.order_id}/BIKDK/${data.product_category}/${romanMonth[month - 1]}/${year}`,
                                },{ where: { order_id: order.order_id }, transaction: t })
                            })
                        })
                })
            }
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



const findAllCart = (req, res,next) => {
    const user_id = req.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id
        },
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
        if(data == null){
            res.status(404).send({
                message: "Order Empty",
            });
        }else{
            res.send(data);
        }
     })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Orders.",
        });
    });
}

const CheckoutOrder = async (req, res) => {
    const order_id = req.body.order_id;
    if (!order_id) {
        res.status(400).send({
            message: "Order ID is required",
        });
        return;
    }
    const { delivery_detail_name,delivery_detail_ikm, delivery_detail_email, delivery_detail_contact, delivery_detail_method, delivery_detail_address, delivery_detail_district,delivery_detail_postal_code, delivery_detail_shipping_cost,delivery_detail_courier,delivery_detail_receipt,delivery_detail_estimate } = req.body;
    const order_id_string = order_id.toString();
    const order_id_array_string = order_id_string.split(",");
    const order_id_array = order_id_array_string.map(Number);
    for (let i = 0; i < order_id_array.length; i++) {
        try {
            await db.sequelize.transaction(async function (t) {
                await Delivery_Details.findOne({
                    where: {
                        delivery_detail_order_id: order_id_array[i],
                    },
                },{ transaction: t })
                .then((data) => {
                    if (data) {
                        return Delivery_Details.update({
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
                        },{ where: { delivery_detail_order_id: order_id_array[i] }, transaction: t })
                    } else {
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
                        },{ transaction: t })
                    }
                })
                await Order_Status.update({
                    order_status_admin_code: "2",
                    order_status_description: "Pesanan dalam pengecekan oleh CS",
                },{ where: { order_status_order_id: order_id_array[i] }, transaction: t })
                
                await Retributions.findOne({
                    where: {
                        retribution_order_id: order_id_array[i],
                    },
                },{ transaction: t })
                .then((data) => {
                    if (data) {
                        return Retributions.update({
                            retribution_status: 0,
                        },{ where: { retribution_order_id: order_id_array[i] }, transaction: t })
                    } else {
                        return Retributions.create({
                            retribution_order_id: order_id_array[i],
                            retribution_status: 0,
                        },{ transaction: t })
                    }
                }
                )
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the Order.",
            });
        }
    }
    res.status(200).send({
        message: "Order has been check Admin Customer Service.",
    });

};

const removeCart = (req, res,next) => {
    const user_id = req.user_id;
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



const showTracking = (req, res,next) => {
    const user_id = req.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id,
            order_id: {
                [Op.notIn]: db.sequelize.literal(`(SELECT order_status_order_id FROM order_statuses WHERE order_status_admin_code = 8)`),
            },
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
                model: OrderDetails,
                as: "order_details",
                include: [
                    {
                        model: Products,
                        as: "products",
                        attributes: {
                            exclude: ["product_category_id","product_image"],
                        },
                        include: [
                            {
                                model: Jenis_Products,
                                as: "jenis_products",
                            },
                        ],
                    },
                    
                ],
            },
            {
                model:Delivery_Details,
                as:"delivery_details",
            }
        ],
    })
    .then((data) => {
        if(data == null){
            res.status(404).send({
                message: "Order Empty",
            });
        }else{
            res.send(data);
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users.",
        });
    });
};

const ShowAllOrder = (req, res,next) => {
    const user_id = req.user_id;
    Orders.findAll({
        where: {
            order_user_id: user_id,
            order_id: {
                [Op.notIn]: db.sequelize.literal(`(SELECT order_status_order_id FROM order_statuses WHERE order_status_admin_code = 8)`),
            },
        },
        attributes: {
            exclude: ["order_status_id","order_created_at","order_updated_at"],
        },
        include: [
            {
                model: OrderDetails,
                as: "order_details",
                attributes: {
                    exclude: ["order_detail_created_at","order_detail_updated_at"],
                },
                include: [
                    {
                        model: Products,
                        as: "products",
                        attributes: {
                            exclude: ["product_category_id","product_image"],
                        },
                        include: [
                            {
                                model: Jenis_Products,
                                as : "jenis_products",
                            },
                        ],
                    },
                ],
            },
        ],

    })
    .then((data) => {
        if(data == null){
            res.status(404).send({
                message: "Order Empty",
            });
        }else{
            res.send(data);
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users.",
        });
    });
};

const DetailOrder = (req, res,next) => {
    const user_id = req.user_id;
    const order_id = req.params.id;
  
    Orders.findOne({
        where: {
            order_id: order_id,
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
                model: OrderDetails,
                as: "order_details",
                attributes: {
                    exclude: ["order_detail_created_at","order_detail_updated_at"],
                },
                include: [
                    {
                        model: Products,
                        as: "products",

                        include: [
                            {
                                model: Product_Finishing,
                                as: "product_finishings",
                                attributes: {
                                    exclude: ["product_finishing_product_id","product_finishing_created_at","product_finishing_updated_at"],
                                },
                            },
                            {
                                model: Product_Material,
                                as: "product_materials",
                                attributes: {
                                    exclude: ["product_material_product_id","product_material_created_at","product_material_updated_at"],
                                },
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
            {
                model: Users,
                as: "users",
                attributes: {
                    exclude: ["user_password","user_role_id","user_status","user_created_at","user_updated_at"],
                },
            },
            {
                model: Retributions,
                as: "retributions",
                attributes:["retribution_jasa_total"],
            },
            {
                model: Delivery_Details,
                as: "delivery_details",
                attributes: ["delivery_detail_courier"],
            }

        ],
    })
    .then((data) => {
        if(data == null){
            res.status(404).send({
                message: "Order Empty",
            });
        }else{
            res.send(data);
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving PAD.",
        });
        });
    };

const showPAD = (req, res) => {
    Retributions.findAll({
        order: [["retribution_id", "DESC"]],
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
    };

const BuyNow = (req, res,next) => {
    const user_id = req.user_id;
    const product_id = req.body.product_id;
    const { order_total_price, order_quantity , order_note , order_price , order_design_image , order_design, order_payment_method , order_payment_status,panjang_1, panjang_2,lebar_1,lebar_2,tinggi_1,tinggi_2 , order_discount, order_last_payment_date,order_finishing_id,order_material_id,order_detail_sablon} = req.body;
    const { delivery_detail_name,delivery_detail_ikm, delivery_detail_email, delivery_detail_contact, delivery_detail_method, delivery_detail_address, delivery_detail_district,delivery_detail_postal_code, delivery_detail_shipping_cost,delivery_detail_courier,delivery_detail_receipt,delivery_detail_estimate } = req.body;
    db.sequelize.transaction(function (t) {
        return Orders.create({
            order_user_id: user_id,
            order_total_price: order_total_price,
            order_discount: order_discount,
            order_note: order_note,
            order_price: order_price,
            order_payment_method: order_payment_method,
            order_payment_status: order_payment_status,
            order_last_payment_date: order_last_payment_date,
        }, { transaction: t })
        .then(function (order) {
            return Products.findOne({
                where: { product_id: product_id },
            },{ transaction: t })
                .then((data) => {
                    return OrderDetails.create({
                        order_detail_order_id: order.order_id,
                        order_detail_product_id: product_id,
                        order_detail_quantity: order_quantity,
                        p1: panjang_1,
                        p2: panjang_2,
                        l1: lebar_1,
                        l2: lebar_2,
                        t1: tinggi_1,
                        t2: tinggi_2,
                        order_detail_finishing_id: order_finishing_id,
                        order_detail_material_id: order_material_id,
                        order_detail_design: order_design,
                        order_detail_design_image: order_design_image,
                        order_detail_sablon: order_detail_sablon
                    },{ transaction: t })
                })
                .then((data) => {
                    return Order_Status.create({
                        order_status_order_id: order.order_id,
                        order_status_admin_code: "2",
                        order_status_description: "Pesanan dalam pengecekan oleh CS",
                    },{ transaction: t })
                })
                .then((data) => {
                    return Products.findOne({
                        where: { product_id: product_id },
                    },{ transaction: t })
                    .then((data) => {
                        return Orders.update({
                            order_code: `${order.order_id}/BIKDK/${data.product_category}/${romanMonth[month - 1]}/${year}`,
                        },{ where: { order_id: order.order_id }, transaction: t })
                    })
                    .then((data) => {
                        return Retributions.create({
                            retribution_order_id: order.order_id,
                            retribution_status: "0",
                        },{ transaction: t })
                    })
                    .then((data) => {
                        return Delivery_Details.create({
                            delivery_detail_order_id: order.order_id,
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
                        },{ transaction: t })
                    })
                })
        }
        )
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

export { addCart,findAllCart,CheckoutOrder ,removeCart,showTracking,ShowAllOrder,DetailOrder,showPAD,BuyNow};