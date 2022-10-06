// import {
//   verifyToken,
//   isUser,
//   isActivated,
// } from "../middlewares/auth.middleware.js";
// import {
//   userBoard,
//   userProfile,
// } from "../controllers/users/user.controllers.js";
// import {
//   showProduct,showAllProduct,creatProduct
// } from "../controllers/product.controller.js"
// import {
//   showProduct_detail,
//   showProduct_detailById,
//   createProduct_detail,
//   updateProduct_detail,
//   deleteProduct_detail,
// } from "../controllers/product_detail.controller.js"

// import express from "express";
// const router = express.Router();
// import headers from "../services/headers.services.js";

// const userRoutes = (app) => {
//   app.use(headers);

//   router.get("/", verifyToken, isActivated, isUser, userBoard);
//   router.get("/profile", userProfile);
//   app.use("/api/users", router);
// };

// export default userRoutes;
