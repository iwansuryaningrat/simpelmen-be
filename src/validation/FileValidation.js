import db from "../models/index.js";
const OrderDetails = db.order_details;
import fs from "fs";
import * as dotenv from "dotenv";


dotenv.config();

const fileValidation = (req, res, next) => {
    const id = req.params.id;
    OrderDetails.findOne({
        where: {
            order_detail_id: id,
        },
    })
    .then((data) => {
        const oldFile = data.order_detail_design_image;
        fs.unlink(`./public/images/${oldFile}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        }
        );
        next();
    })
    .catch((err) => {
        res.status(500).send({
            message: "Error Removing File With Order ID : " + id,
        });
    }
    );
};

export default fileValidation;