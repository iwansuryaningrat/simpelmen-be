import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../controllers/roles.controllers.js";
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const rolesRoutes = (app) => {
  app.use(headers);

  router.get("/findall", isLogin, isSuperAdmin, getAll);
  router.get("/findone/:id", isLogin, isSuperAdmin, getOne);
  router.post("/create", isLogin, isSuperAdmin, create);
  router.put("/update/:id", isLogin, isSuperAdmin, update);
  router.delete("/delete/:id", isLogin, isSuperAdmin, remove);

  app.use("/api/roles", router);
};

export default rolesRoutes;
