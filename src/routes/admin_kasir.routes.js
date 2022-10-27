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
    showAllOrder,
    DpPaymentMethod,
    LangsungPaymentMethod,
    LunasPaymentMethod,

  } from "../controllers/admin_kasir.controller";
  import { isLogin } from "../middlewares/auth.middlewares.js";
  import { isAdminCashier } from "../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../services/headers.services.js";
  
  const adminCashierRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isAdminCashier, userProfile);
    router.put("/profile", isLogin, isAdminCashier, updateProfile);
    router.get("/orders", isLogin, isAdminCashier, showAllOrder);
    router.put("/orders/dp/:id", isLogin, isAdminCashier, DpPaymentMethod);
    router.put("/orders/langsung/:id", isLogin, isAdminCashier, LangsungPaymentMethod);
    router.put("/orders/lunas/:id", isLogin, isAdminCashier, LunasPaymentMethod);
    
    app.use("/api/admin/kasir", router);
  };
  
  export default adminCashierRoutes;
  