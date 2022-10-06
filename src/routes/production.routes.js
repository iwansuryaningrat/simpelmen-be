// import {
//   verifyToken,
//   isAdminProduction,
//   isActivated,
// } from "../middlewares/auth.middleware.js";
// import {
//   showProfile,
//   updateProfile,
//   ProductionTransaction
// } from "../controllers/users/production.controller.js";
// import express from "express";
// const router = express.Router();
// import headers from "../services/headers.services.js";

// const productionRoutes = (app) => {
//   app.use(headers);

//   router.get(
//     "/production/profile",
//     verifyToken,
//     isActivated,
//     isAdminProduction,
//     showProfile
//   );
//   router.put(
//     "/production/profile",
//     verifyToken,
//     isActivated,
//     isAdminProduction,
//     updateProfile
//   );
//   router.get(
//     "/production/transaction",
//     verifyToken,
//     isActivated,
//     isAdminProduction,
//     ProductionTransaction
//   )
//   app.use("/api/admin", router);
// };

// export default productionRoutes;
