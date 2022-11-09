import {
    createUser,
    findAll,
    findOne,
    updateUser,
    deactivateUser,
    changePassword,
    userProfile,
    updateProfile,
    role,
  } from "../controllers/users.controllers.js";
  import { isLogin } from "../middlewares/auth.middlewares.js";
  import { isSuperAdmin } from "../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../services/headers.services.js";
  
  const superAdminRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isSuperAdmin, userProfile);
    router.put("/profile", isLogin, isSuperAdmin, updateProfile);
    router.put("/changepassword/:id", isLogin, changePassword);
    router.post("/create/admin", isLogin, isSuperAdmin, createUser);
    router.put("/update/admin/:id", isLogin, isSuperAdmin, updateUser);
    router.get("/data/admin", isLogin, isSuperAdmin, findAll);
    router.get("/data/admin/:id", isLogin, isSuperAdmin, findOne);
    router.get("/role", isLogin, isSuperAdmin, role);

    app.use("/api/super/admin", router);
  };
  
  export default superAdminRoutes;
  