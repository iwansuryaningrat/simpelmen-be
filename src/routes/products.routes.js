import {
  ShowAllProducts, ShowProductById, updateProduct, deleteProduct, createProduct
} from "../controllers/product.controller.js";
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const productsRoutes = (app) => {
  app.use(headers);

  router.get("/product", ShowAllProducts);
  router.get("/product:id", ShowProductById);
  router.post("/product", createProduct,isSuperAdmin,isLogin);
  router.put("/product:id", updateProduct,isSuperAdmin,isLogin);
  router.delete("product/:id", deleteProduct,isSuperAdmin,isLogin);

  app.use("/api/", router);
};

export default productsRoutes;
