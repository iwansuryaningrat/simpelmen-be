import {
  createjenisProduct,findAllJenisProduct,findOneJenisProduct,updateJenisProduct,deleteOneJenisProduct
} from "../controllers/product/jenis_products.controllers.js";
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const jenisProductsRoutes = (app) => {
  app.use(headers);

  router.post("/", isLogin, isSuperAdmin, createjenisProduct);
  router.get("/", isLogin, isSuperAdmin, findAllJenisProduct);
  router.get("/:id", isLogin, isSuperAdmin, findOneJenisProduct);
  router.put("/:id", isLogin, isSuperAdmin, updateJenisProduct);
  router.delete("/:id", isLogin, isSuperAdmin, deleteOneJenisProduct);

  app.use("/api/jenisproducts", router);
};

export default jenisProductsRoutes;
