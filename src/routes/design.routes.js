import {
    verifyToken,
    isAdminDesign,
    isActivated,
  } from "../middlewares/auth.middleware.js";
  import designBoard from "../controllers/design.controller.js";
  import express from "express";
  const router = express.Router();
  import headers from "../services/headers.services.js";
  
  const designRoutes = (app) => {
    app.use(headers);
  
    router.get("/design", verifyToken, isActivated, isAdminDesign, designBoard);
  
    app.use("/api/admin", router);
  };
  
  export default designRoutes;
  