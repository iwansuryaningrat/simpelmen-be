import {isLogin , isActivated} from "../middlewares/auth.middlewares.js";
import { isSuperAdmin } from "../middlewares/roles.middlewares.js";
import {
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

  router.get("/users",isLogin,isActivated,isSuperAdmin, showAllAdmin);
  router.put("/users/:id",isLogin,isActivated,isSuperAdmin, updateAdmin);
  router.delete(
    "/users/:id",
    isLogin,
    isActivated,
    isSuperAdmin,
    DeleteAdmin
  );
  router.get("/profile",isLogin,isActivated,isSuperAdmin, showProfile);
  router.put("/profile",isLogin,isActivated,isSuperAdmin, updateProfile);

  //product routes
  router.get(
    "/products",
    isLogin,
    isActivated,
    ShowAllProduct
  );
  router.get(
    "/products/:product_id",
    isLogin,
    isActivated,
    ShowProduct
  );
  router.post(
    "/products",
    isLogin,
    isActivated,
    isSuperAdmin,
    CreateProduct
  );
  router.put(
    "/products/:product_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    UpdateProduct
  );
  router.delete(
    "/products/:product_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    DeleteProduct
  );

  //product finishing routes
  router.get(
    "/product_finishing",
    isLogin,
    isActivated,
    ShowAllProductFinishing
  );
  router.get(
    "/product_finishing/:product_finishing_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    ShowProductFinishing
  );
  router.post(
    "/product_finishing",
    isLogin,
    isActivated,
    isSuperAdmin,
    CreateProductFinishing
  );
  router.put(
    "/product_finishing/:product_finishing_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    UpdateProductFinishing
  );
  router.delete(
    "/product_finishing/:product_finishing_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    DeleteProductFinishing
  );

  //product category routes
  router.get(
    "/product_category",
    isLogin,
    isActivated,
    ShowAllProductCategory
  );
  router.get(
    "/product_category/:product_category_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    ShowProductCategory
  );
  router.post(
    "/product_category",
    isLogin,
    isActivated,
    isSuperAdmin,
    CreateProductCategory
  );
  router.put(
    "/product_category/:product_category_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    UpdateProductCategory
  );
  router.delete(
    "/product_category/:product_category_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    DeleteProductCategory
  );

  //product material routes
  router.get(
    "/product_material",
    isLogin,
    isActivated,
    ShowAllProductMaterial
  );
  router.get(
    "/product_material/:product_material_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    ShowProductMaterial
  );
  router.post(
    "/product_material",
    isLogin,
    isActivated,
    isSuperAdmin,
    CreateProductMaterial
  );
  router.put(
    "/product_material/:product_material_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    UpdateProductMaterial
  );
  router.delete(
    "/product_material/:product_material_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    DeleteProductMaterial
  );

  //product size routes
  router.get(
    "/product_size",
    isLogin,
    isActivated,
    ShowAllProductSize
  );
  router.get(
    "/product_size/:product_size_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    ShowProductSize
  );
  router.post(
    "/product_size",
    isLogin,
    isActivated,
    isSuperAdmin,
    CreateProductSize
  );
  router.put(
    "/product_size/:product_size_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    UpdateProductSize
  );
  router.delete(
    "/product_size/:product_size_id",
    isLogin,
    isActivated,
    isSuperAdmin,
    DeleteProductSize
  );

  app.use("/api/super/admin", router);
};

export default adminRoutes;
