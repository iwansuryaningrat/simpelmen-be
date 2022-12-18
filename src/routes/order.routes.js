import {
    addCart,
    findAllCart,
    CheckoutOrder,
    removeCart,
    showTracking,
    ShowAllOrder,
    DetailOrder,
    BuyNow,
    updateCart,
} from "../controllers/orders.controller.js"
import {
    showStatusOrder,
    acceptOrder,
    uploadImage,
} from "../controllers/user_order.controller.js";
import {
    isUserLogin,
} from "../services/isUser.js";
import { 
    
    isLogin,

} from "../middlewares/auth.middlewares.js";
import { isUser } from "../middlewares/roles.middlewares.js";

import express from "express"; 
const router = express.Router();

import headers from "../services/headers.services.js";
import validate from "../validation/FileValidation.js";

const ordersRoutes = (app) => {
  app.use(headers);

    router.post("/cart/:id", isLogin, isUser, isUserLogin, addCart);
    router.get("/cart", isLogin, isUser, isUserLogin, findAllCart);
    router.delete("/cart/:id", isLogin, isUser, isUserLogin, removeCart);
    router.put("/checkout", isLogin, isUser, CheckoutOrder);
    router.get("/status", isLogin, isUser, isUserLogin, showStatusOrder);
    router.get("/tracking", isLogin, isUser, isUserLogin, showTracking);
    router.get("/list", isLogin, isUser, isUserLogin, ShowAllOrder);
    router.get("/list/:id", isLogin, isUser, isUserLogin, DetailOrder);
    router.put("/accept/:id", isLogin, isUser, acceptOrder);
    router.post("/buy", isLogin, isUser, isUserLogin,BuyNow);
    router.put("/cart/:id", isLogin, isUser, isUserLogin, updateCart);
    router.put("/upload/:id", isLogin,validate, isUser, isUserLogin, uploadImage);
    app.use("/api/order", router);

};

export default ordersRoutes;