import {
    ShowAllProductFinishings,
} from '../controllers/product_finishing.controller.js';

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const ProductFinishingRoutes = (app) => {
  app.use(headers);

    router.get("/finishing", ShowAllProductFinishings);
    app.use("/api/", router);
};

export default ProductFinishingRoutes;