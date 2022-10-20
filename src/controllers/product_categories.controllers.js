import db from "../models/index.js";
const Product_Categories = db.product_categories;
const Op = db.Sequelize.Op;

// Create and Save a new Product_Categories
const create = (req, res) => {
    const { name, description } = req.body;
    
    // Validate request
    if (!name) {
        return res.status(400).send({
        message: "Content can not be empty!",
        });
    }
    
    // Create a Product_Categories
    const product_categories = {
        product_category_name: name,
        product_category_description: description,
    };
    
    // Save Product_Categories in the database
    Product_Categories
        .create(product_categories)
        .then((data) => {
        res.send({
            message: "Product_Categories was created successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Product_Categories.",
        });
        });
    };
const findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    
    Product_Categories
        .findAll({ where: condition })
        .then((data) => {
        if (data == null) {
            return res.status(404).send({
            message: "Product_Categories not found",
            });
        }
        
        res.send({
            message: "Product_Categories was retrieved successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Product_Categories.",
        });
        });
    };
const findOne = (req, res) => {
    const id = req.params.id;
    
    Product_Categories
        .findByPk(id)
        .then((data) => {
        if (data == null) {
            return res.status(404).send({
            message: "Product_Categories not found",
            });
        }
        
        res.send({
            message: "Product_Categories was retrieved successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Product_Categories.",
        });
        });
    };
const update = (req, res) => {
    const id = req.params.id;
    
    Product_Categories
        .update(req.body, {
        where: { product_category_id: id },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Product_Categories was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Product_Categories with id=${id}. Maybe Product_Categories was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while updating Product_Categories.",
        });
        });
    };
const remove = (req, res) => {
    const id = req.params.id;
    
    Product_Categories
        .destroy({
        where: { product_category_id: id },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Product_Categories was deleted successfully!",
            });
        } else {
            res.send({
            message: `Cannot delete Product_Categories with id=${id}. Maybe Product_Categories was not found!`,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while deleting Product_Categories.",
        });
        });
    };

export { create, findAll, findOne, update, remove };
