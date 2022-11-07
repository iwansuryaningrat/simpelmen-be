import db from "../models/index.js";
const Product_Sizes = db.product_sizes;
const Op = db.Sequelize.Op;

// Create and Save a new Product_Sizes
const createSize = (req, res) => {
    const {length, width, height, weight, length2, width2, height2,shape} = req.body;

    // Validate request
    if (!length) {
        return res.status(400).send({
        message: "Content can not be empty!",
        });
    }

    // Create a Product_Sizes
    const product_sizes = {
        product_size_length: length,
        product_size_width: width,
        product_size_height: height,
        product_size_weight: weight,
        product_size_length2: length2,
        product_size_width2: width2,
        product_size_height2: height2,
        product_size_shape: shape,
    };

    // Save Product_Sizes in the database
    Product_Sizes
        .create(product_sizes)
        .then((data) => {
        res.send({
            message: "Product_Sizes was created successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Product_Sizes.",
        });
        });
    }
const findAllSize = (req, res) => {
    Product_Sizes
        .findAll()
        .then((data) => {
        if (data == null) {
            return res.status(404).send({
            message: "Product_Sizes not found",
            });
        }

        res.send({
            message: "Product_Sizes was retrieved successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Product_Sizes.",
        });
        });
    }
const findOneSize = (req, res) => {
    const id = req.params.id;

    Product_Sizes
        .findByPk(id)
        .then((data) => {
        if (data == null) {
            return res.status(404).send({
            message: "Product_Sizes not found",
            });
        }
        
        res.send({
            message: "Product_Sizes was retrieved successfully!",
            data,
        });
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Error retrieving Product_Sizes with id=" + id,
        });
        });
    }
const updateSize = (req, res) => {
    const id = req.params.id;

    Product_Sizes
        .update(req.body, {
        where: { product_size_id: id },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Product_Sizes was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Product_Sizes with id=${id}. Maybe Product_Sizes was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Error updating Product_Sizes with id=" + id,
        });
        });
    }
const deleteOneSize = (req, res) => {
    const id = req.params.id;

    Product_Sizes
        .destroy({
        where: { product_size_id: id },
        })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Product_Sizes was deleted successfully!",
            });
        } else {
            res.send({
            message: `Cannot delete Product_Sizes with id=${id}. Maybe Product_Sizes was not found!`,
            });
        }
        })
        .catch((err) => {
        return res.status(500).send({
            message: "Could not delete Product_Sizes with id=" + id,
        });
        });
    }

    export {createSize,findAllSize,findOneSize,updateSize,deleteOneSize}