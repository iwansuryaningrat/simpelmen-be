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
    ShowAllProduct
  );
  router.get(
    "/products/:product_id",
    ShowProduct
  );
  router.post(
    "/products",
    CreateProduct
  );
  router.put(
    "/products/:product_id",
    UpdateProduct
  );
  router.delete(
    "/products/:product_id",

    DeleteProduct
  );

  //product finishing routes
  router.get(
    "/product_finishing",

    ShowAllProductFinishing
  );
  router.get(
    "/product_finishing/:product_finishing_id",

    ShowProductFinishing
  );
  router.post(
    "/product_finishing",

    CreateProductFinishing
  );
  router.put(
    "/product_finishing/:product_finishing_id",

    UpdateProductFinishing
  );
  router.delete(
    "/product_finishing/:product_finishing_id",

    DeleteProductFinishing
  );

  //product category routes
  router.get(
    "/product_category",

    ShowAllProductCategory
  );
  router.get(
    "/product_category/:product_category_id",

    ShowProductCategory
  );
  router.post(
    "/product_category",

    CreateProductCategory
  );
  router.put(
    "/product_category/:product_category_id",

    UpdateProductCategory
  );
  router.delete(
    "/product_category/:product_category_id",

    DeleteProductCategory
  );

  //product material routes
  router.get(
    "/product_material",

    ShowAllProductMaterial
  );
  router.get(
    "/product_material/:product_material_id",

    ShowProductMaterial
  );
  router.post(
    "/product_material",

    CreateProductMaterial
  );
  router.put(
    "/product_material/:product_material_id",

    UpdateProductMaterial
  );
  router.delete(
    "/product_material/:product_material_id",

    DeleteProductMaterial
  );

  //product size routes
  router.get(
    "/product_size",

    ShowAllProductSize
  );
  router.get(
    "/product_size/:product_size_id",

    ShowProductSize
  );
  router.post(
    "/product_size",

    CreateProductSize
  );
  router.put(
    "/product_size/:product_size_id",

    UpdateProductSize
  );
  router.delete(
    "/product_size/:product_size_id",

    DeleteProductSize
  );

  app.use("/api/super/admin", router);
};

export default adminRoutes;
