import db from "../models/index.js";
const Product = db.product;
const Product_Finishing = db.product_finishing;
const Product_Category = db.product_category;
const Product_Material = db.product_material;
// const Product_Size = db.Product_Size;

const ShowAllProduct = (req, res) => {
    try {
        const product = Product.findAll({
            include: [
                {
                    model: Product_Category,
                    as: "product_category",
                },
            ],
        });
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving product.",
        });
    }
};

const ShowProduct = (req, res) => {
    try {
        const product = Product.findAll({
            where: {
                product_id: req.params.product_id,
            },
            include: [
                {
                    model: Product_Category,
                    as: "product_category",
                },
                {
                    model: Product_Finishing,
                    as: "product_finishing",
                },
                {
                    model: Product_Material,
                    as: "product_material",
                },
                {
                    model: Product_Size,
                    as: "product_size",
                }
            ],
        });
        res.status(200).send(product);

    } catch (error) {
        res.status(500).send(error);
    }
};

const CreateProduct = async (req, res) => {
    const { product_name, product_description,product_weight, product_category_id, product_finishing_id, product_size_id, product_material_id } = req.body;
    try {
        const product = await Product.create({
            product_name,
            product_description,
            product_weight,
            product_category_id,
            product_finishing_id,
            product_size_id,
            product_material_id,
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
