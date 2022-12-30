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
const Province = db.province;
const City = db.city;
const SubDistrict = db.subdistrict;
import fs from "fs";
const Jenis_Products = db.jenis_products;
import async from "async";
import multer from "multer";
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
                    order_status_admin_code: 4,
                },
            },
            {
                model: Users,
                attributes: ["user_id", "user_name", "user_email","user_ikm"],
                as: "users",   
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

const ApproveOrderDesain = (req, res) => {
    const id = req.params.id;
    Order_Status.update(
        {
            order_status_admin_code: 6,
        },
        {
            where: {
                order_status_order_id: id,
            },
        }
    )
    .then(() => {
        Order_Status.create({
            order_status_admin_code: 6,
            order_status_description: "Tahap Desain Selesai", 
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
                            .replace("{message}", "Pesanan Anda telah selesai di desain dan akan segera kami produksi"),
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

const UpdateOrderNotApproveDesain = (req, res) => {
    const id = req.params.id;
        Order_Status.create({
            order_status_admin_code: 4,
            order_status_description: "Desain Belum Disetujui",
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
                message: "Error updated Order with id=" + id,
            });
        }
        );
    }

    const showDetailOrder = (req, res) => {
        const id = req.params.id;
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
                            attributes: ["product_id", "product_name", "jenis_product"],
                            include: [
                                {
                                    model: Jenis_Products,
                                    as: "jenis_products",
                                },
                                {
                                    model: Product_Category,
                                    as: "product_categories",
                                }
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
    
const RemoveDesain = (req, res) => {
    const id = req.params.id;
    OrderDetails.update(
        {
            order_detail_design_image: null,
        },
        {
            where: {
                order_detail_id: id,
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
    };


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("product_image");

// const UpdateDesain = (req, res) => {
//     const id = req.params.id;
//     OrderDetails.findOne({
//         where: {
//             order_detail_id: id,
//         },
//     })
//         .then((data) => {
//             if (data.order_detail_design_image) {
//                 fs.unlink(
//                     `./public/images/${data.order_detail_design_image}`,
//                     (err) => {
//                         if (err) {
//                             console.log(err);
//                         }
//                     }
//                 );
//             }
//         })
//         .then(() => {
//             upload(req, res, (err) => {
//                 if (err) {
//                     return res.status(500
//                         ).send({
//                             message: "Error uploading file",
//                         });
//                 }
//                 if(!req.file){
//                     return res.status(400).send({
//                         message: "File not found",
//                     });
//                 }
//                 OrderDetails.update(
//                     {
//                         order_detail_desain_image: req.file.filename,
//                     },
//                     {
//                         where: {
//                             order_detail_id: id,
//                         },
//                     }
//                 )
//                     .then(() => {
//                         res.send({
//                             message: "Order was updated successfully.",
//                         });
//                     })
//                     .catch((err) => {
//                         res.status(500).send({
//                             message: "Error updating Order with id=" + id,
//                         });
//                     });
//             });
//         });
// };

const UpdateDesain = (req, res,next) => {
    const id = req.params.id;
        upload(req, res, (err) => {
            if (err) {
                return res.status(500
                    ).send({
                        message: "Error uploading file",
                    });
            }
            if(!req.file){
                return res.status(400).send({
                    message: "File not found",
                });
            }
            OrderDetails.update(
                {
                    order_detail_design_image: req.file.filename,
                },
                {
                    where: {
                        order_detail_order_id: id,
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
        });
    };


export { showAllOrder, ApproveOrderDesain, UpdateOrderNotApproveDesain ,showDetailOrder, RemoveDesain, UpdateDesain};
