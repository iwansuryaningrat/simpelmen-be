import db from "../models/index.js";
const Transaction = db.transaction;
const Product_detail = db.product_detail;
const Product = db.Product;
const User = db.user;
const Material = db.material;
const finishing = db.finishing;
const Size = db.size;
const Product_Category = db.Product_Category;
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";

const showTransaction1 = (req, res) => {
    Transaction.findAll({
        include: [
            {
                model: User,
                as: "user",
            },
            {
                model: Product,
                as: "product",
                include: [
                    {
                        model:finishing,
                        as:"finishing"
                    },
                    {
                        model:Product_detail,
                        as:"product_detail",
                        include:[
                            {
                                model:Material,
                                as:"material"
                            },
                            {
                                model:Product_Category,
                                as:"product_category"
                            },
                            {
                                model:Size,
                                as:"size"

                            }
                        ]
                    },
                ]
            },
        ],
    }).then((transaction) => {
        res.status(200).send(transaction);
    });
};
const showTransaction = (req, res) => {
    Transaction.findAll({
        where: {
            transaction_status: {
                [Op.like]: "Bebas",
            },
        },
        include: [
            {
                model: User,
                as: "user",
            },
            {
                model: Product,
                as: "product",
                include: [
                    {
                        model:finishing,
                        as:"finishing"
                    },
                    {
                        model:Product_detail,
                        as:"product_detail",
                        include:[
                            {
                                model:Material,
                                as:"material"
                            },
                            {
                                model:Product_Category,
                                as:"product_category"
                            },
                            {
                                model:Size, 
                                as:"size"
                            }
                        ]
                    },
                ]
            },
        ],
    }).then((transaction) => {
        res.status(200).send(transaction);
    });
};

export {
    showTransaction,
};

