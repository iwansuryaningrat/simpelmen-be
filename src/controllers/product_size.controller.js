import db from "../models/index.js";
const Product_Size = db.product_size;

const CreateProductSize = async (req, res) => {
    const { product_size_length, product_size_width, product_size_height, product_size_shape, product_size_description } = req.body;
    try {
        const product_size = await Product_Size.create({
            product_size_length,
            product_size_width,
            product_size_height,
            product_size_shape,
            product_size_description,
        });
        res.status(201).send(product_size);
    } catch (error) {
        res.status(500).send(error);
    }
};

const ShowAllProductSize = (req, res) => {
    try {
        const product_size = Product_Size.findAll();
        res.status(200).send(product_size);
    } catch (error) {
        res.status(500).send(error);
    }
}

const ShowProductSize = (req, res) => {
    try {
        const product_size = Product_Size.findAll({
            where: {
                product_size_id: req.params.product_size_id,
            },
        });
        res.status(200).send(product_size);
    } catch (error) {
        res.status(500).send(error);
    }
}

const UpdateProductSize = async (req, res) => {
    try {
        const product_size = await Product_Size.update(req.body, {
            where: {
                product_size_id: req.params.product_size_id,
            },
        });
        res.status(200).send(product_size);
    } catch (error) {
        res.status(500).send(error);
    }
}

const DeleteProductSize = async (req, res) => {
    try {
        const product_size = await Product_Size.destroy({
            where: {
                product_size_id: req.params.product_size_id,
            },
        });
        res.status(200).send(product_size);
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    CreateProductSize,
    ShowAllProductSize,
    ShowProductSize,
    UpdateProductSize,
    DeleteProductSize,
};