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
    UpdateOrderNotApproveTU,
    ApproveOrderTU,
  } from "../controllers/admin_tu.controller.js";
  import { isLogin } from "../middlewares/auth.middlewares.js";
  import { isAdminTu } from "../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../services/headers.services.js";
  
  const adminTuRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isAdminTu, userProfile);
    router.put("/profile", isLogin, isAdminTu, updateProfile);
    router.get("/orders", isLogin, isAdminTu, showAllOrder);
    router.put("/orders/decline/:id", isLogin, isAdminTu, UpdateOrderNotApproveTU);
    router.put("/orders/approve/:id", isLogin, isAdminTu, ApproveOrderTU);
    
    app.use("/api/admin/tu", router);
  };
  
  export default adminTuRoutes;
  