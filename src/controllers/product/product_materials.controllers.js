import db from "../../models/index.js";

const Product_Materials = db.product_materials;
const Op = db.Sequelize.Op;

// Create and Save a new Product_Materials
const createMaterial = (req, res) => {
    const { name} = req.body;
    
    // Validate request
    if (!name) {
        return res.status(400).send({
        message: "Content can not be empty!",
        });
    }
    
    // Create a Product_Materials
    const product_materials = {
        product_material_name: name,
    };
    
    // Save Product_Materials in the database
    Product_Materials
        .create(product_materials)
        .then((data) => {
        res.send({
            message: "Product_Materials was created successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Product_Materials.",
        });
        });
    }
const findAllMaterial = (req, res) => {
    Product_Materials.findAll()
    .then((data) => {
        if (data == null) {
            return res.status(404).send({
            message: "Product_Materials not found",
            "data": data
            });
        }
        else {
            res.send({
                message: "Product_Materials was retrieved successfully!",
                data,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Product_Materials.",
        });
    });
}
const findOneMaterial = (req, res) => {
    const id = req.params.id;
    
    Product_Materials
        .findByPk(id)
        .then((data) => {
        if (data == null) {
            return res.status(404).send({
            message: "Product_Materials not found",
            });
        }
        
        res.send({
            message: "Product_Materials was retrieved successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Error retrieving Product_Materials with id=" + id,
        });
        });
    }
const updateMaterial = (req, res) => {
    const id = req.params.id;
    
    Product_Materials
        .update(req.body, {
        where: { product_material_id: id },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Product_Materials was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Product_Materials with id=${id}. Maybe Product_Materials was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Error updating Product_Materials with id=" + id,
        });
        });
    }
const removeMaterial = (req, res) => {
    const id = req.params.id;
    
    Product_Materials
        .destroy({
        where: { product_material_id: id },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Product_Materials was deleted successfully!",
            });
        } else {
            res.send({
            message: `Cannot delete Product_Materials with id=${id}. Maybe Product_Materials was not found!`,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Could not delete Product_Materials with id=" + id,
        });
        });
    }

export { createMaterial, findAllMaterial, findOneMaterial, updateMaterial, removeMaterial };