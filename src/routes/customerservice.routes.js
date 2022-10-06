// import {
//   verifyToken,
//   isAdminCS,
//   isActivated,
// } from "../middlewares/auth.middleware.js";
// import cors from "cors";
// import {
//   showProfile,
//   updateProfile,
//   CustomerServiceTransaction,
//   CustomerServiceTransactionUpdateId,
//   CustomerServiceTransactionPrice,
// } from "../controllers/users/customerservice.controllers.js";
// import express from "express";
// const router = express.Router();
// import headers from "../services/headers.services.js";

// const customerServiceRoutes = (app) => {
//   app.use(headers);
//   router.use(cors());
//   router.get("/cs/profile", verifyToken, isActivated, isAdminCS, showProfile);
//   router.put("/cs/profile", verifyToken, isActivated, isAdminCS, updateProfile);
//   router.get(
//     "/cs/transaction",
//     verifyToken,
//     isActivated,
//     isAdminCS,
//     CustomerServiceTransaction
//   );
//   router.put(
//     "/cs/transaction/:id",
//     verifyToken,
//     isActivated,
//     isAdminCS,
//     CustomerServiceTransactionUpdateId
//   );
//   router.put(
//     "/cs/transaction/price/:id",
//     verifyToken,
//     isActivated,
//     isAdminCS,
//     CustomerServiceTransactionPrice
//   );
//   app.use("/api/admin", router);
// };

// export default customerServiceRoutes;
