import db from "../models/index.js";
const Category = db.Product_Category;

const createCategory = (req, res) => {
  Category.create({
    product_category_name: req.body.product_category_name,
    //code
    product_category_code: req.body.product_category_code,
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
};
const updateCategory = (req, res) => {
  Category.update(
    {
      product_category_name: req.body.product_category_name,
      product_category_code: req.body.product_category_code,
    },
    {
      where: {
        product_category_id: req.params.product_category_id,
      },
    }
  ).then((category) => {
    res.status(200).send({
      message: "Update Success",
      data: category,
    });
  });
};
const deleteCategory = (req, res) => {
  Category.destroy({
    where: {
      product_category_id: req.params.product_category_id,
    },
  }).then((category) => {
    res.status(200).send({
      message: "Delete Success",
      data: category,
    });
  });
};
const showCategoryById = (req, res) => {
  Category.findOne({
    where: {
      product_category_id: req.params.product_category_id,
    },
  }).then((category) => {
    res.status(200).send(category);
  });
};
export {
  createCategory,
  showCategory,
  updateCategory,
  deleteCategory,
  showCategoryById,
};
