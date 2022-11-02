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
    ShowAllProducts, 
    ShowProductById, 
    updateProduct, 
    deleteProduct, 
    createProduct 
  } from "../controllers/product.controller.js";
  import {
    create, findAll, findOne, update, remove
  } from "../controllers/product_finishings.controllers.js";
  import {
    create, findAll, findOne, update, remove
  } from "../controllers/product_materials.controllers.js";
  import {
    create, findAll, findOne, update, remove
  } from "../controllers/product_sizes.controllers.js";
  import {
    create, findAll, findOne, update, remove
  } from "../controllers/product_categories.controllers.js";
  import {
    create, findAll, findOne, update, deleteOne
  } from "../controllers/jenis_products.controllers.js";
  import { isLogin } from "../middlewares/auth.middlewares.js";
  import { isSuperAdmin } from "../middlewares/roles.middlewares.js";
  
  import express from "express";
  const router = express.Router();
  
  import headers from "../services/headers.services.js";
  
  const superAdminRoutes = (app) => {
    app.use(headers);
    
    router.get("/profile", isLogin, isAdminCashier, userProfile);
    router.put("/profile", isLogin, isAdminCashier, updateProfile);
    router.put("/changepassword/:id", isLogin, changePassword);
    router.post("/create/admin", isLogin, isSuperAdmin, createUser);
    router.get("/data/admin", isLogin, isSuperAdmin, findAll);
    router.get("/data/admin/:id", isLogin, isSuperAdmin, findOne);
    router.get("/product", ShowAllProducts);
    router.get("/product/:id", ShowProductById);
    router.post("/product", createProduct,isSuperAdmin,isLogin);
    router.put("/product/:id", updateProduct,isSuperAdmin,isLogin);
    router.delete("/product/:id", deleteProduct,isSuperAdmin,isLogin);
    router.post("/product/finishings", isLogin, isSuperAdmin, create);
    router.get("/product/finishings", isLogin, isSuperAdmin, findAll);
    router.get("/product/finishings/:id", isLogin, isSuperAdmin, findOne);
    router.put("/product/finishings/:id", isLogin, isSuperAdmin, update);
    router.delete("/product/finishings/:id", isLogin, isSuperAdmin, remove);
    router.post("/product/materials", isLogin, isSuperAdmin, create);
    router.get("/product/materials", isLogin, isSuperAdmin, findAll);
    router.get("/product/materials/:id", isLogin, isSuperAdmin, findOne);
    router.put("/product/materials/:id", isLogin, isSuperAdmin, update);
    router.delete("/product/materials/:id", isLogin, isSuperAdmin, remove);
    router.post("/product/sizes", isLogin, isSuperAdmin, create);
    router.get("/product/sizes", isLogin, isSuperAdmin, findAll);
    router.get("/product/sizes/:id", isLogin, isSuperAdmin, findOne);
    router.put("/product/sizes/:id", isLogin, isSuperAdmin, update);
    router.delete("/product/sizes/:id", isLogin, isSuperAdmin, remove);
    router.post("/product/categories", isLogin, isSuperAdmin, create);
    router.get("/product/categories", isLogin, isSuperAdmin, findAll);
    router.get("/product/categories/:id", isLogin, isSuperAdmin, findOne);
    router.put("/product/categories/:id", isLogin, isSuperAdmin, update);
    router.delete("/product/categories/:id", isLogin, isSuperAdmin, remove);
    router.post("/product/finishings", isLogin, isSuperAdmin, create);
    router.get("/product/finishings", isLogin, isSuperAdmin, findAll);
    router.get("/product/finishings/:id", isLogin, isSuperAdmin, findOne);
    router.put("/product/finishings/:id", isLogin, isSuperAdmin, update);
    router.delete("/product/finishings/:id", isLogin, isSuperAdmin, remove);
    router.post("/product/jenis", isLogin, isSuperAdmin, create);
    router.get("/product/jenis", isLogin, isSuperAdmin, findAll);
    router.get("/product/jenis/:id", isLogin, isSuperAdmin, findOne);
    router.put("/product/jenis/:id", isLogin, isSuperAdmin, update);
    router.delete("/product/jenis/:id", isLogin, isSuperAdmin, deleteOne);


    app.use("/api/super/admin", router);
  };
  
  export default superAdminRoutes;
  