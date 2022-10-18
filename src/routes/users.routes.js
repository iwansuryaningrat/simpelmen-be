import {
  createUser,
  findAll,
  findOne,
  updateUser,
  deactivateUser,
  changePassword,
} from "../controllers/users.controllers.js";
import {
  createOrder,
  showOrder
} from "../controllers/order_detail.controller.js"
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const usersRoutes = (app) => {
  app.use(headers);

  router.post("/create", isLogin, isSuperAdmin, createUser);
  router.get("/findall", isLogin, findAll);
  router.get("/findone/:id", isLogin, findOne);
  router.put("/update/:id", isLogin, updateUser);
  router.put("/deactivate/:id", isLogin, isSuperAdmin, deactivateUser);
  router.put("/changepassword/:id", isLogin, changePassword);
  router.post("/createorder", isLogin, createOrder);
  router.get("/showorder", isLogin, showOrder);


  app.use("/api/users", router);
};

export default usersRoutes;
