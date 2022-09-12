import {
  verifyToken,
  isAdminCashier,
  isActivated,
} from "../middlewares/auth.middleware.js";
import {
  showProfile,
  updateProfile,
} from "../controllers/users/cashier.controllers.js";
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const cashierRoutes = (app) => {
  app.use(headers);

  router.get(
    "/cashier/profile",
    verifyToken,
    isActivated,
    isAdminCashier,
    showProfile
  );
  router.put(
    "/cashier/profile",
    verifyToken,
    isActivated,
    isAdminCashier,
    updateProfile
  );

  app.use("/api/admin", router);
};

export default cashierRoutes;
