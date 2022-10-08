import { verifyToken, isActivated } from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";
import {
  adminBoard,
  showAllAdmin,
  updateAdmin,
  DeleteAdmin,
  showProfile,
  updateProfile,
} from "../controllers/users/superadmin.controller.js";

import {
  ShowAllProduct,
  ShowProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../controllers/product.controller.js";

import {
  CreateProductFinishing,
  DeleteProductFinishing,
  ShowAllProductFinishing,
  ShowProductFinishing,
  UpdateProductFinishing,
} from "../controllers/product_finishing.controller.js";

import {
  CreateProductCategory,
  DeleteProductCategory,
  ShowAllProductCategory,
  ShowProductCategory,
  UpdateProductCategory,
} from "../controllers/product_category.controller.js";

import {
  CreateProductMaterial,
  DeleteProductMaterial,
  ShowAllProductMaterial,
  ShowProductMaterial,
  UpdateProductMaterial,
} from "../controllers/product_material.controller.js";

import {
  CreateProductSize,
  DeleteProductSize,
  ShowAllProductSize,
  ShowProductSize,
  UpdateProductSize,
} from "../controllers/product_size.controller.js";

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
  router.get("/profile", verifyToken, isActivated, isSuperAdmin, showProfile);
  router.put("/profile", verifyToken, isActivated, isSuperAdmin, updateProfile);

  //product routes
  router.get(
    "/products",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowAllProduct
  );
  router.get(
    "/products/:product_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowProduct
  );
  router.post(
    "/products",
    verifyToken,
    isActivated,
    isSuperAdmin,
    CreateProduct
  );
  router.put(
    "/products/:product_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    UpdateProduct
  );
  router.delete(
    "/products/:product_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    DeleteProduct
  );

  //product finishing routes
  router.get(
    "/product_finishing",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowAllProductFinishing
  );
  router.get(
    "/product_finishing/:product_finishing_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowProductFinishing
  );
  router.post(
    "/product_finishing",
    verifyToken,
    isActivated,
    isSuperAdmin,
    CreateProductFinishing
  );
  router.put(
    "/product_finishing/:product_finishing_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    UpdateProductFinishing
  );
  router.delete(
    "/product_finishing/:product_finishing_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    DeleteProductFinishing
  );

  //product category routes
  router.get(
    "/product_category",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowAllProductCategory
  );
  router.get(
    "/product_category/:product_category_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowProductCategory
  );
  router.post(
    "/product_category",
    verifyToken,
    isActivated,
    isSuperAdmin,
    CreateProductCategory
  );
  router.put(
    "/product_category/:product_category_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    UpdateProductCategory
  );
  router.delete(
    "/product_category/:product_category_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    DeleteProductCategory
  );

  //product material routes
  router.get(
    "/product_material",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowAllProductMaterial
  );
  router.get(
    "/product_material/:product_material_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowProductMaterial
  );
  router.post(
    "/product_material",
    verifyToken,
    isActivated,
    isSuperAdmin,
    CreateProductMaterial
  );
  router.put(
    "/product_material/:product_material_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    UpdateProductMaterial
  );
  router.delete(
    "/product_material/:product_material_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    DeleteProductMaterial
  );

  //product size routes
  router.get(
    "/product_size",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowAllProductSize
  );
  router.get(
    "/product_size/:product_size_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    ShowProductSize
  );
  router.post(
    "/product_size",
    verifyToken,
    isActivated,
    isSuperAdmin,
    CreateProductSize
  );
  router.put(
    "/product_size/:product_size_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    UpdateProductSize
  );
  router.delete(
    "/product_size/:product_size_id",
    verifyToken,
    isActivated,
    isSuperAdmin,
    DeleteProductSize
  );

  app.use("/api/super/admin", router);
};

export default adminRoutes;
