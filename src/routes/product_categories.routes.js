import {
    createCategory,
    findAllCategory,
    findOneCategory,
    updateCategory,
    removeCategory
} from "../controllers/product/product_categories.controllers.js";

import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const productCategoriesRoutes = (app) => {
    app.use(headers);

    router.post("/", isLogin, isSuperAdmin, createCategory);
    router.get("/", isLogin, isSuperAdmin, findAllCategory);
    router.get("/:id", isLogin, isSuperAdmin, findOneCategory);
    router.put("/:id", isLogin, isSuperAdmin, updateCategory);
    router.delete("/:id", isLogin, isSuperAdmin, removeCategory);

    app.use("/api/category", router);
}

export default productCategoriesRoutes;