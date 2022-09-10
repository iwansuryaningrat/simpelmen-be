import {
    verifyToken,
    isAdminProduction,
    isActivated,
  } from "../middlewares/auth.middleware.js";
  import productionBoard from "../controllers/production.controller.js";
  import express from "express";
  const router = express.Router();
  import headers from "../services/headers.services.js";
  
  const productionRoutes = (app) => {
    app.use(headers);
  
    router.get("/production", verifyToken, isActivated, isAdminProduction, productionBoard);
  
    app.use("/api/admin", router);
  };
  
  export default productionRoutes;
  