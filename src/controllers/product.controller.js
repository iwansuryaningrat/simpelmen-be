import db from "../models/index.js";
const Product = db.Product;

const finishing = db.finishing;

const showAllProduct = (req, res) => {
    Product.findAll({
        include: [
            {
                model: finishing,
                as: "finishing",
            },
        ],
    }).then((product) => {
        res.status(200).send(product);
    });
};

const showProduct = (req, res) => {
    Product.findOne({
        where: {
            product_id: req.params.product_id,
        },
        include: [
            {
                model: finishing,
                as: "finishing",
            },
        ],
    }).then((product) => {
        res.status(200).send(product);
    });
};
const creatProduct = (req, res) => {
    Product.create({
        product_name: req.body.product_name,
        product_price: req.body.product_price,  
        product_image: req.body.product_image,
        product_description: req.body.product_description,
        product_category_id: req.body.product_category_id,
    }).then((product) => {
        res.status(200).send({
            message: "Create Success",
            data: product,
        });
    });
    }
export {
    showProduct,
    showAllProduct,
    creatProduct,
};