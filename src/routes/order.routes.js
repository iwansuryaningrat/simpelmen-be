import {
    ShowAllProducts,
    ShowProductById
} from "../controllers/product.controller.js";
import {
    addCart,
    findAllCart,
    CheckoutOrder,
} from "../controllers/order_detail.controller.js"


import { isLogin } from "../middlewares/auth.middlewares.js";
import { isUser } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const ordersRoutes = (app) => {
  app.use(headers);

    router.post("/:id", isLogin, isUser, addCart);
    router.get("/cart", isLogin, isUser,findAllCart);
    router.put("/checkout", isLogin, isUser,CheckoutOrder);
    app.use("/api/order", router);

};

export default ordersRoutes;