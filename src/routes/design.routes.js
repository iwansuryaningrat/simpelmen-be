import {
  verifyToken,
  isAdminDesign,
  isActivated,
} from "../middlewares/auth.middleware.js";
import {
  showProfile,
  updateProfile,
  DesignTransaction,
  DesignTransactionUpdateId,
} from "../controllers/users/design.controller.js";
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const designRoutes = (app) => {
  app.use(headers);

  router.get(
    "/design/profile",
    verifyToken,
    isActivated,
    isAdminDesign,
    showProfile
  );
  router.put(
    "/design/profile",
    verifyToken,
    isActivated,
    isAdminDesign,
    updateProfile
  );
  router.get(
    "/design/transaction",
    verifyToken,
    isActivated,
    isAdminDesign,
    DesignTransaction
  );
  router.put(
    "/design/transaction/:id",
    verifyToken,
    isActivated,
    isAdminDesign,
    DesignTransactionUpdateId
  );

  app.use("/api/admin", router);
};

export default designRoutes;
