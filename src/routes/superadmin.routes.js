import {isLogin } from "../middlewares/auth.middlewares.js";
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

  router.get("/users",isSuperAdmin, showAllAdmin);
  router.put("/users/:id",isSuperAdmin, updateAdmin);
  router.delete(
    "/users/:id",
    isSuperAdmin,
    DeleteAdmin
  );
  router.get("/profile",isSuperAdmin, showProfile);
  router.put("/profile",isSuperAdmin, updateProfile);

  //product routes
  router.get(
    "/products",
    ShowAllProduct
  );
  router.get(
    "/products/:product_id",
    ShowProduct
  );
  router.post(
    "/products",
    isSuperAdmin,
    CreateProduct
  );
  router.put(
    "/products/:product_id",
    isSuperAdmin,
    UpdateProduct
  );
  router.delete(
    "/products/:product_id",
    isSuperAdmin,
    DeleteProduct
  );

  //product finishing routes
  router.get(
    "/product_finishing",
    ShowAllProductFinishing
  );
  router.get(
    "/product_finishing/:product_finishing_id",
    isSuperAdmin,
    ShowProductFinishing
  );
  router.post(
    "/product_finishing",
    isSuperAdmin,
    CreateProductFinishing
  );
  router.put(
    "/product_finishing/:product_finishing_id",
    isSuperAdmin,
    UpdateProductFinishing
  );
  router.delete(
    "/product_finishing/:product_finishing_id",
    isSuperAdmin,
    DeleteProductFinishing
  );

  //product category routes
  router.get(
    "/product_category",
    ShowAllProductCategory
  );
  router.get(
    "/product_category/:product_category_id",
    isSuperAdmin,
    ShowProductCategory
  );
  router.post(
    "/product_category",
    isSuperAdmin,
    CreateProductCategory
  );
  router.put(
    "/product_category/:product_category_id",
    isSuperAdmin,
    UpdateProductCategory
  );
  router.delete(
    "/product_category/:product_category_id",
    isSuperAdmin,
    DeleteProductCategory
  );

  //product material routes
  router.get(
    "/product_material",
    ShowAllProductMaterial
  );
  router.get(
    "/product_material/:product_material_id",
    isSuperAdmin,
    ShowProductMaterial
  );
  router.post(
    "/product_material",
    isSuperAdmin,
    CreateProductMaterial
  );
  router.put(
    "/product_material/:product_material_id",
    isSuperAdmin,
    UpdateProductMaterial
  );
  router.delete(
    "/product_material/:product_material_id",
    isSuperAdmin,
    DeleteProductMaterial
  );

  //product size routes
  router.get(
    "/product_size",
    ShowAllProductSize
  );
  router.get(
    "/product_size/:product_size_id",
    isSuperAdmin,
    ShowProductSize
  );
  router.post(
    "/product_size",
    isSuperAdmin,
    CreateProductSize
  );
  router.put(
    "/product_size/:product_size_id",
    isSuperAdmin,
    UpdateProductSize
  );
  router.delete(
    "/product_size/:product_size_id",
    isSuperAdmin,
    DeleteProductSize
  );

  app.use("/api/super/admin", router);
};

export default adminRoutes;
