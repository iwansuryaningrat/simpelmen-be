import {
    createSize,findAllSize,findOneSize,updateSize,deleteOneSize
} from "../controllers/product/product_sizes.controllers.js";

import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const productSizesRoutes = (app) => {
    app.use(headers);

    router.post("/", isLogin, isSuperAdmin, createSize);
    router.get("/", isLogin, isSuperAdmin, findAllSize);
    router.get("/:id", isLogin, isSuperAdmin, findOneSize);
    router.put("/:id", isLogin, isSuperAdmin, updateSize);
    router.delete("/:id", isLogin, isSuperAdmin, deleteOneSize);

    app.use("/api/size", router);
}

export default productSizesRoutes;
