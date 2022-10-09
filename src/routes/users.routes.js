import {
  createUser,
  findAll,
  findOne,
} from "../controllers/users.controllers.js";
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const usersRoutes = (app) => {
  app.use(headers);

  router.post("/create", isLogin, isSuperAdmin, createUser);
  router.get("/findall", isLogin, findAll);
  router.get("/findone", isLogin, findOne);

  app.use("/api/users", router);
};

export default usersRoutes;
