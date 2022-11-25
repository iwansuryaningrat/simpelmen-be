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
    
                        to: data.orders.users.user_email,

                        subject: "Order Diterima",
                        html: `<html>
                        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                        <head>
                            <meta charset="utf-8"> <!-- utf-8 works for most cases -->
                            <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
                            <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
                            <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
                            <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
                        
                            <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet">
                        
                            <!-- CSS Reset : BEGIN -->
                            <style>
                        
                                /* What it does: Remove spaces around the email design added by some email clients. */
                                /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
                                html,
                        body {
                            margin: 0 auto !important;
                            padding: 0 !important;
                            height: 100% !important;
                            width: 100% !important;
                            background: #f1f1f1;
                        }
                        
                        /* What it does: Stops email clients resizing small text. */
                        * {
                            -ms-text-size-adjust: 100%;
                            -webkit-text-size-adjust: 100%;
                        }
                        
                        /* What it does: Centers email on Android 4.4 */
                        div[style*="margin: 16px 0"] {
                            margin: 0 !important;
                        }
                        
                        /* What it does: Stops Outlook from adding extra spacing to tables. */
                        table,
                        td {
                            mso-table-lspace: 0pt !important;
                            mso-table-rspace: 0pt !important;
                        }
                        
                        /* What it does: Fixes webkit padding issue. */
                        table {
                            border-spacing: 0 !important;
                            border-collapse: collapse !important;
                            table-layout: fixed !important;
                            margin: 0 auto !important;
                        }
                        
                        /* What it does: Uses a better rendering method when resizing images in IE. */
                        img {
                            -ms-interpolation-mode:bicubic;
                        }
                        
                        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
                        a {
                            text-decoration: none;
                        }
                        
                        /* What it does: A work-around for email clients meddling in triggered links. */
                        *[x-apple-data-detectors],  /* iOS */
                        .unstyle-auto-detected-links *,
                        .aBn {
                            border-bottom: 0 !important;
                            cursor: default !important;
                            color: inherit !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }
                        
                        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
                        .a6S {
                            display: none !important;
                            opacity: 0.01 !important;
                        }
                        
                        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
                        .im {
                            color: inherit !important;
                        }
                        
                        /* If the above doesn't work, add a .g-img class to any image in question. */
                        img.g-img + div {
                            display: none !important;
                        }
                        
                        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
                        /* Create one of these media queries for each additional viewport size you'd like to fix */
                        
                        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
                        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                            u ~ div .email-container {
                                min-width: 320px !important;
                            }
                        }
                        /* iPhone 6, 6S, 7, 8, and X */
                        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                            u ~ div .email-container {
                                min-width: 375px !important;
                            }
                        }
                        /* iPhone 6+, 7+, and 8+ */
                        @media only screen and (min-device-width: 414px) {
                            u ~ div .email-container {
                                min-width: 414px !important;
                            }
                        }
                            </style>
                        
                            <!-- CSS Reset : END -->
                        
                            <!-- Progressive Enhancements : BEGIN -->
                            <style>
                        
                                .primary{
                            background: #17bebb;
                        }
                        .bg_white{
                            background: #ffffff;
                        }
                        .bg_light{
                            background: #ff1313;
                        }
                        .bg_black{
                            background: #000000;
                        }
                        .bg_dark{
                            background: rgba(0,0,0,.8);
                        }
                        .email-section{
                            padding:2.5em;
                        }
                        
                        /*BUTTON*/
                        .btn{
                            padding: 10px 15px;
                            display: inline-block;
                        }
                        .btn.btn-primary{
                            border-radius: 5px;
                            background: #17bebb;
                            color: #ffffff;
                        }
                        .btn.btn-white{
                            border-radius: 5px;
                            background: #ffffff;
                            color: #000000;
                        }
                        .btn.btn-white-outline{
                            border-radius: 5px;
                            background: transparent;
                            border: 1px solid #fff;
                            color: #fff;
                        }
                        .btn.btn-black-outline{
                            border-radius: 0px;
                            background: transparent;
                            border: 2px solid #000;
                            color: #000;
                            font-weight: 700;
                        }
                        .btn-custom{
                            color: rgba(0,0,0,.3);
                            text-decoration: underline;
                        }
                        
                        h1,h2,h3,h4,h5,h6{
                            font-family: 'Work Sans', sans-serif;
                            color: #000000;
                            margin-top: 0;
                            font-weight: 400;
                        }
                        
                        body{
                            font-family: 'Work Sans', sans-serif;
                            font-weight: 400;
                            font-size: 15px;
                            line-height: 1.8;
                            color: rgba(0,0,0,.4);
                        }
                        
                        a{
                            color: #17bebb;
                        }
                        
                        table{
                        }
                        /*LOGO*/
                        
                        .logo h1{
                            margin: 0;
                        }
                        .logo h1 a{
                            color: #ff1b1b;
                            font-size: 24px;
                            font-weight: 700;
                            font-family: 'Work Sans', sans-serif;
                        }
                        
                        /*HERO*/
                        .hero{
                            position: relative;
                            z-index: 0;
                        }
                        
                        .hero .text{
                            color: rgba(0,0,0,.3);
                    
                        }
                        .hero .text h2{
                            color: #000;
                            font-size: 34px;
                            margin-bottom: 15px;
                            font-weight: 300;
                            line-height: 1.2;
                        }
                        .hero .text h3{
                            font-size: 24px;
                            font-weight: 200;
                        }
                        .hero .text h2 span{
                            font-weight: 600;
                            color: #000;
                        }
                        
                        
                        /*PRODUCT*/
                        .product-entry{
                            display: block;
                            position: relative;
                            padding-top: 20px;
                        }
                        .product-entry .text{
                            width: calc(100% - 125px);
                            padding-left: 20px;
                            font-size: 15px;
                            color : #000;
                        }
                        .product-entry .text h3{
                            margin-bottom: 0;
                            padding-bottom: 0;
                        }
                        .product-entry .text p{
                            margin-top: 0;
                        }
                        .product-entry img, .product-entry .text{
                            float: left;
                        }
                        
                        ul.social{
                            padding: 0;
                        }
                        ul.social li{
                            display: inline-block;
                            margin-right: 10px;
                        }
                        
                        /*FOOTER*/
                        
                        .footer{
                            border-top: 1px solid rgba(255, 255, 255, 0.05);
                            color: rgb(255, 255, 255);
                        }
                        .footer .heading{
                            color: rgb(255, 255, 255);
                            font-size: 20px;
                        }
                        .footer ul{
                            margin: 0;
                            padding: 0;
                        }
                        .footer ul li{
                            list-style: none;
                            margin-bottom: 10px;
                        }
                        .footer ul li a{
                            color: rgb(255, 255, 255);
                        }
                        
                        
                        @media screen and (max-width: 500px) {
                        
                        
                        }
                        
                        
                            </style>
                        
                        
                        </head>
                        
                        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
                            <center style="width: 100%; background-color: #f1f1f1;">
                            <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                              &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                            </div>
                            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                                <!-- BEGIN BODY -->
                              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                                  <tr>
                                  <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tr>
                                              <td class="logo" style="text-align: left;">
                                                <h1><a href="#">SimpelmenOke</a></h1>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                                  </tr><!-- end tr -->
                                        <tr>
                                  <td valign="middle" class="hero bg_white" style="padding: 2em 0 2em 0;">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="padding: 0 2.5em; text-align: left; font-size: 40px;">
                                                <div class="text">
                                                    <h3>Berikut adalah status pesanan anda : </h3>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                  </td>
                                  </tr><!-- end tr -->
                                  <tr>
                                      <table class="bg_white" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
                                                <th width="100%" style="text-align:center; padding: 0 2.5em; color: #000; padding-bottom: 20px"><h3>Pesanan</h3></th>
                                              </tr>
                                              <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
                                                  <td valign="middle" width="100%" padding="20" padding: 0 2.5em; color: #000; padding-bottom: 20px">
                                                      <div class="product-entry">
                                                          <div class="text">
                                                                <h4><b>${data.orders.order_code}</b></h4>
                                                                ${data.orders.order_details.map((item) => {
                                                                    return `<span>Quantity : ${item.order_detail_quantity}</span>
                                                                    <p><span>Produk : ${item.products.product_name}</span></p>
                                                                    <p><span>Category Produk :${item.products.product_categories.product_category_name}</span></p>
                                                                    <p><span>Finishing Produk :${item.products.product_finishings.product_finishing_name}</span></p>
                                                                    
                                                                    `
                                                                })}
                                                                
                                                                <span>Total jasa pound : ${data.retribution_jasa_pound}</span><p>
                                                                <p><span>Total jasa finishing : ${data.retribution_jasa_finishing}</span></p>
                                                                <p><span>Total jasa sablon : ${data.retribution_jasa_sablon}</span></p>
                                                                <p><span>Total jasa desain : ${data.retribution_jasa_design}</span></p>
                                                                <hr>
                                                                <p>Total jasa total : ${data.retribution_jasa_total}</p>
                                                                <br>

                                                          </div>
                                                      </div>
                                              </tr>
                                              <tr style="border-bottom: 1px solid rgba(0,0,0,.05);">
                                                <td valign="middle" width="100%" padding: 0 2.5em;">
                                                    <div class="product-entry">
                                                        <div class="text">
                                                              <h4><b>Status Pesanan</b></h4>
                                                              <p>
                                                              <span>Atas Nama		: ${data.orders.users.user_name}</span>
                                                              <p><span>User IKM		: ${data.orders.users.user_ikm}</span></p>
                                                              <span style="color:red"><b>Status Pesanan	: Pesanan telah disetujui dan sedang diproses dan berikut adalah informasi mengenai biaya jasa dan belum termasuk biaya pengiriman</b></span>
                                                              </p>
                                                              <hr>
                                                              <br>
                                                        </div>
                                                    </div>
                                            </tr>
											  
                                      </table>
                                  </tr><!-- end tr -->
                              <!-- 1 Column Text + Button : END -->
                              </table>
                              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                                  <tr>
                                  <td valign="middle" class="bg_light footer email-section">
                                    <table>
                                        <tr>
                                        <td valign="top" width="33.333%" style="padding-top: 20px;">
                                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                              <td style="text-align: left; padding-right: 10px;">
                                                  <h3 class="heading">About</h3>
                                                  <p style="color:white;">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                        <td valign="top" width="33.333%" style="padding-top: 20px;">
                                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                              <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                                                  <h3 class="heading">Contact Info</h3>
                                                  <ul style="color:white">
                                                            <li><span class="text">Sampangan, Semarang, Jawa Tengah</span></li>
                                                            <li><span class="text">081 988 888 888</span></a></li>
                                                          </ul>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                        <td valign="top" width="33.333%" style="padding-top: 20px;">
                                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                              <td style="text-align: left; padding-left: 10px;">
                                                  <h3 class="heading">Useful Links</h3>
                                                  <ul>
                                                            <li><a href="#">Home</a></li>
                                                            <li><a href="#">Account</a></li>
                                                            <li><a href="#">Wishlist</a></li>
                                                            <li><a href="#">Order</a></li>
                                                          </ul>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr><!-- end: tr -->
                              </table>
                        
                            </div>
                          </center>
                        </body>
                        </html>
                        `,
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