import db from "../models/index.js";
const Product_Finishings = db.product_finishings;
const Op = db.Sequelize.Op;

// Create and Save a new Product_Finishings
const createFinishing = (req, res) => {
    const { name, description } = req.body;
    
    // Validate request
    if (!name) {
        return res.status(400).send({
        message: "Content can not be empty!",
        });
    }
    
    // Create a Product_Finishings
    const product_finishings = {
        product_finishing_name: name,
        product_finishing_description: description,
    };
    
    // Save Product_Finishings in the database
    Product_Finishings
        .create(product_finishings)
        .then((data) => {
        res.send({
            message: "Product_Finishings was created successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Product_Finishings.",
        });
        });
    };
const findAllFinishing = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    
    Product_Finishings
        .findAll({ where: condition })
        .then((data) => {
        if (data == null) {
            return res.status(404).send({
            message: "Product_Finishings not found",
            });
        }
        
        res.send({
            message: "Product_Finishings was retrieved successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Product_Finishings.",
        });
        });
    }
const findOneFinishing = (req, res) => {
    const id = req.params.id;
    
    Product_Finishings
        .findByPk(id)
        .then((data) => {
        if (data == null) {
            return res.status(404).send({
            message: "Product_Finishings not found",
            });
        }
        
        res.send({
            message: "Product_Finishings was retrieved successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Error retrieving Product_Finishings with id=" + id,
        });
        });
    }
const updateFinishing = (req, res) => {
    const id = req.params.id;
    
    Product_Finishings
        .update(req.body, {
        where: { product_finishing_id: id },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Product_Finishings was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Product_Finishings with id=${id}. Maybe Product_Finishings was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Error updating Product_Finishings with id=" + id,
        });
        });
    }
const removeFinishing = (req, res) => {
    const id = req.params.id;
    
    Product_Finishings
        .destroy({
        where: { product_finishing_id: id },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Product_Finishings was deleted successfully!",
            });
        } else {
            res.send({
            message: `Cannot delete Product_Finishings with id=${id}. Maybe Product_Finishings was not found!`,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Could not delete Product_Finishings with id=" + id,
        });
        });
    }

export { createFinishing, findAllFinishing, findOneFinishing, updateFinishing, removeFinishing };