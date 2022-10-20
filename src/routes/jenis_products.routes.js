import {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
} from "../controllers/jenis_products.controllers.js";
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const jenisProductsRoutes = (app) => {
  app.use(headers);

  router.post("/", isLogin, isSuperAdmin, create);
  router.get("/", isLogin, isSuperAdmin, findAll);
  router.get("/:id", isLogin, isSuperAdmin, findOne);
  router.put("/:id", isLogin, isSuperAdmin, update);
  router.delete("/:id", isLogin, isSuperAdmin, deleteOne);

  app.use("/api/jenisproducts", router);
};

export default jenisProductsRoutes;
