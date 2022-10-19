import db from "../models/index.js";
const Product_Finishings = db.product_finishings;

const ShowAllProductFinishings = (req, res) => {
    Product_Finishings.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving product finishings.",
            });
        });
}

export { ShowAllProductFinishings };