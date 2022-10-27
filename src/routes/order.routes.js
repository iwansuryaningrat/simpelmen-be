import {
    ShowAllProducts,
    ShowProductById
} from "../controllers/product.controller.js";
import {
    addCart,
    findAllCart,
    CheckoutOrder,
    removeCart,
    showTracking,
    ShowAllOrder,
    DetailOrder,
} from "../controllers/order_detail.controller.js"
import {
    showStatusOrder,
} from "../controllers/user_order.controller.js";

import { 
    
    isLogin,
    isOrderUser,

} from "../middlewares/auth.middlewares.js";
import { isUser } from "../middlewares/roles.middlewares.js";

import express from "express";
const router = express.Router();

import headers from "../services/headers.services.js";

const ordersRoutes = (app) => {
  app.use(headers);

    router.post("/cart/:id", isLogin, isUser, addCart);
    router.get("/cart", isLogin, isUser,findAllCart);
    router.delete("/cart/:id", isLogin, isUser, removeCart);
    router.put("/checkout", isLogin, isUser,CheckoutOrder);
    router.get("/status", isLogin, isUser,showStatusOrder);
    router.get("/tracking", isLogin, isUser,showTracking);
    router.get("/list", isLogin, isUser,ShowAllOrder,isOrderUser);
    router.get("/list/:id", isLogin, isUser,DetailOrder,isOrderUser);
    app.use("/api/order", router);

};

export default ordersRoutes;