import db from "../models/index.js";
const Product = db.products;
const Product_Finishing = db.product_finishings;
const Product_Category = db.product_categories;
const Product_Material = db.product_materials;
const Product_Size = db.product_sizes;

const ShowAllProduct = (req, res) => {
    try {
        Product.findAll({
            include: [
                {
                    model: Product_Finishing,
                    as: "product_finishings",
                },
                {
                    model: Product_Category,
                    as: "product_categories",
                },
                {
                    model: Product_Material,
                    as: "product_materials",
                },
            ],
        }).then((products) => {
            res.status(200).send(products);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving products.",
        });
    }
};

const ShowProduct = (req, res) => {
    try {
        Product.findOne({
            where: {
                product_id: req.params.product_id,
            },
            include: [
                {
                    model: Product_Finishing,
                    as: "product_finishings",
                },
                {
                    model: Product_Category,
                    as: "product_categories",
                },
                {
                    model: Product_Material,
                    as: "product_materials",
                },
                {
                    model: Product_Size,
                    as: "product_sizes",
                }
            ],
        }).then((products) => {
            res.status(200).send(products);
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving products.",
        });
    }
};

const CreateProduct = async (req, res) => {
    const { product_name, product_description,product_weight, product_category, product_finishing, product_size, product_material,product_image } = req.body;
    try {
        const product = await Product.create({
            product_name,
            product_description,
            product_weight,
            product_category,
            product_finishing,
            product_size,
            product_material,
            product_image,
        
        });
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

const UpdateProduct = async (req, res) => {
    try {
        const product = await Product.update(req.body, {
            where: {
                product_id: req.params.product_id,
            },
        });
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

const DeleteProduct = async (req, res) => {
    try {
        const product = await Product.destroy({
            where: {
                product_id: req.params.product_id,
            },
        });
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

export {
    ShowAllProduct,
    ShowProduct,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,

};
