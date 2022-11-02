import {
  createUser,
  findAll,
  findOne,
  updateUser,
  deactivateUser,
  changePassword,
  userProfile,
  updateProfile,
} from "../controllers/users.controllers.js";
import {
  addCart,
  findAllCart,
  CheckoutOrder,
  // updateOrder,
} from "../controllers/order_detail.controller.js"
import {
  ShowAllProducts,
  ShowProductById,
} from "../controllers/product.controller.js"
import { isLogin } from "../middlewares/auth.middlewares.js";
import { isUser } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const usersRoutes = (app) => {
  app.use(headers);

  // router.post("/create", isLogin, isUser, createUser);
  // router.get("/findall", isLogin, findAll);
  // router.get("/findone/:id", isLogin, findOne);
  router.put("/update/:id", isLogin, updateUser);
  router.get("/profile", isLogin,isUser, userProfile);
  router.put("/profile", isLogin,isUser, updateProfile);
  // router.put("/deactivate/:id", isLogin, isUser, deactivateUser);
  router.put("/changepassword/:id", isLogin, changePassword);
  // router.get("/product", ShowAllProducts);
  // router.get("/product/:id", ShowProductById);
  // router.post("/product/:id", isLogin, addCart);
  // router.get("/cart", isLogin, findAllCart);
  // router.put("/checkout", isLogin, CheckoutOrder);
  
  // router.put("/updateorder/:order_id", isLogin, updateOrder);


  app.use("/api/users", router);
};

export default usersRoutes;
