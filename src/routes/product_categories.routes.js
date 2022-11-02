import {
    create,
    findAll,
    findOne,
    update,
    remove
} from "../controllers/product_categories.controllers.js";

import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const productCategoriesRoutes = (app) => {
    app.use(headers);

    router.post("/", isLogin, isSuperAdmin, create);
    router.get("/", isLogin, isSuperAdmin, findAll);
    router.get("/:id", isLogin, isSuperAdmin, findOne);
    router.put("/:id", isLogin, isSuperAdmin, update);
    router.delete("/:id", isLogin, isSuperAdmin, remove);

    app.use("/api/category", router);
}

export default productCategoriesRoutes;