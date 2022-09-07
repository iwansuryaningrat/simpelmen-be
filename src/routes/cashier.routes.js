import {
  verifyToken,
  isAdmin,
  isAdminKasir,
  isAdminCS,
  isActivated,
} from "../middlewares/auth.middleware.js";
import adminKasirBoard from "../controllers/cashier.controllers.js";
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const cashierRoutes = (app) => {
  app.use(headers);

  router.get("/kasir", verifyToken, isActivated, isAdminKasir, adminKasirBoard);

  app.use("/api/test", router);
};

export default cashierRoutes;
