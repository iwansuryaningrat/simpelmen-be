import {
    verifyToken,
    isSuperAdmin,
    isActivated,
  } from "../middlewares/auth.middleware.js";
  import {
    adminBoard,showAllAdmin,updateAdmin,DeleteAdmin,showProfile,updateProfile,
  } from "../controllers/users/superadmin.controller.js";
  //product detail
  import {
    showProduct_detail,showProduct_detailById,updateProduct_detail,deleteProduct_detail,createProduct_detail,
  } from "../controllers/product_detail.controller.js";
  import express from "express";
  const router = express.Router();
  import headers from "../services/headers.services.js";
  
  const adminRoutes = (app) => {
    app.use(headers);
  
    router.get("/", verifyToken, isActivated, isSuperAdmin , adminBoard);
    router.get("/users", verifyToken, isActivated, isSuperAdmin , showAllAdmin);
    router.put("/users/:id", verifyToken, isActivated, isSuperAdmin , updateAdmin);
    router.delete("/users/:id", verifyToken, isActivated, isSuperAdmin , DeleteAdmin);
    router.get("/profile", verifyToken, isActivated, isSuperAdmin , showProfile);
    router.put("/profile", verifyToken, isActivated, isSuperAdmin , updateProfile);
    //product detail
    router.get("/product_detail", verifyToken, isActivated, isSuperAdmin , showProduct_detail);
    router.get("/product_detail/:id", verifyToken, isActivated, isSuperAdmin , showProduct_detailById);
    router.put("/product_detail/:id", verifyToken, isActivated, isSuperAdmin , updateProduct_detail);
    router.delete("/product_detail/:id", verifyToken, isActivated, isSuperAdmin , deleteProduct_detail);
    router.post("/product_detail", verifyToken, isActivated, isSuperAdmin , createProduct_detail);
    
    app.use("/api/super/admin", router);
  };
  
  export default adminRoutes;
  