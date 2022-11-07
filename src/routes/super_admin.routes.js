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
  import {
    ShowAllProducts, 
    ShowProductById, 
    updateProduct, 
    deleteProduct, 
    createProduct 
  } from "../controllers/product.controller.js";
  import {
    createFinishing, findAllFinishing, findOneFinishing, updateFinishing, removeFinishing
  } from "../controllers/product_finishings.controllers.js";
  import {
    createMaterial, findAllMaterial, findOneMaterial, updateMaterial, removeMaterial
  } from "../controllers/product_materials.controllers.js";
  import {
    createSize,findAllSize,findOneSize,updateSize,deleteOneSize
  } from "../controllers/product_sizes.controllers.js";
  import {
    createCategory, findAllCategory, findOneCategory, updateCategory, removeCategory
  } from "../controllers/product_categories.controllers.js";
  import {
    createjenisProduct, findAllJenisProduct, findOneJenisProduct, updateJenisProduct, deleteOneJenisProduct 
  } from "../controllers/jenis_products.controllers.js";
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
    router.get("/data/admin", isLogin, isSuperAdmin, findAll);
    router.get("/data/admin/:id", isLogin, isSuperAdmin, findOne);
    // router.get("/product", ShowAllProducts);
    // router.get("/product/:id", ShowProductById);
    // router.post("/product", createProduct,isSuperAdmin,isLogin);
    // router.put("/product/:id", updateProduct,isSuperAdmin,isLogin);
    // router.delete("/product/:id", deleteProduct,isSuperAdmin,isLogin);
    // router.post("/product/finishings", isLogin, isSuperAdmin, createFinishing);
    // router.get("/product/finishings", isLogin, isSuperAdmin, findAllFinishing);
    // router.get("/product/finishings/:id", isLogin, isSuperAdmin, findOneFinishing);
    // router.put("/product/finishings/:id", isLogin, isSuperAdmin, updateFinishing);
    // router.delete("/product/finishings/:id", isLogin, isSuperAdmin, removeFinishing);
    // router.post("/product/materials", isLogin, isSuperAdmin, createMaterial);
    // router.get("/product/materials", isLogin, isSuperAdmin, findAllMaterial);
    // router.get("/product/materials/:id", isLogin, isSuperAdmin, findOneMaterial);
    // router.put("/product/materials/:id", isLogin, isSuperAdmin, updateMaterial);
    // router.delete("/product/materials/:id", isLogin, isSuperAdmin, removeMaterial);
    // router.post("/product/sizes", isLogin, isSuperAdmin, createSize);
    // router.get("/product/sizes", isLogin, isSuperAdmin, findAllSize);
    // router.get("/product/sizes/:id", isLogin, isSuperAdmin, findOneSize);
    // router.put("/product/sizes/:id", isLogin, isSuperAdmin, updateSize);
    // router.delete("/product/sizes/:id", isLogin, isSuperAdmin, deleteOneSize);
    // router.post("/product/categories", isLogin, isSuperAdmin, createCategory);
    // router.get("/product/categories", isLogin, isSuperAdmin, findAllCategory);
    // router.get("/product/categories/:id", isLogin, isSuperAdmin, findOneCategory);
    // router.put("/product/categories/:id", isLogin, isSuperAdmin, updateCategory);
    // router.delete("/product/categories/:id", isLogin, isSuperAdmin, removeCategory);
    // router.post("/product/finishings", isLogin, isSuperAdmin, createFinishing);
    // router.get("/product/finishings", isLogin, isSuperAdmin, findAllFinishing);
    // router.get("/product/finishings/:id", isLogin, isSuperAdmin, findOneFinishing);
    // router.put("/product/finishings/:id", isLogin, isSuperAdmin, updateFinishing);
    // router.delete("/product/finishings/:id", isLogin, isSuperAdmin, removeFinishing);
    // router.post("/product/jenis", isLogin, isSuperAdmin, createjenisProduct);
    // router.get("/product/jenis", isLogin, isSuperAdmin, findAllJenisProduct);
    // router.get("/product/jenis/:id", isLogin, isSuperAdmin, findOneJenisProduct);
    // router.put("/product/jenis/:id", isLogin, isSuperAdmin, updateJenisProduct);
    // router.delete("/product/jenis/:id", isLogin, isSuperAdmin, deleteOneJenisProduct);
    router.get("/role", isLogin, isSuperAdmin, role);

    app.use("/api/super/admin", router);
  };
  
  export default superAdminRoutes;
  