import {
  createUser,
  findAll,
  findOne,
  updateUser,
  deactivateUser,
  changePassword,
} from "../controllers/users.controllers.js";
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const productsRoutes = (app) => {
  app.use(headers);

  r;

  app.use("/api/users", router);
};

export default productsRoutes;
