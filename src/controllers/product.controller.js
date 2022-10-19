import db from "../models/index.js";
const Products = db.products;
const Product_Materials = db.product_materials;
const Product_Sizes = db.product_sizes;
const Product_Categories = db.product_categories;
const Product_Finishings = db.product_finishings;

const ShowAllProducts = (req, res) => {
    Products.findAll({
        include: [
            {
                model: Product_Materials,
                as: "product_materials",
            },
            {
                model: Product_Sizes,
                as: "product_sizes",
            },
            {
                model: Product_Categories,
                as: "product_categories",
            },
            {
                model: Product_Finishings,
                as: "product_finishings",
            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products.",
            });
        });
}

const ShowProductById = (req, res) => {
    const id = req.params.id;

    Products.findByPk(id, {
        include: [
            {
                model: Product_Materials,
                as: "product_materials",
            },
            {
                model: Product_Sizes,
                as: "product_sizes",
            },
            {
                model: Product_Categories,
                as: "product_categories",
            },
            {
                model: Product_Finishings,
                as: "product_finishings",
            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products.",
            });
        });
}

export { ShowAllProducts, ShowProductById };