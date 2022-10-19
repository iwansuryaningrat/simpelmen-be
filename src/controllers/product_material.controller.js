import db from "../models/index.js";
const Product_Materials = db.product_materials;


const ShowAllProductMaterials = (req, res) => {
    Product_Materials.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving product materials.",
            });
        });
}

export { ShowAllProductMaterials };