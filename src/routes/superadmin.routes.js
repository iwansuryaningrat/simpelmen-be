import {
  verifyToken,
  isSuperAdmin,
  isActivated,
} from "../middlewares/auth.middleware.js";
import {
  adminBoard,
  showAllAdmin,
  updateAdmin,
  DeleteAdmin,
  showProfile,
  updateProfile,
} from "../controllers/users/superadmin.controller.js";
//product detail
import {
  showProduct_detail,
  showProduct_detailById,
  updateProduct_detail,
  deleteProduct_detail,
  createProduct_detail,
} from "../controllers/product_detail.controller.js";
import {
  showAllProduct,showProduct,
} from "../controllers/product.controller.js";
import {
  createSize,
  showAllSize,
  showSize,
  updateSize,
  deleteSize,
} from "../controllers/size.controller.js";
import {
  createCategory,
  showCategory,
  showCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";	
import {
  createMaterial,showAllMaterials,showMaterial,updateMaterial,deleteMaterial
} from "../controllers/materials.controller.js"
import {
  showTransaction,
} from "../controllers/transaction.controller.js"
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const adminRoutes = (app) => {
  app.use(headers);

  router.get("/", verifyToken, isActivated, isSuperAdmin, adminBoard);
  router.get("/users", verifyToken, isActivated, isSuperAdmin, showAllAdmin);
  router.put("/users/:id", verifyToken, isActivated, isSuperAdmin, updateAdmin);
  router.delete(
    "/users/:id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    DeleteAdmin
  );
  router.get(
    "/transaction",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showTransaction
  );
  router.get("/profile", verifyToken, isActivated, isSuperAdmin, showProfile);
  router.put("/profile", verifyToken, isActivated, isSuperAdmin, updateProfile);
  router.get(
    "/product_detail",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showProduct_detail
  );
  router.get(
    "/product_detail/:id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showProduct_detailById
  );
  router.put(
    "/product_detail/:id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    updateProduct_detail
  );
  router.delete(
    "/product_detail/:id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    deleteProduct_detail
  );
  router.post(
    "/product_detail",
    verifyToken,
    isActivated,
    isSuperAdmin,
    createProduct_detail
  );
  
  router.post(
    "/size",
    verifyToken,
    isActivated,
    isSuperAdmin,
    createSize
  );
  router.get(
    "/size",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showAllSize
  );
  router.get(
    "/size/:size_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showSize
  );
  router.put(
    "/size/:size_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    updateSize
  );
  router.delete(
    "/size/:size_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    deleteSize
  );

  router.post(
    "/material",
    verifyToken,
    isActivated,
    isSuperAdmin,
    createMaterial
  );
  router.get(
    "/material",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showAllMaterials
  );
  router.get(
    "/material/:material_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showMaterial
  );
  router.put(
    "/material/:material_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    updateMaterial
  );
  router.delete(
    "/material/:material_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    deleteMaterial
  );
  
  router.post(
    "/category",
    verifyToken,
    isActivated,
    isSuperAdmin,
    createCategory
  );
  router.get(
    "/category",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showCategory
  );
  router.get(
    "/category/:product_category_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showCategoryById
  );
  router.put(
    "/category/:product_category_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    updateCategory
  );
  router.delete(
    "/category/:product_category_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    deleteCategory
  );
  router.get(
    "/product",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showAllProduct
  );
  router.get(
    "/product/:product_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    showProduct
  );
  app.use("/api/super/admin", router);
};

export default adminRoutes;
