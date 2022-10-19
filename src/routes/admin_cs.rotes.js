import {
    createUser,
    findAll,
    findOne,
    updateUser,
    deactivateUser,
    changePassword,
    userProfile,
  } from "../controllers/users.controllers.js";
  import {
    updateOrder,
    findAllOrder,
  } from "../controllers/admin_cs.controller.js"
  import { isLogin } from "../middlewares/auth.middlewares.js";
  import { isAdminDesign } from "../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../services/headers.services.js";
  
  const adminCSRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isAdminDesign,userProfile);
    router.put("/order/:order_id", isLogin,isAdminDesign,updateOrder);
    router.get("/order", isLogin, isAdminDesign,findAllOrder);
  
    app.use("/api/admin/design", router);
  };
  
  export default adminCSRoutes;
  