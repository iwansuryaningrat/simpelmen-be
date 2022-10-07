import db from "../models/index.js";
const Product_Category = db.product_category;

const CreateProductCategory = async (req, res) => {
    const { product_category_name, product_category_description } = req.body;
    try {
        const product_category = await Product_Category.create({
            product_category_name,
            product_category_description,
        });
        res.status(201).send(product_category);
    } catch (error) {
        res.status(500).send(error);
    }
}

const ShowAllProductCategory = (req, res) => {
    try {
        Product_Category.findAll().then((product_category) => {
            res.status(200).send(product_category);
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const ShowProductCategory = (req, res) => {
    try {
        Product_Category.findAll({
            where: {
                product_category_id: req.params.product_category_id,
            },
        }).then((product_category) => {
            res.status(200).send(product_category);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const UpdateProductCategory = async (req, res) => {
    try {
        const product_category = await Product_Category.update(req.body, {
            where: {
                product_category_id: req.params.product_category_id,
            },
        });
        res.status(200).send(product_category);
    } catch (error) {
        res.status(500).send(error);
    }
}

const DeleteProductCategory = async (req, res) => {
    try {
        const product_category = await Product_Category.destroy({
            where: {
                product_category_id: req.params.product_category_id,
            },
        });
        res.status(200).send(product_category);
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    CreateProductCategory,
    ShowAllProductCategory,
    ShowProductCategory,
    UpdateProductCategory,
    DeleteProductCategory,
};