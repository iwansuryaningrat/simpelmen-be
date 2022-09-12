import db from "../models/index.js";
const Category = db.category;

const createCategory = (req, res) => {
    Category.create({
        category_name: req.body.category_name,
        category_description: req.body.category_description,
    }).then((category) => {
        res.status(200).send({
        message: "Create Success",
        data: category,
        });
    });
    };
const showCategory = (req, res) => {
    Category.findAll().then((category) => {
        res.status(200).send(category);
    });
    }
const updateCategory = (req, res) => {
    Category.update(
        {
            category_name: req.body.category_name,
            category_description: req.body.category_description,
        },
        {
            where: {
                category_id: req.params.category_id,
            },
        }
    ).then((category) => {
        res.status(200).send({
        message: "Update Success",
        data: category,
        });
    });
    }
const deleteCategory = (req, res) => {
    Category.destroy({
        where: {
            category_id: req.params.category_id,
        },
    }).then((category) => {
        res.status(200).send({
        message: "Delete Success",
        data: category,
        });
    });
    }
const showCategoryById = (req, res) => {
    Category.findOne({
        where: {
            category_id: req.params.category_id,
        },
    }).then((category) => {
        res.status(200).send(category);
    });
    }
export {createCategory, showCategory, updateCategory, deleteCategory, showCategoryById};