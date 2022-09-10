import {
    verifyToken,
    isSuperAdmin,
    isActivated,
  } from "../middlewares/auth.middleware.js";
  import {adminBoard,showAllAdmin,updateAdmin,DeleteAdmin,
} from "../controllers/superadmin.controller.js";
  import express from "express";
  const router = express.Router();
  import headers from "../services/headers.services.js";
  
  const adminRoutes = (app) => {
    app.use(headers);
  
    router.get("/", verifyToken, isActivated, isSuperAdmin , adminBoard);
    router.get("/users", verifyToken, isActivated, isSuperAdmin , showAllAdmin);
    router.put("/users/:id", verifyToken, isActivated, isSuperAdmin , updateAdmin);
    router.delete("/users/:id", verifyToken, isActivated, isSuperAdmin , DeleteAdmin);
    app.use("/api/super/admin", router);
  };
  
  export default adminRoutes;
  