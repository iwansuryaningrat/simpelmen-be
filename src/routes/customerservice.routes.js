import {
  verifyToken,
  isAdminCS,
  isActivated,
} from "../middlewares/auth.middleware.js";
import adminCSBoard from "../controllers/customerService.controllers.js";
import express from "express";
const router = express.Router();
import headers from "../services/headers.services.js";

const customerServiceRoutes = (app) => {
  app.use(headers);

  router.get("/cs", verifyToken, isActivated, isAdminCS, adminCSBoard);

  app.use("/api/admin", router);
};

export default customerServiceRoutes;
