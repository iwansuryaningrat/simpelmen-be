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
    showOrderByID,
    UpdateOrderBelumProduksi,
    UpdateOrderDalamProduksi,
    UpdateOrderSelesaiProduksi,
  } from "../controllers/admin_produksi.controller.js";
  import { isLogin } from "../middlewares/auth.middlewares.js";
  import { isAdminProduction } from "../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../services/headers.services.js";
  
  const adminProductionRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isAdminProduction, userProfile);
    router.put("/profile", isLogin, isAdminProduction, updateProfile);
    router.get("/orders", isLogin, isAdminProduction, showAllOrder);
    router.get("/orders/:id", isLogin, isAdminProduction, showOrderByID);
    router.put("/orders/belum-produksi/:id", isLogin, isAdminProduction, UpdateOrderBelumProduksi);
    router.put("/orders/dalam-produksi/:id", isLogin, isAdminProduction, UpdateOrderDalamProduksi);
    router.put("/orders/selesai-produksi/:id", isLogin, isAdminProduction, UpdateOrderSelesaiProduksi);

    app.use("/api/admin/produksi", router);
  };
  
  export default adminProductionRoutes;
  