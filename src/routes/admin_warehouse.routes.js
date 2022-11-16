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
    UpdateOrderDikirim,
    UpdateResiPengiriman,
    UpdateOrderBelumDikirim,
  } from "../controllers/admin_warehouse.controller.js";
  import { isLogin } from "../middlewares/auth.middlewares.js";
  import { isAdminWarehouse } from "../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../services/headers.services.js";
  
  const adminWarehouseRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isAdminWarehouse, userProfile);
    router.put("/profile", isLogin, isAdminWarehouse, updateProfile);
    router.get("/orders", isLogin, isAdminWarehouse, showAllOrder);
    router.put("/orders/dikirim/:id", isLogin, isAdminWarehouse, UpdateOrderDikirim);
    router.put("/orders/belum-dikirim/:id", isLogin, isAdminWarehouse, UpdateOrderBelumDikirim);
    router.put("/orders/resi/:id", isLogin, isAdminWarehouse, UpdateResiPengiriman);

    app.use("/api/admin/gudang", router);
  };
  
  export default adminWarehouseRoutes;
  