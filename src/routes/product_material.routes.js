import {
    ShowAllProductMaterials,
} from '../controllers/product_material.controller.js';

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const ProductMaterialRoutes = (app) => {
  app.use(headers);

    router.get("/material", ShowAllProductMaterials);
    app.use("/api/", router);
};

export default ProductMaterialRoutes;