import {
    verifyToken,
    isAdminWarehouse,
    isActivated,
  } from "../middlewares/auth.middleware.js";
  import warehouseBoard from "../controllers/users/warehouse.controller.js";
  import express from "express";
  const router = express.Router();
  import headers from "../services/headers.services.js";
  
  const warehouseRoutes = (app) => {
    app.use(headers);
  
    router.get("/warehouse", verifyToken, isActivated, isAdminWarehouse, warehouseBoard);
  
    app.use("/api/admin", router);
  };
  
  export default warehouseRoutes;
  