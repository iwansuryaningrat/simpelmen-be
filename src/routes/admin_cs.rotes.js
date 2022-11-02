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
    showAllRetribution,
    OrderAccept,
    OrderDecline,
    showRetributonById,
    updateRetribution,
    removeRetribution,
    rejectRetribution,
    acceptRetribution,
    showPAD,
    UpdateStatusPAD,
    RekapPesanaan,
  } from "../controllers/customer_service.controller.js";
  import { isLogin } from "../middlewares/auth.middlewares.js";
  import { isAdminCS } from "../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../services/headers.services.js";
  
  const adminCSRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isAdminCS, userProfile);
    router.put("/profile", isLogin, isAdminCS, updateProfile);
    router.put("/changepassword/:id", isLogin, changePassword);
    router.get("/orders", isLogin, isAdminCS, showAllOrder);
    router.put("/orders/accept/:id", isLogin, isAdminCS, OrderAccept);
    router.put("/orders/decline/:id", isLogin, isAdminCS, OrderDecline);
    router.get("/retributions/:retribution_id", isLogin, isAdminCS, showRetributonById);
    router.get("/retributions", isLogin, isAdminCS, showAllRetribution);
    router.put("/retributions/:retribution_id", isLogin, isAdminCS, updateRetribution);
    router.delete("/retributions/:retribution_id", isLogin, isAdminCS, removeRetribution);
    router.put("/retributions/accept/:retribution_id", isLogin, isAdminCS, acceptRetribution);
    router.put("/retributions/reject/:retribution_id", isLogin, isAdminCS, rejectRetribution);
    router.get("/pad", isLogin, isAdminCS, showPAD);
    router.put("/pad/:id", isLogin, isAdminCS, UpdateStatusPAD);
    router.get("/rekap/order", isLogin, isAdminCS, RekapPesanaan);

    app.use("/api/admin/cs", router);
  };
  
  export default adminCSRoutes;
  