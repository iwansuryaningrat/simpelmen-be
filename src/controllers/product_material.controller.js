import db from "../models/index.js";
const Product_Material = db.product_materials;


const CreateProductMaterial = async (req, res) => {
    const { product_material_name, product_material_description } = req.body;
    try {
        const product_material = await Product_Material.create({
            product_material_name,
            product_material_description,
        });
        res.status(201).send(product_material);
    } catch (error) {
        res.status(500).send(error);
    }
}

const ShowAllProductMaterial = (req, res) => {
    try {
        Product_Material.findAll().then((product_material) => {
            res.status(200).send(product_material);
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const ShowProductMaterial = (req, res) => {
    try {
        Product_Material.findAll({
            where: {
                product_material_id: req.params.product_material_id,
            },
        }).then((product_material) => {
            res.status(200).send(product_material);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const UpdateProductMaterial = async (req, res) => {
    try {
        const product_material = await Product_Material.update(req.body, {
            where: {
                product_material_id: req.params.product_material_id,
            },
        });
        res.status(200).send(product_material);
    } catch (error) {
        res.status(500).send(error);
    }
}

const DeleteProductMaterial = async (req, res) => {
    try {
        const product_material = await Product_Material.destroy({
            where: {
                product_material_id: req.params.product_material_id,
            },
        });
        res.status(200).send(product_material);
    } catch (error) {
        res.status(500).send(error);
    }
}

export {
    CreateProductMaterial,
    ShowAllProductMaterial,
    ShowProductMaterial,
    UpdateProductMaterial,
    DeleteProductMaterial,
};