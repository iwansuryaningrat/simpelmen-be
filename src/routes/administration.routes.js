import {
    verifyToken,
    isAdminTu,
    isActivated,
  } from "../middlewares/auth.middleware.js";
  import administration from "../controllers/administration.controller.js";
  import express from "express";
  const router = express.Router();
  import headers from "../services/headers.services.js";
  
  const AdministrationRoutes = (app) => {
    app.use(headers);
  
    router.get("/tu", verifyToken, isActivated, isAdminTu, administration);
  
    app.use("/api/admin", router);
  };
  
  export default AdministrationRoutes;
  