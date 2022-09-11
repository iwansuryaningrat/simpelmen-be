import db from "../models/index.js";
const Product_detail = db.product_detail;
const Material = db.material;
const Size = db.size;
const Product_category = db.Product_Category;
const Op = db.Sequelize.Op;

const showProduct_detail = (req, res) => {
    Product_detail.findAll({
        include: [
            {
                model: Material,
                as: "material",
            },
            {
                model: Size,
                as: "size",
            },
            {
                model: Product_category,
                as: "product_category",
            },

        ],
    }).then((product_details) => {
        res.status(200).send(product_details);
    });
}
const showProduct_detailById = (req, res) => {
    Product_detail.findOne({
        where: {
            product_detail_id: req.params.product_detail_id,
        },
        include: [
            {
                model: Material,
                as: "material",
            },
            {
                model: Size,
                as: "size",
            },
            {
                model: Product_category,
                as: "product_category",
            },
        ],
    }).then((product_details) => {
        res.status(200).send(product_details);
    });
}
const createProduct_detail = (req, res) => {
    Product_detail.create({
        product_detail_name: req.body.product_detail_name,
        size_id: req.body.size_id,
        material_id: req.body.material_id,
        product_category_id: req.body.product_category_id,
    }).then((product_details) => {
        res.status(200).send({
        message: "Create Success",
        data: product_details,
        });
    });
    }

const updateProduct_detail = (req, res) => {
    Product_detail.update(
        {
            product_detail_name: req.body.product_detail_name,
            size_id: Size.findOne({
                where: {
                    size_id: req.body.size_id,
                },
            }),
            material_id: Material.findOne({
                where: {
                    material_id: req.body.material_id,
                },
            }),
            product_category_id: Product_category.findOne({
                where: {
                    product_category_id: req.body.product_category_id,
                },
            }),
        },
        {
            where: {
                product_detail_id: req.params.product_detail_id,
            },
        }
    ).then((product_details) => {
        res.status(200).send({
        message: "Update Success",
        data: product_details,
        });
    });
    }
const deleteProduct_detail = (req, res) => {
    Product_detail.destroy({
        where: {
            product_detail_id: req.params.product_detail_id,
        },
    }).then((product_details) => {
        res.status(200).send({
        message: "Delete Success",
        data: product_details,
        });
    });
    }
export {showProduct_detail, showProduct_detailById, createProduct_detail, updateProduct_detail, deleteProduct_detail};
