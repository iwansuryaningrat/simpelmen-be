import {
  ShowAllProducts, ShowProductById, updateProduct, deleteProduct, createProduct,ShowAllProductByCategory
} from "../controllers/product/product.controller.js";
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const productsRoutes = (app) => {
  app.use(headers);

  router.get("/", ShowAllProducts);
  router.get("/:id", ShowProductById);
  router.post("/", createProduct,isSuperAdmin,isLogin);
  router.put("/:id", updateProduct,isSuperAdmin,isLogin);
  router.delete("/:id", deleteProduct,isSuperAdmin,isLogin);
  router.get("/detail/:id", ShowAllProductByCategory);
  app.use("/api/product", router);
};

export default productsRoutes;
