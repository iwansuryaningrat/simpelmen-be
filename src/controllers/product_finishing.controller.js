import db from '../models/index.js';
const Product_Finishing = db.product_finishing;

const CreateProductFinishing = async (req, res) => {
    const { product_finishing_name, product_finishing_description } = req.body;
    try {
        const product_finishing = await Product_Finishing.create({
            product_finishing_name,
            product_finishing_description,
        });
        res.status(201).send(product_finishing);
    } catch (error) {
        res.status(500).send(error);
    }
}

const ShowAllProductFinishing = (req, res) => {
    Product_Finishing.findAll().then((product_finishing) => {
        res.status(200).send(product_finishing);
    });
}

const ShowProductFinishing = (req, res) => {
    Product_Finishing.findOne({
        where: {
            product_finishing_id: req.params.product_finishing_id,
        },
    }).then((product_finishing) => {
        res.status(200).send(product_finishing);
    });
}

const UpdateProductFinishing = async (req, res) => {
    try {
        const product_finishing = await Product_Finishing.update(req.body, {
            where: {
                product_finishing_id: req.params.product_finishing_id,
            },
        });
        res.status(200).send(product_finishing);
    } catch (error) {
        res.status(500).send(error);
    }
}

const DeleteProductFinishing = async (req, res) => {
    try {
        const product_finishing = await Product_Finishing.destroy({
            where: {
                product_finishing_id: req.params.product_finishing_id,
            },
        });
        res.status(200).send(product_finishing);
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    CreateProductFinishing,
    ShowAllProductFinishing,
    ShowProductFinishing,
    UpdateProductFinishing,
    DeleteProductFinishing,
};