import {
    createUser,
    findAll,
    findOne,
    updateUser,
    deactivateUser,
    changePassword,
    userProfile,
    updateProfile,
  } from "../../controllers/users.controllers.js";
  import {
    showAllOrder,
    ApproveOrderDesain,
    UpdateOrderNotApproveDesain,
    RemoveDesain,
    UpdateDesain,
    showDetailOrder,
  } from "../../controllers/admin/admin_design.controller.js";
  import { isLogin } from "../../middlewares/auth.middlewares.js";
  import { isAdminDesign } from "../../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../../services/headers.services.js";
import { showOrderByID } from "../../controllers/admin/admin_produksi.controller.js";
  
  const adminDesainRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isAdminDesign, userProfile);
    router.put("/profile", isLogin, isAdminDesign, updateProfile);
    router.get("/orders", isLogin, isAdminDesign, showAllOrder);
    router.get("/orders/:id", isLogin, isAdminDesign, showDetailOrder)
    router.put("/changepassword/:id", isLogin, changePassword);
    router.put("/orders/decline/:id", isLogin, isAdminDesign, UpdateOrderNotApproveDesain);
    router.put("/orders/approve/:id", isLogin, isAdminDesign, ApproveOrderDesain);
    router.put("/orders/remove-desain/:id", isLogin, isAdminDesign, RemoveDesain);
    router.put("/orders/update-desain/:id", isLogin, isAdminDesign, UpdateDesain);
    router.put("/orders/ganti-desain/:id", isLogin, isAdminDesign, UpdateDesain);
    app.use("/api/admin/desain", router);
  };
  
  export default adminDesainRoutes;
  