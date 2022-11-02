import db from "../models/index.js";
const Products = db.products;
const Product_Materials = db.product_materials;
const Product_Sizes = db.product_sizes;
const Product_Categories = db.product_categories;
const Product_Finishings = db.product_finishings;
const Jenis_Products = db.jenis_products;

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
            {
                model: Jenis_Products,
                as: "jenis_products",

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
            {
                model: Jenis_Products,
                as: "jenis_products",

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
const updateProduct = (req, res) => {
    const id = req.params.id;

    Products.update(req.body, {
        where: { product_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Product with id=" + id,
            });
        });
}

const deleteProduct = (req, res) => {
    const id = req.params.id;
    
    Products.destroy({
        where: { product_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id,
            });
        });
}

const createProduct = (req, res) => {
    // Validate request
    if (!req.body.product_name) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    // Create a Product
    const product = {
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
        product_image: req.body.product_image,
        product_material_id: req.body.product_material_id,
        product_size_id: req.body.product_size_id,
        product_category_id: req.body.product_category_id,
        product_finishing_id: req.body.product_finishing_id,
        jenis_product_id: req.body.jenis_product_id,
        product_weight: req.body.product_weight,
    };

    // Save Product in the database
    Products.create(product)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product.",
            });
        });
}



export { ShowAllProducts, ShowProductById, updateProduct, deleteProduct, createProduct };